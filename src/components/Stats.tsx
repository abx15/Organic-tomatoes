import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import RevealText from "./RevealText";

const stats = [
  { label: "Acres farmed", value: 22, suffix: "" },
  { label: "Tomatoes harvested", value: 1.4, suffix: "M+" },
  { label: "Organic certifications", value: 7, suffix: "" },
  { label: "Happy customers", value: 38, suffix: "K" },
];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1800;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 4);
      setN(Number((eased * to).toFixed(to < 10 ? 1 : 0)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="relative bg-[#FDF8F4] py-32 md:py-48">
      <div className="mx-auto max-w-7xl px-6">
        <RevealText
          as="h2"
          className="font-display mb-20 max-w-4xl text-5xl font-light leading-[0.95] tracking-[-0.02em] text-[#3E2723] md:text-7xl"
        >
          Small numbers. <em className="italic text-[#E53935]">Big seasons.</em>
        </RevealText>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-[#3E2723]/10 md:grid-cols-4">
          {stats.map((s) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
              className="bg-[#FDF8F4] p-8 md:p-12"
            >
              <div className="font-display text-5xl text-[#3E2723] md:text-7xl">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-4 text-xs uppercase tracking-[0.28em] text-[#3E2723]/60">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
