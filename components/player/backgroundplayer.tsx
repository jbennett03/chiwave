'use client'

import { useEffect, useRef, useState } from 'react'

declare global {
  interface Window {
    YT: any
    onYouTubeIframeAPIReady: () => void
  }
}

const VIDEO_ID = 'YOUR_VIDEO_ID' // just the ID, not the full URL

export function BackgroundPlayer() {
  const playerRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [muted, setMuted] = useState(true)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    document.body.appendChild(tag)

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId: VIDEO_ID,
        playerVars: {
          autoplay: 1,
          mute: 1,        // must start muted — browsers block unmuted autoplay
          loop: 1,
          playlist: VIDEO_ID, // required for loop to work on a single video
          controls: 0,
          disablekb: 1,
        },
        events: {
          onReady: () => setReady(true),
        },
      })
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

  return (
    <>
      <div ref={containerRef} style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} />
      <button
        onClick={toggleMute}
        disabled={!ready}
        className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-ink text-paper flex items-center justify-center"
        aria-label={muted ? 'Unmute background music' : 'Mute background music'}
      >
        {muted ? '🔇' : '🔊'}
      </button>
    </>
  )
}