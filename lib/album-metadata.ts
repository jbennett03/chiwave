import type { AlbumMeta } from './types'

// MusicBrainz asks that requests identify the calling application.
// Replace with your own site name/contact per their usage policy.
const USER_AGENT = 'Wavelog/1.0 (https://wavelog.example.com)'

function placeholderMeta(mbid: string): AlbumMeta {
  return {
    id: mbid,
    title: 'Untitled album',
    artist: 'Unknown artist',
    coverUrl: '',
    releaseDate: '',
  }
}

/**
 * Look up a release-group by its MusicBrainz ID (mbid) and pair it with
 * cover art from the Cover Art Archive. Both services are free and
 * require no API key — only a descriptive User-Agent header.
 */
export async function getAlbumMeta(mbid: string): Promise<AlbumMeta> {
  try {
    const res = await fetch(
      `https://musicbrainz.org/ws/2/release-group/${mbid}?fmt=json&inc=artist-credits`,
      {
        headers: { 'User-Agent': USER_AGENT },
        next: { revalidate: 60 * 60 * 24 },
      }
    )
    if (!res.ok) return placeholderMeta(mbid)
    const data = await res.json()

    // Cover Art Archive returns a redirect straight to the image when art
    // exists — we HEAD-check first so pages without cover art still fall
    // back to a gradient instead of a broken image.
    const coverUrl = `https://coverartarchive.org/release-group/${mbid}/front-500`
    const hasCover = await fetch(coverUrl, { method: 'HEAD' })
      .then((r) => r.ok)
      .catch(() => false)

    return {
      id: mbid,
      title: data.title ?? 'Untitled album',
      artist: (data['artist-credit'] ?? []).map((a: any) => a.name).join(', ') || 'Unknown artist',
      coverUrl: hasCover ? coverUrl : '',
      releaseDate: data['first-release-date'] ?? '',
    }
  } catch {
    return placeholderMeta(mbid)
  }
}

export type AlbumSearchResult = {
  mbid: string
  title: string
  artist: string
  releaseDate: string
}

/**
 * Search MusicBrainz release-groups by free text (e.g. "artist album name").
 * Useful for a future "search and add" admin tool.
 */
export async function searchAlbums(query: string): Promise<AlbumSearchResult[]> {
  if (!query) return []
  const res = await fetch(
    `https://musicbrainz.org/ws/2/release-group/?query=${encodeURIComponent(
      query
    )}&fmt=json&limit=8`,
    { headers: { 'User-Agent': USER_AGENT } }
  )
  if (!res.ok) return []
  const data = await res.json()
  return (data['release-groups'] ?? []).map((rg: any) => ({
    mbid: rg.id,
    title: rg.title,
    artist: (rg['artist-credit'] ?? []).map((a: any) => a.name).join(', ') || 'Unknown artist',
    releaseDate: rg['first-release-date'] ?? '',
  }))
}