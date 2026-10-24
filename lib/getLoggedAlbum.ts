import albumsData from '@/content/albums.json'
import type { Album } from './types'

/**
 * Returns all logged albums with metadata, sorted newest-first.
 * Metadata is now loaded from albums.json directly (pre-fetched from MusicBrainz).
 */
export async function getLoggedAlbums(): Promise<Album[]> {
  const albums: Album[] = albumsData.map((entry) => {
    // Transform flat album data to Album type with meta field
    const meta = {
      id: entry.mbid,
      title: entry.title || 'Untitled album',
      artist: entry.artist || 'Unknown artist',
      coverUrl: entry.coverUrl || '',
      releaseDate: entry.releaseDate || '',
    }
    return { ...entry, meta }
  })

  return albums.sort((a, b) => (a.loggedDate < b.loggedDate ? 1 : -1))
}
