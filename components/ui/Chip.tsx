export function Chip({
  children,
  active = false,
  onClick,
}: {
  children: React.ReactNode
  active?: boolean
  onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`font-mono text-xs px-3.5 py-2 border rounded-full transition-colors ${
        active ? 'bg-ink text-paper border-ink' : 'text-ink-soft border-ink/15 hover:border-ink/30'
      }`}
    >
      {children}
    </button>
  )
}
