import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import RevealText from "./RevealText";
import portrait from "../assets/farmer-portrait.jpg";

export default function Quote() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

  return (
    <section ref={ref} className="relative h-[120vh] overflow-hidden bg-[#3E2723] text-[#FDF8F4]">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img
          src={portrait}
          alt="The farmer"
          loading="lazy"
          className="h-full w-full object-cover object-[center_20%] opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#3E2723]/40 via-[#3E2723]/30 to-[#3E2723]" />
      </motion.div>

      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-center px-6">
        <div className="mb-8 text-xs uppercase tracking-[0.32em] text-[#FF7043]">
          <span className="mr-3">◍</span>From the farmer
        </div>
        <RevealText
          as="blockquote"
          stagger={0.06}
          className="font-display text-5xl font-light leading-[1.05] tracking-[-0.02em] md:text-[7vw]"
        >
          We don't grow tomatoes.
        </RevealText>
        <RevealText
          as="blockquote"
          delay={0.1}
          stagger={0.06}
          className="font-display text-5xl font-light italic leading-[1.05] tracking-[-0.02em] text-[#FF7043] md:text-[7vw]"
        >
          We grow trust, health, and life.
        </RevealText>

        <div className="mt-14 flex items-center gap-4">
          <div className="h-12 w-12 overflow-hidden rounded-full ring-2 ring-[#FDF8F4]/30">
            <img src={portrait} alt="" className="h-full w-full object-cover" />
          </div>
          <div>
            <div className="text-sm">Ramesh Kulkarni</div>
            <div className="text-xs uppercase tracking-[0.24em] text-[#FDF8F4]/60">
              Third-generation farmer
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
