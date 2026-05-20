import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import field from "../assets/parallax-fields.jpg";
import tomato from "../assets/tomato-hero.jpg";
import RevealText from "./RevealText";
import DepthLayer from "./DepthLayer";
import CinematicVideo from "./CinematicVideo";
import waterVid from "../assets/video-water.mp4.asset.json";
import waterPoster from "../assets/story-water.jpg";

export default function ParallaxBanner() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const yMid = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  const yFront = useTransform(scrollYProgress, [0, 1], ["40%", "-40%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.05]);

  return (
    <section
      ref={ref}
      className="relative h-[120vh] overflow-hidden bg-[#1a0e0a]"
      aria-label="Aerial view of the organic farm"
    >
      <motion.div style={{ y: yBg, scale }} className="absolute inset-0">
        <img
          src={field}
          alt="Aerial view of the tomato fields at dawn"
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0e0a]/40 via-[#1a0e0a]/10 to-[#1a0e0a]" />
      </motion.div>

      <DepthLayer count={42} tint="#FF7043" variant="embers" className="z-[1] opacity-70" />

      {/* inline cinematic video panel */}
      <div className="pointer-events-none absolute right-[4%] top-[12%] z-[2] hidden h-64 w-96 md:block">
        <CinematicVideo
          src={waterVid.url}
          poster={waterPoster}
          label="Monsoon"
          className="h-full w-full rounded-3xl shadow-[0_40px_120px_-30px_rgba(0,0,0,0.6)] ring-1 ring-white/10"
        />
      </div>

      {/* mid floating tomato */}
      <motion.img
        src={tomato}
        alt=""
        aria-hidden
        style={{ y: yMid }}
        className="floaty pointer-events-none absolute left-[8%] top-[28%] hidden h-44 w-44 rounded-full object-cover opacity-90 shadow-[0_40px_120px_-20px_rgba(229,57,53,0.6)] ring-1 ring-white/10 md:block"
      />
      <motion.img
        src={tomato}
        alt=""
        aria-hidden
        style={{ y: yFront }}
        className="floaty pointer-events-none absolute right-[6%] top-[55%] hidden h-32 w-32 rounded-full object-cover opacity-95 shadow-2xl ring-1 ring-white/10 md:block [animation-delay:-2s]"
      />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-6 text-center">
        <div className="mb-6 text-[10px] uppercase tracking-[0.4em] text-[#FF7043]">
          ◇ 14 acres · single farm · zero shortcuts
        </div>
        <RevealText
          as="h2"
          className="font-display text-[12vw] font-light leading-[0.9] tracking-[-0.03em] text-[#FDF8F4] md:text-[7vw]"
        >
          A whole horizon
        </RevealText>
        <RevealText
          as="h2"
          delay={0.12}
          className="font-display text-[12vw] font-light italic leading-[0.9] tracking-[-0.03em] text-[#FF7043] md:text-[7vw]"
        >
          of red, by hand.
        </RevealText>
        <RevealText
          as="p"
          delay={0.3}
          className="mt-8 max-w-xl text-base text-[#FDF8F4]/75 md:text-lg"
        >
          Every vine you see was planted by the same five pairs of hands. No drones,
          no chemicals, no shortcuts — just patience, ratooning, and a deep respect
          for the seasons.
        </RevealText>
      </div>
    </section>
  );
}
