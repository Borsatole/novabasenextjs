

export default function LoadingSkeleton({size, color}: any) {

  return (
    <div
      className="flex flex-wrap mt-6 flex-col animate-pulse"
      style={{
        backgroundColor: color || 'var(--base-variant)',
        opacity: '0.5',
        color: color || 'var(--text-color)',
        minHeight: size || '100px',
      }}
    />

  );
}
