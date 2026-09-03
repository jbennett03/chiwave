import Link from 'next/link'
import { getLoggedAlbums } from '@/lib/getLoggedAlbum'
import { AlbumCard } from '@/components/albums/AlbumCard'

export async function RecentAlbumsRail() {
  const albums = await getLoggedAlbums()
  const recent = albums.slice(0, 5)

  return (
    <div className="max-w-content mx-auto px-8 pb-20">
      <div className="flex justify-between items-baseline mb-9 border-b border-ink/10 pb-[18px]">
        <h2 className="font-display text-[28px] font-medium">Recently logged</h2>
        <Link href="/albums" className="text-sm text-rust font-semibold">
          Open the shelf →
        </Link>
      </div>
      {recent.length === 0 && (
        <p className="text-ink-soft text-sm">No albums logged yet.</p>
      )}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {recent.map((album, i) => (
          <AlbumCard key={album.mbid} album={album} index={i} />
        ))}
      </div>
    </div>
  )
}