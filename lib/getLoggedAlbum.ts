import albumsData from '@/content/albums.json'
import { getAlbumMeta } from './album-metadata'
import type { Album } from './types'

/**
 * Fetches metadata for every logged album, sorted newest-first.
 *
 * Requests run sequentially with a short delay between them —
 * MusicBrainz's unauthenticated API asks for max 1 request/second.
 * Combined with the page-level `revalidate` caching, this only
 * runs the slow path once per cache window, not per visitor.
 */
export async function getLoggedAlbums(): Promise<Album[]> {
  const albums: Album[] = []

  for (const entry of albumsData) {
    const meta = await getAlbumMeta(entry.mbid)
    albums.push({ ...entry, meta })
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }

  return albums.sort((a, b) => (a.loggedDate < b.loggedDate ? 1 : -1))
}
