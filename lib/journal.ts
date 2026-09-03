import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import type { JournalEntry } from './types'

const DIR = path.join(process.cwd(), 'content/journal')

export function getAllEntries(): JournalEntry[] {
  if (!fs.existsSync(DIR)) return []

  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
    .map((filename) => {
      const raw = fs.readFileSync(path.join(DIR, filename), 'utf8')
      const { data, content } = matter(raw)
      return {
        slug: filename.replace(/\.mdx?$/, ''),
        title: data.title ?? 'Untitled entry',
        date: data.date ?? '',
        tags: data.tags ?? [],
        excerpt: data.excerpt ?? '',
        readingTime: readingTime(content).text,
        content,
      }
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getEntry(slug: string): JournalEntry | undefined {
  return getAllEntries().find((e) => e.slug === slug)
}

export { formatDate, formatDateLong } from './format'