'use client';

import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
  useContext,
} from "react";
import { MenuItem, UserData } from "@/components/tipos";
import { getCookie, removeCookie, setCookie } from "@/utils/cookies";
import { useRouter } from "next/navigation";

interface AuthData {
  token: string | null;
  loggedIn: boolean;
  user: UserData | null;
  menu: MenuItem[] | null;
  expirationTime: number | null;
}

interface LoginResponse {
  token: string;
  usuario: UserData;
  menu: MenuItem[];
  expirationTime: number;
  serverTime: number;
}

interface AuthContextType {
  auth: AuthData;
  login: (data: LoginResponse) => void;
  logout: () => void;
  isLoading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [auth, setAuth] = useState<AuthData>({
    token: null,
    expirationTime: null,
    loggedIn: false,
    user: null,
    menu: null,
  });
  const router = useRouter();

  // Carrega dados na montagem do componente
  useEffect(() => {
    if (typeof window === "undefined") return;

    const token = getCookie("token");
    const expirationTime = getCookie("expirationTime");
    
    // Dados do usuário e menu vêm do localStorage (mais apropriado para dados grandes)
    const userStr = localStorage.getItem("usuario");
    const menuStr = localStorage.getItem("menu");

    if (token) {
      setAuth({
        token,
        expirationTime: expirationTime ? Number(expirationTime) : null,
        loggedIn: true,
        user: userStr ? JSON.parse(userStr) : null,
        menu: menuStr ? JSON.parse(menuStr) : null,
      });
    }
    
    setIsLoading(false);
  }, []);

  const logout = useCallback(() => {
      
    
    // Remove cookies
    removeCookie("token");
    removeCookie("expirationTime");
    removeCookie("timeOffset");
    
    // Remove localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("menu");
      localStorage.removeItem("usuario");
    }

    setAuth({
      token: null,
      expirationTime: null,
      loggedIn: false,
      user: null,
      menu: null,
    });

    // Redireciona para login
    router.push("/sign-in");
  }, [router]);

  const login = useCallback((data: LoginResponse) => {
    const { token, usuario, menu, expirationTime, serverTime } = data;

    // Calcula o offset entre servidor e cliente
    const clientTime = Math.floor(Date.now() / 1000);
    const timeOffset = serverTime - clientTime;

    // Token e dados de sessão vão para cookies (enviados automaticamente nas requisições)
    setCookie("token", token, 7);
    setCookie("expirationTime", String(expirationTime), 7);
    setCookie("timeOffset", String(timeOffset), 7);
    
    // Dados do usuário e menu vão para localStorage (não precisam ser enviados em cada requisição)
    if (typeof window !== "undefined") {
      localStorage.setItem("menu", JSON.stringify(menu));
      localStorage.setItem("usuario", JSON.stringify(usuario));
      localStorage.setItem("expirationTime", String(expirationTime));
      localStorage.setItem("timeOffset", String(timeOffset));
    }

    setAuth({
      token,
      expirationTime,
      loggedIn: true,
      user: usuario,
      menu,
    });
  }, []);

  return (
    <AuthContext.Provider value={{ auth, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};