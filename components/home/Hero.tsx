import { Eyebrow } from '@/components/ui/Eyebrow'
import { NowPlaying } from './NowPlaying'

export function Hero() {
  return (
    <div className="max-w-content mx-auto px-8 py-[88px] border-b border-ink/10">
      <div className="grid grid-cols-1 md:grid-cols-[1.15fr_0.85fr] gap-16 items-center">
        <div>
          <Eyebrow>My listening diary</Eyebrow>
          <h1 className="font-display font-medium text-5xl md:text-[56px] leading-[1.04] tracking-tight">
            Every album that
            <br />
            left a <em className="italic text-rust">mark</em>.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ink-soft max-w-[46ch]">
            Hi! Welcome to my personal music log.  
            I list albums that have shaped not only my taste but also reflect my personality (a bit).
          </p>
          <div className="mt-8 flex gap-3.5">
            <a
              href="/albums"
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold border border-ink bg-ink text-paper"
            >
              The collection
            </a>
            <a
              href="/journal"
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold border border-ink text-ink"
            >
              The journal
            </a>
          </div>
        </div>
        <NowPlaying />
      </div>
    </div>
  )
}
