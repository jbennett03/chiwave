'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: 'Home', idx: '01' },
  { href: '/albums', label: 'Albums', idx: '02' },
  { href: '/journal', label: 'Journal', idx: '03' },
  { href: '/about', label: 'About', idx: '04' },
]

export function TopNav() {
  const pathname = usePathname()
  return (
    <div className="sticky top-0 z-50 bg-ink border-b border-white/10">
      <div className="max-w-content mx-auto px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 font-display font-semibold text-xl text-paper">
          <span className="w-5 h-5 rounded-full bg-gradient-to-br from-gold via-rust to-sage" />
          Wavelog
        </Link>
        <nav className="flex">
          {links.map((l) => {
            const active = pathname === l.href
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`h-16 px-[18px] flex items-center gap-2.5 text-sm border-b-2 transition-opacity
                  ${active ? 'opacity-100 border-gold text-paper' : 'opacity-55 border-transparent text-paper hover:opacity-85'}`}
              >
                <span className="font-mono text-[11px] text-gold">{l.idx}</span>
                {l.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}