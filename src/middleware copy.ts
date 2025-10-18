import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

const publicRoutes = [
    {path: "/sign-in", whenAuthenticated: 'redirect'},
    {path: "/register", whenAuthenticated: 'redirect'},
    {path: "/pricing", whenAuthenticated: 'next'},
] as const

const REDIRECT_WHEN_NOT_AUTH_ROUTE = "/sign-in";

export async function middleware(request: NextRequest) {
    const cookieStore = await cookies();
    

//     cookieStore.set({
//     name: 'token',
//     value: 'leandreta',
//     httpOnly: true,
//     expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
//     path: '/',
//   })


    const path = request.nextUrl.pathname;
    const publicRoute = publicRoutes.find(route => route.path === path);
    const authToken =  cookieStore.get("token")?.value;

     console.log("O token é " + authToken);


    // Verifico se existe um token e se é uma rota pública
    if (!authToken && publicRoute){
        return NextResponse.next()
    }

    // Verifico se não existe um token e se não é uma rota pública ai entao redireciono
    if (!authToken && !publicRoute){
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTH_ROUTE;

        return NextResponse.redirect(redirectUrl);
    }

    if (authToken && publicRoute && publicRoute.whenAuthenticated === 'redirect'){
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = "/";

        return NextResponse.redirect(redirectUrl);
    }


    if (authToken && !publicRoute){
        // checkar jwt

        return NextResponse.next()
    }

  }

  export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'],
  }