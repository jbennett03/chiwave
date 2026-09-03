import Image from 'next/image'
import { about } from '@/content/about'
import { Eyebrow } from '@/components/ui/Eyebrow'

export default function AboutPage() {
  return (
    <main>
      <div className="max-w-content mx-auto px-8 py-[72px] pb-24 grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] gap-16">
        <div className="aspect-[4/5] rounded overflow-hidden bg-gradient-to-br from-sage to-ink relative">
          {about.portraitImage && (
            <Image
              src={about.portraitImage}
              alt="Portrait"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          )}
        </div>
        <div>
          <Eyebrow>About this shelf</Eyebrow>
          <h1 className="font-display text-4xl font-medium mb-5">{about.headline}</h1>
          {about.bio.map((paragraph, i) => (
            <p
              key={i}
              className={`mb-4 leading-relaxed text-[16px] ${
                i === 0 ? 'font-display text-lg text-ink' : 'text-ink-soft'
              }`}
            >
              {paragraph}
            </p>
          ))}

          <div className="mt-8 border-t border-ink/10">
            {about.facts.map((fact) => (
              <div key={fact.label} className="flex justify-between py-3.5 border-b border-ink/10 text-sm">
                <span className="text-ink-soft">{fact.label}</span>
                <span className="font-mono">{fact.value}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 flex gap-4">
            {about.socials.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-rust"
              >
                {social.platform}
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
