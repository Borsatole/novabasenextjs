'use client';

import { ThemeProvider } from 'next-themes';
import { MenuProvider } from "@/context/MenuContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <MenuProvider>
        {children}
      </MenuProvider>
    </ThemeProvider>
  );
}
