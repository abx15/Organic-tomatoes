import { motion, useScroll, useTransform } from "framer-motion";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import RevealText from "./RevealText";
import tomato from "../assets/tomato-hero.jpg";

const TomatoModel = lazy(() => import("./TomatoModel"));

const LEAVES_LOTTIE = "https://lottie.host/2c4b5d7e-1f3a-4b8c-9d2e-6a7b8c9d0e1f/leaves.json";

const facts = [
  { k: "Lycopene", v: "2,573 µg", note: "per 100g" },
  { k: "Vitamin C", v: "14 mg", note: "daily 16%" },
  { k: "Sugar", v: "2.6 g", note: "natural" },
  { k: "Calories", v: "18 kcal", note: "per 100g" },
];

export default function Showcase() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 1.05, 0.9]);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#1a0e0a] py-32 text-[#FDF8F4] md:py-48">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 50%, rgba(255,112,67,0.25), transparent 60%), radial-gradient(40% 40% at 80% 20%, rgba(229,57,53,0.3), transparent 70%)",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 md:grid-cols-2">
        <div>
          <div className="mb-4 text-xs uppercase tracking-[0.32em] text-[#FF7043]">
            <span className="mr-3">◍</span>The fruit, examined
          </div>
          <RevealText
            as="h2"
            className="font-display text-5xl font-light leading-[0.95] tracking-[-0.02em] md:text-7xl"
          >
            A small red planet of nutrition.
          </RevealText>
          <p className="mt-6 max-w-md text-base text-white/70 md:text-lg">
            Rotate it. Inspect it. Every tomato we grow is a tiny dossier of vitamins, antioxidants and quiet biological genius.
          </p>

          <div className="mt-12 grid grid-cols-2 gap-4">
            {facts.map((f, i) => (
              <motion.div
                key={f.k}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur"
              >
                <div className="text-xs uppercase tracking-[0.2em] text-white/50">{f.k}</div>
                <div className="font-display mt-2 text-3xl">{f.v}</div>
                <div className="text-xs text-white/40">{f.note}</div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative flex h-[520px] items-center justify-center">
          <motion.div
            style={{ scale }}
            className="relative h-[480px] w-[480px] max-w-full"
          >
            <div className="absolute inset-0 rounded-full bg-[#E53935] blur-3xl opacity-40" />
            {mounted ? (
              <Suspense fallback={
                <img src={tomato} alt="" className="relative h-full w-full rounded-full object-cover" />
              }>
                <TomatoModel />
              </Suspense>
            ) : (
              <img src={tomato} alt="Tomato" className="relative h-full w-full rounded-full object-cover" />
            )}
            {/* Lottie leaves drifting over the 3D tomato — fails silently if asset is missing */}
            {mounted && (
              <div className="pointer-events-none absolute inset-0 opacity-60 mix-blend-screen">
                <Player
                  autoplay
                  loop
                  src={LEAVES_LOTTIE}
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            )}
          </motion.div>


          {/* orbiting tags */}
          {["Heirloom", "Sun-ripened", "Vine-cured", "Hand-picked"].map((t, i) => (
            <motion.div
              key={t}
              className="absolute rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] backdrop-blur"
              style={{
                top: `${20 + (i % 2) * 60}%`,
                left: `${i * 25}%`,
              }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.3 }}
            >
              {t}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
