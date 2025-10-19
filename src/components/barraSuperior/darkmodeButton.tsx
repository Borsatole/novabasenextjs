'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react';
import { MdDarkMode } from "react-icons/md";
import { FaSun } from "react-icons/fa";

function DarkmodeButton() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const handleThemeChange = () => {
  document.body.classList.add('theme-switching'); // ativa animação
  setTheme(currentTheme === 'dark' ? 'light' : 'dark');

  // remove a classe depois da animação
  setTimeout(() => {
    document.body.classList.remove('theme-switching');
  }, 100);
};

  useEffect(() => {
    setMounted(true);
  }, []);

  // Loading animado enquanto monta
  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-full bg-[var(--base-color)] flex items-center justify-center">
        <FaSun className="text-gray-400 animate-bounce" size={20} />
      </div>
    );
  }

  const currentTheme = resolvedTheme;

  return (
    <button
      onClick={handleThemeChange}
      className="w-10 h-10 bg-[var(--base-color)] cursor-pointer
        flex items-center justify-center rounded-full text-[var(--text-color)]
         hover:scale-105"
      aria-label={currentTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {currentTheme === 'dark' ? (
        <FaSun size={20} className="transition-transform duration-300" />
      ) : (
        <MdDarkMode size={20} className="transition-transform duration-300" />
      )}
    </button>
  );
}

export default DarkmodeButton;
