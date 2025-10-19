'use client';

import { ThemeProvider } from 'next-themes';
import { MenuProvider } from "@/context/MenuContext";
import { AuthProvider } from "@/context/AuthContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <AuthProvider>
      <MenuProvider>
        {children}
      </MenuProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
