import Link from 'next/link'
import type { JournalEntry } from '@/lib/types'
import { Tag } from '@/components/ui/Tag'
import { formatDate } from '@/lib/journal'

export function JournalRow({ entry }: { entry: JournalEntry }) {
  return (
    <Link
      href={`/journal/${entry.slug}`}
      className="grid grid-cols-[120px_1fr] gap-8 py-8 border-b border-ink/10 group"
    >
      <div className="font-mono text-xs text-rust pt-1">{formatDate(entry.date)}</div>
      <div>
        <div className="font-display text-2xl font-medium group-hover:text-rust transition-colors">
          {entry.title}
        </div>
        <p className="text-ink-soft mt-2.5 leading-relaxed max-w-[64ch]">{entry.excerpt}</p>
        <div className="flex gap-3.5 items-center mt-3.5">
          {entry.tags.map((tag) => (
            <Tag key={tag} color="gold">
              {tag}
            </Tag>
          ))}
          <span className="text-sm font-semibold">Read entry →</span>
        </div>
      </div>
    </Link>
  )
}
