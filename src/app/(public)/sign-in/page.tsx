'use client';

import { FormGroup } from "@/components/comum/FormGroup";
import { Input } from "@/components/comum/input";
import { Button } from "@/components/comum/button";
import Alerta from "@/components/comum/alertas";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

import { UserData, MenuItem } from "@/components/tipos";

interface LoginResponse {
  token: string;
  usuario: UserData;
  menu: MenuItem[];
  expirationTime: number;
  serverTime: number;
  message?: string;
}

export default function Page() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  async function verificaLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const dadosFormularioLogin = Object.fromEntries(formData.entries());
    const rotaApi = process.env.NEXT_PUBLIC_API_URL;

    try {
      setLoading(true);

      const response = await fetch(`${rotaApi}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosFormularioLogin),
        credentials: "include",
      });

      const data: LoginResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao fazer login");
      }

      if (!data.token) {
        throw new Error("Token não recebido do servidor.");
      }

      // Usa o contexto para fazer login
      login(data);

      // Sucesso
      Alerta("swal", "success", "Login realizado com sucesso!");


        router.push("/");
        router.refresh();
  

    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Ops! Algo deu errado.";
      Alerta("swal", "error", message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-screen h-screen relative flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center animate-panZoom"
        style={{ backgroundColor: "var(--base-color)" }}
      />
      <div className="absolute inset-0" />
      
      <div className="relative z-10 w-full max-w-md p-12 rounded-2xl shadow-2xl bg-[var(--base-variant)] backdrop-blur-md">
        <h2 className="text-3xl font-bold text-center text-[var(--text-color)] mb-8">
          Acesse sua conta
        </h2>

        <div className="flex items-center justify-center mb-6">
          <div className="w-full flex justify-center p-3 bg-[var(--base-color)] rounded-lg backdrop-blur-sm">
            <Image
              src="/logo.png"
              alt="Logo"
              width={200}
              height={200}
              className="w-[60%] h-auto object-contain"
              priority
            />
          </div>
        </div>

        <form onSubmit={verificaLogin} className="space-y-6">
          <FormGroup label="E-mail" id="email">
            <Input 
              id="email" 
              name="email" 
              type="email"
              autoComplete="email"
              placeholder="seu@email.com"
              required 
            />
          </FormGroup>
          
          <FormGroup label="Senha" id="password">
            <Input 
              id="password" 
              name="password" 
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              required 
            />
          </FormGroup>
          
          <Button type="submit" loading={loading} className="w-full">
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </form>
      </div>
    </div>
  );
}