import Alerta from "@/components/comum/alertas";
import axios, { AxiosResponse, AxiosError } from "axios";
import { getToken } from "@/utils/getToken";

const rotaApi = process.env.NEXT_PUBLIC_API_URL ?? "";

type DadosRequisicao = Record<string, unknown> | FormData;
type RespostaApi<T = unknown> = AxiosResponse<T>;

function getConfig() {
  const token = getToken();

  return {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    withCredentials: true,
  };
}

/**
 * Trata erros comuns das requisições
 */
function handleRequestError(error: AxiosError<{ message?: string }>): never {
  if (error.response?.status === 401) {
    // Remove o token inválido
    if (typeof window !== "undefined") {
      document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
      window.location.href = "/sign-in";
    }
  } else if (error.response?.status === 403) {
    Alerta("toast", "error", error.response.data?.message ?? "Acesso negado.");
  }

  throw error;
}

export async function requisicaoGet<T = unknown>(rota: string): Promise<RespostaApi<T>> {
  try {
    const response = await axios.get<T>(`${rotaApi}${rota}`, getConfig());
    return response;
  } catch (err) {
    return handleRequestError(err as AxiosError<{ message?: string }>);
  }
}

export async function requisicaoPost<T = unknown>(
  rota: string,
  dados: DadosRequisicao
): Promise<RespostaApi<T>> {
  const config = getConfig();
  const payload = dados instanceof FormData ? dados : JSON.stringify(dados);
  
  // if (dados instanceof FormData) {
  //   delete config.headers["Content-Type"];
  // }

  try {
    const response = await axios.post<T>(`${rotaApi}${rota}`, payload, config);
    return response;
  } catch (err) {
    return handleRequestError(err as AxiosError<{ message?: string }>);
  }
}

export async function requisicaoPostSemRedirect<T = unknown>(
  rota: string,
  dados: DadosRequisicao
): Promise<RespostaApi<T>> {
  const config = getConfig();
  const payload = dados instanceof FormData ? dados : JSON.stringify(dados);
  
  // if (dados instanceof FormData) {
  //   delete config.headers["Content-Type"];
  // }

  return axios.post<T>(`${rotaApi}${rota}`, payload, config);
}

export async function requisicaoPut<T = unknown>(
  rota: string,
  dados: DadosRequisicao
): Promise<RespostaApi<T>> {
  const config = getConfig();
  const payload = dados instanceof FormData ? dados : JSON.stringify(dados);
  
  // if (dados instanceof FormData) {
  //   delete config.headers["Content-Type"];
  // }

  try {
    const response = await axios.put<T>(`${rotaApi}${rota}`, payload, config);
    return response;
  } catch (err) {
    return handleRequestError(err as AxiosError<{ message?: string }>);
  }
}

export async function requisicaoDelete<T = unknown>(rota: string): Promise<RespostaApi<T>> {
  try {
    const response = await axios.delete<T>(`${rotaApi}${rota}`, getConfig());
    return response;
  } catch (err) {
    return handleRequestError(err as AxiosError<{ message?: string }>);
  }
}