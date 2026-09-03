import type { Album } from '@/lib/types'
import { Tag } from '@/components/ui/Tag'
import { formatDateLong } from '@/lib/journal'

const gradients = [
  'linear-gradient(150deg,#D9A441,#A3432B)',
  'linear-gradient(150deg,#6B7F62,#1B1E2A)',
  'linear-gradient(150deg,#A3432B,#2A2E40)',
  'linear-gradient(150deg,#D9A441,#6B7F62)',
  'linear-gradient(150deg,#2A2E40,#A3432B)',
]

function initials(title: string) {
  return title
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

export function AlbumCard({ album, index }: { album: Album; index: number }) {
  const { meta } = album

  return (
    <div className="cursor-pointer">
      <div
        className="aspect-square rounded mb-3.5 p-4 flex flex-col justify-between relative overflow-hidden bg-cover bg-center"
        style={{
          background: meta.coverUrl ? undefined : gradients[index % gradients.length],
          backgroundImage: meta.coverUrl ? `url(${meta.coverUrl})` : undefined,
        }}
      >
        {!meta.coverUrl && (
          <span className="font-display font-semibold text-[15px] leading-tight text-white/90">
            {initials(meta.title)}
          </span>
        )}
      </div>
      <div className="text-[13px] text-ink-soft">{meta.artist}</div>
      <div className="font-display text-base font-medium mt-0.5">{meta.title}</div>
      <div className="flex gap-1.5 flex-wrap mt-2">
        <Tag>{formatDateLong(album.loggedDate)}</Tag>
      </div>
    </div>
  )
}