export function Footer() {
  return (
    <footer className="bg-ink text-paper/60">
      <div className="max-w-content mx-auto px-8 py-10 flex items-center justify-between text-sm">
        <div className="flex items-center gap-2.5 font-display font-semibold text-base text-paper">
          <span className="w-5 h-5 rounded-full bg-gradient-to-br from-gold via-rust to-sage" />
          Wavelog
        </div>
        <div>A listening diary, updated weekly</div>
      </div>
    </footer>
  )
}
