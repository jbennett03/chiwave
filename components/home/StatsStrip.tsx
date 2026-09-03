const stats = [
  { num: '48', label: 'Albums logged' },
  { num: '41', label: 'Hours this month' },
  { num: '00', label: 'Years journaling' },
]

export function StatsStrip() {
  return (
    <div className="border-b border-ink/10">
      <div className="max-w-content mx-auto px-8 grid grid-cols-2 md:grid-cols-3">
        {stats.map((s, i) => (
          <div key={s.label} className={`py-7 ${i > 0 ? 'md:border-l border-ink/10 md:pl-8' : ''}`}>
            <div className="font-display text-[34px] font-medium">{s.num}</div>
            <div className="text-sm text-ink-soft mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
