'use client'
import Image from 'next/image'

import { useEffect, useMemo, useRef, useState } from 'react'

declare global {
  interface Window {
    YT: any
    onYouTubeIframeAPIReady: () => void
  }
}

const VIDEO_ID = 'IGuvtKkYNig'

export function NowPlaying() {
  const bars = useMemo(
    () => Array.from({ length: 40 }, (_, i) => 4 + Math.round(Math.abs(Math.sin(i * 0.6)) * 20)),
    []
  )

  const playerRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [muted, setMuted] = useState(true)
  const [ready, setReady] = useState(false)
  const [title, setTitle] = useState('Loading track…')
  const [author, setAuthor] = useState('')

  // Fetch title/author via YouTube's public oEmbed endpoint — official,
  // documented, and independent of the player instance itself.
  useEffect(() => {
    fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${VIDEO_ID}&format=json`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!data) return
        setTitle(data.title || 'Untitled')
        setAuthor(data.author_name || '')
      })
      .catch(() => {
        setTitle('Untitled')
      })
  }, [])

  // Player instance only handles playback + mute state, nothing else.
  useEffect(() => {
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    document.body.appendChild(tag)

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId: VIDEO_ID,
        playerVars: {
          autoplay: 1,
          mute: 1,
          loop: 1,
          playlist: VIDEO_ID,
          controls: 0,
          disablekb: 1,
        },
        events: {
          onReady: () => setReady(true),
        },
      })
    }

    return () => {
      window.onYouTubeIframeAPIReady = () => {}
    }
  }, [])

  function toggleMute() {
    if (!playerRef.current) return
    if (muted) {
      playerRef.current.unMute()
      playerRef.current.playVideo()
    } else {
      playerRef.current.mute()
    }
    setMuted(!muted)
  }

  const initials = title
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()

  return (
    <>
      <div className="bg-ink text-paper rounded p-7 relative">
        <div ref={containerRef} className="absolute w-0 h-0 overflow-hidden" />

        <div className="flex items-center justify-between font-mono text-[11px] text-gold uppercase tracking-[0.1em] mb-5">
          <span>Current favorite</span>
          <span className="flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full bg-gold ${!muted ? 'animate-pulse-dot' : ''}`} />
            {muted ? 'Muted' : 'Live'}
          </span>
        </div>

        <div className="flex gap-[18px] items-center">
          <div className="w-[88px] h-[88px] rounded flex-none relative overflow-hidden">
  <Image
    src="/images/current-favorite.jpg"
    alt={author || 'Current favorite artist'}
    fill
    className="object-cover"
    sizes="88px"
  />
</div>
          <div className="min-w-0">
            <div className="font-display text-xl font-medium truncate">{title}</div>
            <div className="text-sm text-paper/65 mt-1 truncate">{author}</div>
          </div>
        </div>

        <div className="flex items-end gap-0.5 h-6 mt-[18px]">
          {bars.map((h, i) => (
            <span
              key={i}
              className={`w-[3px] rounded-sm transition-colors ${!muted ? 'bg-gold' : 'bg-gold/55'}`}
              style={{ height: `${h}px` }}
            />
          ))}
        </div>
      </div>

      <button
        onClick={toggleMute}
        disabled={!ready}
        className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-ink text-paper flex items-center justify-center border border-white/10 disabled:opacity-40"
        aria-label={muted ? 'Unmute background music' : 'Mute background music'}
      >
        <span className="font-mono text-xs">{muted ? 'OFF' : 'ON'}</span>
      </button>
    </>
  )
}
