'use client';
import { Tooltip as FlowbiteTooltip } from 'flowbite-react';
import { ReactNode, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

type Props = {
  tooltip: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  children: ReactNode;
};

export default function Tooltip({ tooltip, position = 'top', children }: Props) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <>{children}</>; // evita flash SSR

  const tooltipClass =
    resolvedTheme === 'dark'
      ? 'bg-white text-black'
      : 'bg-black text-white';

  return (
    <FlowbiteTooltip content={tooltip} placement={position} className={tooltipClass}>
      {children}
    </FlowbiteTooltip>
  );
}
