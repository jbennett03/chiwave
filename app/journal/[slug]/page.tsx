import { notFound } from 'next/navigation'
import { getAllEntries, getEntry, formatDateLong } from '@/lib/journal'
import { Tag } from '@/components/ui/Tag'

export function generateStaticParams() {
  return getAllEntries().map((entry) => ({ slug: entry.slug }))
}

export default async function JournalEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const entry = getEntry(slug)
  if (!entry) notFound()

  const paragraphs = entry.content.trim().split(/\n\s*\n/)

  return (
    <main>
      <div className="max-w-content mx-auto px-8 py-16 border-b border-ink/10">
        <div className="font-mono text-xs text-rust mb-4">{formatDateLong(entry.date)}</div>
        <h1 className="font-display text-[38px] font-medium max-w-[24ch]">{entry.title}</h1>
        <div className="flex gap-3.5 items-center mt-5">
          {entry.tags.map((tag) => (
            <Tag key={tag} color="gold">
              {tag}
            </Tag>
          ))}
          <span className="text-sm text-ink-soft">{entry.readingTime}</span>
        </div>
      </div>
      <div className="max-w-content mx-auto px-8 py-14 pb-24">
        <article className="max-w-[64ch] space-y-6 text-[17px] leading-[1.75] text-ink-soft">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </article>
      </div>
    </main>
  )
}
