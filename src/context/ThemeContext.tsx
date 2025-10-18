import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Tenta pegar do localStorage ou define padrão
    const saved = localStorage.getItem('darkmode');
    return saved === 'true' ? 'dark' : 'light';
  });

  // Sempre que o tema mudar, atualiza o localStorage e a classe no body
  useEffect(() => {
    localStorage.setItem('darkmode', theme === 'dark' ? 'true' : 'false');
    if (theme === 'dark') {
      document.body.classList.add('darkmode');
    } else {
      document.body.classList.remove('darkmode');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
