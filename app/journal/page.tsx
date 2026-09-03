import { getAllEntries } from '@/lib/journal'
import { JournalRow } from '@/components/journal/JournalRow'
import { Eyebrow } from '@/components/ui/Eyebrow'

export default function JournalPage() {
  const entries = getAllEntries()

  return (
    <main>
      <div className="max-w-content mx-auto px-8 py-16 border-b border-ink/10">
        <Eyebrow>The journal</Eyebrow>
        <h1 className="font-display text-[38px] font-medium">Notes between the tracks</h1>
      </div>
      <div className="max-w-content mx-auto px-8 py-12 pb-20">
        {entries.length === 0 && (
          <p className="text-ink-soft text-sm">No entries yet — add .mdx files to content/journal.</p>
        )}
        {entries.map((entry) => (
          <JournalRow key={entry.slug} entry={entry} />
        ))}
      </div>
    </main>
  )
}
