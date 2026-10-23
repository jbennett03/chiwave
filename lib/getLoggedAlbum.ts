import albumsData from '@/content/albums.json'
import { getAlbumMeta } from './album-metadata'
import type { Album } from './types'

/**
 * Fetches metadata for every logged album, sorted newest-first.
 *
 * Uses parallel fetching to avoid timeout issues on serverless platforms.
 * Page-level `revalidate` caching ensures this only runs once per cache window.
 */
export async function getLoggedAlbums(): Promise<Album[]> {
  const albumPromises = albumsData.map(async (entry) => {
    const meta = await getAlbumMeta(entry.mbid)
    return { ...entry, meta }
  })

  const albums = await Promise.all(albumPromises)
  return albums.sort((a, b) => (a.loggedDate < b.loggedDate ? 1 : -1))
}
