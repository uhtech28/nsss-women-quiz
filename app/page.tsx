import Petals from "./components/Petals";

export default function HomePage() {
  return (
    <main
      className="
        relative min-h-screen flex items-center justify-center overflow-hidden px-4

        /* MOBILE FALLBACK GRADIENT */
        bg-gradient-to-br from-[#1a0b2e] via-[#2a0f45] to-[#0f0617]

        /* DESKTOP GRADIENT */
        md:bg-gradient-to-br md:from-[#0f0617] md:via-[#1a0b2e] md:to-[#2a0f45]
      "
    >
      {/* 📱 MOBILE BACKGROUND IMAGE */}
      <div
        className="
          absolute inset-0 z-0
          bg-[url('/drk.jpg')]
          bg-cover bg-center bg-no-repeat
          md:hidden
        "
      />

      {/* 🌫️ DARK GRADIENT OVERLAY (MOBILE) */}
      <div
        className="
          absolute inset-0 z-[1]
          bg-gradient-to-b
          from-purple-900/60
          via-purple-900/50
          to-black/70
          md:hidden
        "
      />

      {/* 🌸 PETALS */}
      <Petals />

      {/* ✨ GLOW ORBS */}
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-purple-600/30 blur-3xl z-[2]" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-pink-500/20 blur-3xl z-[2]" />

      {/* 💎 MAIN CARD */}
      <div
        className="
          relative z-10 w-full max-w-lg rounded-3xl
          bg-[#1c102b]/80 md:bg-white/10
          backdrop-blur-xl md:backdrop-blur-2xl
          border border-white/20
          shadow-[0_40px_120px_rgba(0,0,0,0.65)]
          p-8 md:p-10 text-center
        "
      >
        {/* ICON */}
        <div
          className="
            mx-auto mb-4 flex h-16 w-16 items-center justify-center
            rounded-full bg-gradient-to-br from-pink-500 to-purple-600
            shadow-xl
          "
        >
          <span className="text-3xl">🌸</span>
        </div>

        {/* TITLE */}
        <h1 className="text-6xl font-extrabold tracking-tight text-white leading-tight">
          International Day of Women and Girls<br /> in Science Quiz
        </h1>

        {/* SUBTITLE */}
        <p className="mt-3 text-sm font-medium text-purple-200">
          NSS BIT Jaipur • Team Samarpan
        </p>

        {/* QUOTE */}
        <p className="mt-6 text-base italic text-purple-100 leading-relaxed">
          “Her curiosity today is the breakthrough of tomorrow.”
        </p>

        {/* CTA */}
        <a
          href="/register"
          className="
            mt-8 inline-flex w-full items-center justify-center rounded-2xl
            bg-gradient-to-r from-pink-500 to-purple-600
            py-4 text-lg font-semibold text-white
            shadow-xl shadow-purple-700/40
            transition-all duration-200
            hover:from-pink-600 hover:to-purple-700
            active:scale-[0.97]
          "
        >
          Start Quiz
        </a>

        {/* FOOTER */}
        <p className="mt-6 text-xs font-medium text-purple-300">
          Scan • Register • Quiz • Certificate
        </p>

        <p className="mt-3 text-[10px] uppercase tracking-widest text-purple-400">
          Powered by UH Tech
        </p>
      </div>
    </main>
  );
}
