export type AlbumEntry = {
  mbid: string
  loggedDate: string
}

export type AlbumMeta = {
  id: string
  title: string
  artist: string
  coverUrl: string
  releaseDate: string
}

export type Album = AlbumEntry & {
  meta: AlbumMeta
}

export type JournalEntry = {
  slug: string
  title: string
  date: string
  tags: string[]
  excerpt: string
  readingTime: string
  content: string
}