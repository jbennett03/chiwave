import type { Metadata } from 'next'
import { Fraunces, Source_Sans_3, JetBrains_Mono } from 'next/font/google'
import { TopNav } from '@/components/nav/TopNav'
import { Footer } from '@/components/layout/Footer'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  weight: ['300', '500', '600'],
  style: ['normal', 'italic'],
})
const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-source-sans',
  weight: ['400', '500', '600'],
})
const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  weight: ['400', '500'],
})

export const metadata: Metadata = {
  title: 'Wavelog — a listening diary',
  description: 'A running log of albums, logged one at a time, year by year.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${sourceSans.variable} ${jetbrains.variable}`}>
      <body className="bg-paper text-ink font-sans antialiased">
        <TopNav />
        {children}
        <Footer />
      </body>
    </html>
  )
}
