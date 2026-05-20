import { motion } from "framer-motion";
import { FaInstagram, FaYoutube, FaXTwitter } from "react-icons/fa6";
import RevealText from "./RevealText";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#1a0e0a] py-24 text-[#FDF8F4]">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(50% 60% at 50% 100%, rgba(229,57,53,0.35), transparent 70%), radial-gradient(40% 40% at 80% 10%, rgba(255,112,67,0.25), transparent 70%)",
        }}
      />
      {/* floating dust */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 18 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-[#FF7043]/60"
            style={{ left: `${(i * 53) % 100}%`, top: `${(i * 31) % 100}%` }}
            animate={{ y: [0, -30, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 5 + (i % 4), repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <RevealText
          as="h2"
          className="font-display max-w-4xl text-5xl font-light leading-[0.95] tracking-[-0.02em] md:text-8xl"
        >
          Eat with the seasons.
        </RevealText>
        <RevealText
          as="h2"
          delay={0.1}
          className="font-display max-w-4xl text-5xl font-light italic leading-[0.95] tracking-[-0.02em] text-[#FF7043] md:text-8xl"
        >
          Live with the soil.
        </RevealText>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="mt-16 flex max-w-2xl flex-col gap-3 rounded-full border border-white/15 bg-white/[0.04] p-2 backdrop-blur md:flex-row md:items-center"
        >
          <input
            type="email"
            required
            placeholder="your@email.com"
            className="flex-1 rounded-full bg-transparent px-6 py-4 text-sm text-white placeholder:text-white/40 focus:outline-none"
          />
          <button className="rounded-full bg-[#E53935] px-8 py-4 text-xs uppercase tracking-[0.24em] text-white transition-colors hover:bg-[#c62828]">
            Join the harvest list
          </button>
        </form>

        <div className="mt-24 grid grid-cols-2 gap-10 border-t border-white/10 pt-10 md:grid-cols-4">
          <div>
            <div className="font-display text-2xl">Sol & Soil</div>
            <p className="mt-3 text-xs text-white/50">
              Hand grown, hand picked, honestly packed. Since 1968.
            </p>
          </div>
          {[
            { h: "Farm", l: ["The story", "Practices", "Certifications"] },
            { h: "Visit", l: ["Tours", "Workshops", "Stay"] },
            { h: "Shop", l: ["Baskets", "Subscriptions", "Gift"] },
          ].map((c) => (
            <div key={c.h}>
              <div className="mb-4 text-xs uppercase tracking-[0.28em] text-white/50">{c.h}</div>
              <ul className="space-y-2 text-sm">
                {c.l.map((i) => (
                  <li key={i}>
                    <a href="#" className="text-white/80 transition-colors hover:text-[#FF7043]">
                      {i}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center">
          <div className="text-xs text-white/40">
            © {new Date().getFullYear()} Sol & Soil Farms. Grown with care.
          </div>
          <div className="flex items-center gap-5 text-lg text-white/60">
            <a href="#" className="transition-colors hover:text-[#FF7043]"><FaInstagram /></a>
            <a href="#" className="transition-colors hover:text-[#FF7043]"><FaYoutube /></a>
            <a href="#" className="transition-colors hover:text-[#FF7043]"><FaXTwitter /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
