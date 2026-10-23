import albumsData from '@/content/albums.json'
import { getAlbumMeta } from './album-metadata'
import type { Album } from './types'

/**
 * Fetches metadata for every logged album, sorted newest-first.
 *
 * Uses controlled concurrency (5 parallel requests) to respect MusicBrainz rate limits
 * while avoiding timeout issues on serverless platforms. Page-level `revalidate`
 * caching ensures this only runs once per cache window.
 */
export async function getLoggedAlbums(): Promise<Album[]> {
  const CONVERRENCY = 5
  const albums: Album[] = []

  for (let i = 0; i < albumsData.length; i += CONVERRENCY) {
    const batch = albumsData.slice(i, i + CONVERRENCY)
    const batchPromises = batch.map(async (entry) => {
      const meta = await getAlbumMeta(entry.mbid)
      return { ...entry, meta }
    })
    const batchResults = await Promise.all(batchPromises)
    albums.push(...batchResults)
    
    if (i + CONVERRENCY < albumsData.length) {
      await new Promise((resolve) => setTimeout(resolve, 200))
    }
  }

  return albums.sort((a, b) => (a.loggedDate < b.loggedDate ? 1 : -1))
}
