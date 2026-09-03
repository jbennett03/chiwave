import { getLoggedAlbums } from '@/lib/getLoggedAlbum'
import { AlbumGrid } from '@/components/albums/AlbumGrid'
import { AlbumsHeader } from '@/components/albums/AlbumsHeader'

export const dynamic = "force-dynamic"
export const revalidate = 3600

export default async function AlbumsPage() {
  const albums = await getLoggedAlbums()

  return (
    <main>
      <AlbumsHeader />
      <AlbumGrid albums={albums} />
    </main>
  )
}
