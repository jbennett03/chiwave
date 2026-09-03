import type { Album } from '@/lib/types'
import { AlbumCard } from './AlbumCard'

export function AlbumGrid({ albums }: { albums: Album[] }) {
  if (albums.length === 0) {
    return (
      <div className="max-w-content mx-auto px-8 py-20">
        <p className="text-ink-soft text-sm">
          No albums logged yet — add entries to content/albums.json.
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-content mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-7 py-12 pb-20">
      {albums.map((album, i) => (
        <AlbumCard key={album.spotifyId} album={album} index={i} />
      ))}
    </div>
  )
}
