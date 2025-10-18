'use client';

import { FormGroup } from "@/components/comum/FormGroup";
import { Input } from "@/components/comum/input";
import { Button } from "@/components/comum/button";
import Alerta from "@/components/comum/alertas";
import Image from "next/image";
import { useState } from "react";

export default function Page() {
  const [loading, setLoading] = useState(false);
  

  function setCookie(name: string, value: string, days = 7) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

  async function verificaLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const dadosFormularioLogin = Object.fromEntries(formData.entries());
    const rotaApi = 'http://localhost:8080';

    console.log("🔗 Dados Login:", dadosFormularioLogin);
    console.log("🔗 Rota:", rotaApi);

    try {
      setLoading(true);

      const response = await fetch(`${rotaApi}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosFormularioLogin),
      });

    // sempre tenta ler o JSON, mesmo se status for 404
    const data = await response.json();

    console.log("🔗 Resposta:", data);

    if (!response.ok) {
      // aqui você pode lançar ou mostrar a mensagem do backend
      throw new Error(data.message || response.statusText);
    }

    setCookie("token", data.token, 7);


    // redirecionar para a rota privada
    window.location.href = "/";



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

        <div className="flex items-center justify-center mb-6 cursor-pointer">
          <div className="w-full flex justify-center max-w-[100%] p-3 bg-[var(--base-color)] rounded-lg backdrop-blur-sm">
            <Image
              src="/logo.png"
              alt="Logo"
              width={200}
              height={200}
              className="w-[60%] h-auto object-contain max-w-[40%]"
            />
          </div>
        </div>

        <form onSubmit={verificaLogin} className="space-y-6" id="formLogin">
          <FormGroup label="E-mail" id="email">
            <Input id="email" name="email" type="email" required />
          </FormGroup>
          <FormGroup label="Senha" id="password">
            <Input id="password" name="password" type="password" required />
          </FormGroup>
          <Button type="submit" loading={loading} className="w-full">
            Entrar
          </Button>
        </form>
      </div>
    </div>
  );
}
