export function Tag({ children, color = 'sage' }: { children: React.ReactNode; color?: 'sage' | 'gold' }) {
  const colorClass = color === 'gold' ? 'text-gold' : 'text-sage'
  return (
    <span className={`font-mono text-[10px] uppercase tracking-[0.04em] ${colorClass} after:content-['·'] after:ml-1.5 after:text-black/15 last:after:content-none`}>
      {children}
    </span>
  )
}
