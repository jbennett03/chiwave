import { Eyebrow } from '@/components/ui/Eyebrow'

export function AlbumsHeader() {
  return (
    <div className="max-w-content mx-auto px-8 py-16 border-b border-ink/10">
      <Eyebrow>The shelf</Eyebrow>
      <h1 className="font-display text-[38px] font-medium">Everything I've listened to</h1>
      <p className="text-ink-soft mt-3 max-w-[56ch] leading-relaxed">
        The full log of albums I've listened to. Front to back. Some more than others. 
          Some I cherish enough to write essays on. 
      </p>
    </div>
  )
}
