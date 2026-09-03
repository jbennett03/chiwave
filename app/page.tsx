import { Hero } from '@/components/home/Hero'
import { StatsStrip } from '@/components/home/StatsStrip'
import { RecentEntries } from '@/components/home/RecentEntries'
import { RecentAlbumsRail } from '@/components/home/RecentAlbumsRail'

export const dynamic = "force-dynamic"
export default function HomePage() {
  return (
    <main>
      <Hero />
      <StatsStrip />
      <RecentEntries />
      <RecentAlbumsRail />
    </main>
  )
}
