// Client-safe date formatters — no Node APIs (fs, path), safe to import
// from both server and client components.
//
// Two separate sets of formatters, because journal entries store a full
// date ("YYYY-MM-DD") while album entries store month + year only
// ("YYYY-MM") — they are not interchangeable.

// --- Journal entries: full date ("2026-08-14") ---

export function formatDate(dateStr: string): string {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d
    .toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' })
    .replace(/\//g, '.')
}

export function formatDateLong(dateStr: string): string {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
}

// --- Album entries: month + year only ("2026-08") ---

export function formatMonth(monthStr: string): string {
  if (!monthStr) return ''
  const d = new Date(`${monthStr}-01T00:00:00`)
  return d.toLocaleDateString('en-US', { month: '2-digit', year: '2-digit' }).replace(/\//g, '.')
}

export function formatMonthLong(monthStr: string): string {
  if (!monthStr) return ''
  const d = new Date(`${monthStr}-01T00:00:00`)
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}