import React from 'react';
import { Spinner } from 'flowbite-react';

interface Props {
  children: React.ReactNode;
  loading: boolean;
}

function LoadingSpiner({ children, loading }: Props) {

  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 z-10 bg-[var(--fundo-modal)] flex items-center justify-center pointer-events-auto " aria-readonly style={{ backgroundColor: 'var(--fundo-modal)', opacity: '0.4' }}>
          <Spinner size="xl" className=" fill-[var(--corPrincipal)]" />

        </div>
      )}
      
      <div className={loading ? 'pointer-events-none opacity-50' : ''}>
        {children}
      </div>
    </div>
  );
}

export default LoadingSpiner;
