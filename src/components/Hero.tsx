import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import MagneticButton from "./MagneticButton";
import RevealText from "./RevealText";
import LottieImage from "./LottieImage";
import CinematicVideo from "./CinematicVideo";
import heroImg from "../assets/hero-farm.jpg";
import tomato from "../assets/tomato-hero.jpg";
import aerialVid from "../assets/video-aerial.mp4.asset.json";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const fade = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

  return (
    <section ref={ref} className="relative h-[110vh] overflow-hidden bg-[#1a0e0a]">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <LottieImage
          src={heroImg}
          alt="Organic tomato fields at sunrise"
          variant="sun"
          loading="eager"
          timeoutMs={6000}
          className="h-full w-full"
          imgClassName="h-full w-full object-cover"
        />
        <CinematicVideo
          src={aerialVid.url}
          className="absolute inset-0 h-full w-full opacity-60 mix-blend-screen"
          videoClassName="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0e0a]/30 via-transparent to-[#1a0e0a]/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a0e0a]/40 via-transparent to-[#1a0e0a]/40" />
      </motion.div>

      {/* Floating particles */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 28 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-[#FFD8A8]/70"
            style={{ left: `${(i * 37) % 100}%`, top: `${(i * 53) % 100}%` }}
            animate={{ y: [0, -40, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 6 + (i % 5), repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>

      {/* Floating tomato */}
      <motion.img
        src={tomato}
        alt=""
        aria-hidden
        className="floaty pointer-events-none absolute right-[6%] top-[18%] hidden h-56 w-56 rounded-full object-cover shadow-[0_40px_120px_-20px_rgba(229,57,53,0.6)] ring-1 ring-white/10 md:block"
        style={{ y }}
      />
      <motion.img
        src={tomato}
        alt=""
        aria-hidden
        className="floaty pointer-events-none absolute -left-10 bottom-[18%] hidden h-40 w-40 rounded-full object-cover opacity-80 shadow-2xl md:block"
        style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "50%"]), animationDelay: "-3s" }}
      />

      <motion.div
        style={{ y: titleY, opacity: fade }}
        className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-32 md:pb-40"
      >
        <div className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-[#FDF8F4]/70">
          <span className="h-px w-10 bg-[#FDF8F4]/40" />
          Est. 1968 — Hand grown in the Deccan plateau
        </div>

        <h1 className="font-display text-[14vw] font-light leading-[0.88] tracking-[-0.03em] md:text-[10vw]">
          <RevealText
            as="span"
            className="block text-[#FDF8F4]"
          >
            Organic tomatoes
          </RevealText>
          <RevealText
            as="span"
            delay={0.15}
            className="block italic text-[#FF7043]"
          >
            from soil to soul.
          </RevealText>
        </h1>

        <div className="mt-10 flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
          <RevealText
            as="p"
            delay={0.4}
            stagger={0.02}
            className="max-w-md text-base text-[#FDF8F4]/75 md:text-lg"
          >
            Fresh. Natural. Hand grown by farmers who treat every vine like family — and every tomato like a small, quiet miracle.
          </RevealText>

          <div className="flex flex-wrap gap-4">
            <MagneticButton variant="solid">Explore the farm</MagneticButton>
            <MagneticButton variant="ghost">Watch the journey</MagneticButton>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-[#FDF8F4]/60">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span>Scroll</span>
          <span className="h-10 w-px bg-gradient-to-b from-[#FDF8F4]/60 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
