// import React, {
//   createContext,
//   useState,
//   useEffect,
//   useCallback,
//   ReactNode,
// } from "react";
// import { useNavigate } from "react-router-dom";
// import Alerta from "@components/comum/alertas";
// import {
//   requisicaoGet,
//   requisicaoPost,
//   requisicaoPostSemRedirect,
// } from "@services/requisicoes";
// import { useMenu } from "./MenuContext";
// import { MenuItem, UserData } from "@src/components/tipos";

// interface AuthData {
//   token: string | null;
//   loggedIn: boolean;
//   user: UserData | null;
//   menu: MenuItem[] | null;
//   expirationTime: EpochTimeStamp | null;
  
// }

// interface AuthContextType {
//   auth: AuthData;
//   login: (data: any) => void;
//   logout: () => void;
// }

// interface AuthProviderProps {
//   children: ReactNode;
// }

// export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//   const { fecharMenu } = useMenu();
//   const navigate = useNavigate();

//   const [auth, setAuth] = useState<AuthData>({
//     token: localStorage.getItem("token"),
//     expirationTime: localStorage.getItem("expirationTime")
//       ? Number(localStorage.getItem("expirationTime"))
//       : null,
//     loggedIn: !!localStorage.getItem("token"),
//     user: localStorage.getItem("usuario")
//       ? JSON.parse(localStorage.getItem("usuario") || "")
//       : null,
//     menu: localStorage.getItem("menu")
//       ? JSON.parse(localStorage.getItem("menu") || "")
//       : null,
//   });

//   const verificaToken = useCallback(
//     async (token: string) => {
//       try {
//         await requisicaoPostSemRedirect(`/login/validar`, { token });
//       } catch (error: any) {
//         if (error.response) {
//           const msg = error.response.data?.message || "Erro desconhecido";
//           Alerta("swal", "error", msg);

//           if (error.response.status === 401) {
//             logout();
//             Alerta("swal", "error", "Faça login novamente para continuar.");
//           }
//         } else if (error.request) {
//           Alerta("swal", "error", "Sem resposta do servidor");
//         } else {
//           Alerta("swal", "error", `Erro: ${error.message}`);
//         }

//         logout();
//       }
//     },
//     [auth.user]
//   );

//   useEffect(() => {
//     if (auth.token) {
//       verificaToken(auth.token);
//     }
//   }, [auth.token, verificaToken]);

//   const login = (data: any) => {
//     const token = data.token;
//     const usuario = data.usuario;
//     const menu = data.menu;
//     const exp_time = data.expirationTime;
//     const serverTime = data.serverTime;

//     // Calcula o offset entre servidor e cliente
//     const clientTime = Math.floor(Date.now() / 1000);
//     const timeOffset = serverTime - clientTime;

//     localStorage.setItem("token", token);
//     localStorage.setItem("expirationTime", String(exp_time));
//     localStorage.setItem("timeOffset", String(timeOffset));
//     localStorage.setItem("menu", JSON.stringify(menu));
//     localStorage.setItem("usuario", JSON.stringify(usuario));

//     setAuth({
//       token,
//       expirationTime: exp_time,
//       loggedIn: true,
//       user: usuario,
//       menu,
//     });
//   };

//   const logout = () => {
//     localStorage.clear();
//     setAuth({
//       token: null,
//       expirationTime: null,
//       loggedIn: false,
//       user: null,
//       menu: null,
//     });
//     navigate("/login", { replace: true });
//   };

//   return (
//     <AuthContext.Provider value={{ auth, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
