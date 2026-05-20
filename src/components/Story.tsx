import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import RevealText from "./RevealText";
import soil from "../assets/story-soil.jpg";
import water from "../assets/story-water.jpg";
import harvest from "../assets/story-harvest.jpg";
import delivery from "../assets/story-delivery.jpg";

type Chapter = {
  idx: string;
  time: string;
  title: string;
  body: string;
  img: string;
};

const chapters: Chapter[] = [
  {
    idx: "01",
    time: "04:42",
    title: "Before the sun.",
    body: "Ramesh wakes when the village is still asleep. A quiet tea, a quiet prayer, then the long walk to the field — the soil under his feet a kind of memory.",
    img: soil,
  },
  {
    idx: "02",
    time: "06:18",
    title: "The first water.",
    body: "Drip by patient drip. No flooding. No waste. Just the steady, glistening rhythm that ripe tomatoes have asked for since long before we knew their names.",
    img: water,
  },
  {
    idx: "03",
    time: "17:55",
    title: "The harvest.",
    body: "Each tomato is picked by hand at the precise moment of ripeness. The basket fills slowly. The light turns gold. The day, finally, begins to soften.",
    img: harvest,
  },
  {
    idx: "04",
    time: "next morning",
    title: "To your table.",
    body: "Within hours, our baskets travel from soil to kitchen — never refrigerated, never gassed, never anything but themselves.",
    img: delivery,
  },
];

export default function Story() {
  return (
    <section className="relative bg-[#FDF8F4] py-32 md:py-48">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-24 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <div className="mb-4 text-xs uppercase tracking-[0.32em] text-[#3E2723]/60">
              <span className="mr-3">◍</span>A day on the farm
            </div>
            <RevealText
              as="h2"
              className="font-display max-w-3xl text-5xl font-light leading-[0.95] tracking-[-0.02em] text-[#3E2723] md:text-7xl"
            >
              Four chapters between sunrise and your supper.
            </RevealText>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-[#3E2723]/70">
            Twenty-two acres. Seven families. No synthetic anything. Just patience, weather and the small daily acts of care that turn a seed into something worth eating.
          </p>
        </div>

        <div className="space-y-32 md:space-y-56">
          {chapters.map((c, i) => (
            <Chapter key={c.idx} chapter={c} reverse={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Chapter({ chapter, reverse }: { chapter: Chapter; reverse: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1, 1.15]);
  const clip = useTransform(scrollYProgress, [0, 0.4], ["inset(15% 5% 15% 5%)", "inset(0% 0% 0% 0%)"]);

  return (
    <div
      ref={ref}
      className={`grid grid-cols-1 items-center gap-12 md:grid-cols-12 md:gap-16 ${reverse ? "md:[direction:rtl]" : ""}`}
    >
      <motion.div
        style={{ clipPath: clip as never }}
        className="relative col-span-1 aspect-[5/6] overflow-hidden rounded-3xl md:col-span-7 [direction:ltr]"
      >
        <motion.img
          src={chapter.img}
          alt={chapter.title}
          loading="lazy"
          style={{ scale }}
          className="h-full w-full object-cover"
        />
        <div className="absolute left-6 top-6 flex items-center gap-3 rounded-full bg-black/30 px-4 py-2 text-xs uppercase tracking-[0.28em] text-white/90 backdrop-blur">
          <span>{chapter.idx}</span>
          <span className="h-3 w-px bg-white/40" />
          <span>{chapter.time}</span>
        </div>
      </motion.div>

      <motion.div style={{ y }} className="col-span-1 md:col-span-5 [direction:ltr]">
        <RevealText
          as="h3"
          className="font-display mb-6 text-4xl font-light leading-[1] tracking-[-0.02em] text-[#3E2723] md:text-6xl"
        >
          {chapter.title}
        </RevealText>
        <p className="max-w-md text-base leading-relaxed text-[#3E2723]/75 md:text-lg">
          {chapter.body}
        </p>
        <div className="mt-8 flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-[#2E7D32]">
          <span className="h-px w-8 bg-[#2E7D32]" />
          Chapter {chapter.idx}
        </div>
      </motion.div>
    </div>
  );
}
