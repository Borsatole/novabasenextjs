import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

// FORÇA O USO DO NODE.JS RUNTIME (não usa Edge Runtime)
export const runtime = 'nodejs'

const publicRoutes = [
    {path: "/sign-in", whenAuthenticated: 'redirect'},
    {path: "/register", whenAuthenticated: 'redirect'},
    {path: "/pricing", whenAuthenticated: 'next'},
] as const

const REDIRECT_WHEN_NOT_AUTH_ROUTE = "/sign-in";
const JWT_SECRET = process.env.JWT_SECRET || 'SERAFINA';

// Interface para tipar o payload do JWT
interface JWTPayload {
    iss: string;
    iat: number;
    exp: number;
    sub: string;
    nivel: string;
}

export async function middleware(request: NextRequest) {
    const cookieStore = await cookies();
    const path = request.nextUrl.pathname;
    
    // Ignora arquivos estáticos
    if (
        path.match(/\.(png|jpg|jpeg|gif|svg|ico|webp|pdf|txt)$/i) ||
        path.startsWith('/_next/') ||
        path.startsWith('/api/')
    ) {
        return NextResponse.next();
    }
    
    const publicRoute = publicRoutes.find(route => route.path === path);
    const authToken = cookieStore.get("token")?.value;

    console.log("=== MIDDLEWARE DEBUG ===");
    console.log("Path:", path);
    console.log("Token existe?", !!authToken);
    console.log("É rota pública?", !!publicRoute);

    // Verifico se existe um token e se é uma rota pública
    if (!authToken && publicRoute){
        console.log("✅ Sem token em rota pública - permitindo acesso");
        return NextResponse.next()
    }

    // Verifico se não existe um token e se não é uma rota pública ai entao redireciono
    if (!authToken && !publicRoute){
        console.log("❌ Sem token em rota privada - redirecionando para login");
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTH_ROUTE;
        return NextResponse.redirect(redirectUrl);
    }

    if (authToken && publicRoute && publicRoute.whenAuthenticated === 'redirect'){
        console.log("✅ Com token em rota de login - redirecionando para home");
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = "/";
        return NextResponse.redirect(redirectUrl);
    }

    if (authToken && !publicRoute){
        console.log("🔍 Verificando token...");
        
        try {
            const decoded = jwt.verify(authToken, JWT_SECRET) as JWTPayload;
            console.log("✅ Token válido!", decoded);
            
            // Validações adicionais
            if (!decoded.sub || !decoded.nivel) {
                throw new Error('Token inválido: campos obrigatórios ausentes');
            }

            // Token válido - adiciona informações do usuário aos headers
            const requestHeaders = new Headers(request.headers);
            requestHeaders.set('x-user-id', decoded.sub);
            requestHeaders.set('x-user-nivel', decoded.nivel);
            
            console.log(`Usuário autenticado: ID=${decoded.sub}, Nível=${decoded.nivel}`);
            
            return NextResponse.next({
                request: {
                    headers: requestHeaders,
                }
            });
        } catch (error) {
            console.log("❌ ERRO ao verificar token:");
            
            if (error instanceof jwt.TokenExpiredError) {
                console.error("Token expirado");
            } else if (error instanceof jwt.JsonWebTokenError) {
                console.error("Token inválido:", error.message);
            } else {
                console.error("Erro desconhecido:", error);
            }
            
            // Remove o token inválido e redireciona
            const response = NextResponse.redirect(new URL(REDIRECT_WHEN_NOT_AUTH_ROUTE, request.url));
            response.cookies.delete('token');
            
            return response;
        }
    }

    console.log("✅ Permitindo acesso (fallback)");
    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'],
}