'use client';

import { useEffect, useState } from "react";

function Timer() {
  const [tempoRestante, setTempoRestante] = useState<string>("");

  useEffect(() => {
    const calcularTempo = () => {
      const expLocalStorage = localStorage.getItem("expirationTime");
      const timeOffsetStorage = localStorage.getItem("timeOffset");
      
      if (!expLocalStorage) return "00:00";

      const expirationTime = parseInt(expLocalStorage, 10);
      const timeOffset = timeOffsetStorage ? parseInt(timeOffsetStorage, 10) : 0;
      
      // Ajusta o tempo do cliente com o offset do servidor
      const agoraAjustado = Math.floor(Date.now() / 1000) + timeOffset;
      const diferenca = expirationTime - agoraAjustado;

      if (diferenca <= 0) {
        return "Sessão expirada";
      }

      const minutos = Math.floor(diferenca / 60);
      const segundos = diferenca % 60;
      return `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;
    };

    setTempoRestante(calcularTempo());

    const interval = setInterval(() => {
      const novoTempo = calcularTempo();
      setTempoRestante(novoTempo);

      if (novoTempo === "Sessão expirada") {
        clearInterval(interval);
        window.location.href = "/";
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-2 h-10 text-sm bg-[var(--base-variant)] cursor-pointer
      flex items-center justify-center rounded-full text-[var(--text-color)]">
      {tempoRestante ? `Sessão : ${tempoRestante}` : "Sessão : 00:00"}
    </div>
  );
}

export default Timer;