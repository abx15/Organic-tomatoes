import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import RevealText from "./RevealText";
import g1 from "../assets/gallery-1.jpg";
import g2 from "../assets/gallery-2.jpg";
import g3 from "../assets/gallery-3.jpg";
import g4 from "../assets/gallery-4.jpg";
import g5 from "../assets/story-harvest.jpg";
import g6 from "../assets/story-water.jpg";

const items = [
  { src: g1, h: "h-[420px]", cap: "Aerial · Field 03" },
  { src: g2, h: "h-[320px]", cap: "Vine · Heirloom" },
  { src: g3, h: "h-[480px]", cap: "Hands · Harvest" },
  { src: g4, h: "h-[340px]", cap: "Studio · The cut" },
  { src: g5, h: "h-[400px]", cap: "Ramesh · Basket" },
  { src: g6, h: "h-[360px]", cap: "Light · Mist" },
];

export default function Gallery() {
  const [active, setActive] = useState<string | null>(null);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yA = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const yB = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section ref={ref} className="relative bg-[#FDF8F4] py-32 md:py-48">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-20 flex items-end justify-between">
          <div>
            <div className="mb-4 text-xs uppercase tracking-[0.32em] text-[#3E2723]/60">
              <span className="mr-3">◍</span>The field diary
            </div>
            <RevealText
              as="h2"
              className="font-display max-w-3xl text-5xl font-light leading-[0.95] tracking-[-0.02em] text-[#3E2723] md:text-7xl"
            >
              Light, dirt, water — and the things in between.
            </RevealText>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {items.map((it, i) => (
            <motion.button
              key={i}
              onClick={() => setActive(it.src)}
              style={{ y: i % 2 === 0 ? yA : yB }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 150, damping: 20 }}
              className={`group relative overflow-hidden rounded-3xl text-left ${it.h}`}
            >
              <motion.img
                src={it.src}
                alt={it.cap}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute bottom-5 left-5 text-xs uppercase tracking-[0.28em] text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                {it.cap}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setActive(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6 backdrop-blur"
        >
          <motion.img
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            src={active}
            alt=""
            className="max-h-[88vh] max-w-[92vw] rounded-2xl object-contain"
          />
        </motion.div>
      )}
    </section>
  );
}
