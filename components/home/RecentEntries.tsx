import Link from 'next/link'
import { getAllEntries, formatDateLong } from '@/lib/journal'

export function RecentEntries() {
  const entries = getAllEntries().slice(0, 3)

  return (
    <div className="max-w-content mx-auto px-8 py-[72px]">
      <div className="flex justify-between items-baseline mb-9 border-b border-ink/10 pb-[18px]">
        <h2 className="font-display text-[28px] font-medium">Latest journal entries</h2>
        <Link href="/journal" className="text-sm text-rust font-semibold">
          View all →
        </Link>
      </div>
      {entries.length === 0 && (
        <p className="text-ink-soft text-sm">No entries yet — add one in content/journal.</p>
      )}
      {entries.map((entry, i) => (
        <Link
          key={entry.slug}
          href={`/journal/${entry.slug}`}
          className="grid grid-cols-[64px_1fr_auto] gap-5 items-center py-5 border-b border-ink/10"
        >
          <div className="font-mono text-sm text-rust">{String(i + 1).padStart(3, '0')}</div>
          <div>
            <div className="font-display text-[19px] font-medium">{entry.title}</div>
            <div className="text-sm text-ink-soft mt-1">{entry.excerpt}</div>
          </div>
          <div className="font-mono text-xs text-ink-soft whitespace-nowrap">
            {formatDateLong(entry.date)}
          </div>
        </Link>
      ))}
    </div>
  )
}
