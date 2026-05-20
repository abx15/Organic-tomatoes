import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import RevealText from "./RevealText";
import CinematicVideo from "./CinematicVideo";
import aerial from "../assets/video-aerial.mp4.asset.json";
import hands from "../assets/video-hands.mp4.asset.json";
import water from "../assets/video-water.mp4.asset.json";
import mandi from "../assets/video-mandi.mp4.asset.json";
import heroPoster from "../assets/hero-farm.jpg";
import handsPoster from "../assets/story-harvest.jpg";
import waterPoster from "../assets/story-water.jpg";
import mandiPoster from "../assets/life-market.jpg";

const reel = [
  { src: aerial.url, poster: heroPoster, label: "Field 03", caption: "Aerial · 5:42 AM" },
  { src: hands.url, poster: handsPoster, label: "Harvest", caption: "Ramesh · the cut" },
  { src: water.url, poster: waterPoster, label: "Monsoon", caption: "First rain · Aug" },
  { src: mandi.url, poster: mandiPoster, label: "Mandi", caption: "Dawn delivery" },
];

export default function VideoReel() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yA = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const yB = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#1a0e0a] py-32 text-[#FDF8F4] md:py-48">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(50% 40% at 20% 30%, rgba(255,112,67,0.35), transparent 60%), radial-gradient(40% 40% at 80% 70%, rgba(229,57,53,0.3), transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-16 flex items-end justify-between">
          <div>
            <div className="mb-4 text-[10px] uppercase tracking-[0.32em] text-[#FF7043]">
              <span className="mr-3">◉</span>Moving frames
            </div>
            <RevealText
              as="h2"
              className="font-display max-w-3xl text-5xl font-light leading-[0.95] tracking-[-0.02em] md:text-7xl"
            >
              The farm, <em className="italic text-[#FF7043]">in motion</em>.
            </RevealText>
          </div>
          <span className="hidden text-[10px] uppercase tracking-[0.28em] text-white/40 md:block">
            4 reels · 35mm · no music
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          <motion.div style={{ y: yA }} className="md:col-span-7">
            <CinematicVideo
              src={reel[0].src}
              poster={reel[0].poster}
              label={reel[0].label}
              caption={reel[0].caption}
              className="aspect-video rounded-[2rem] ring-1 ring-white/10"
            />
          </motion.div>
          <motion.div style={{ y: yB }} className="md:col-span-5">
            <CinematicVideo
              src={reel[1].src}
              poster={reel[1].poster}
              label={reel[1].label}
              caption={reel[1].caption}
              className="aspect-[4/5] h-full rounded-[2rem] ring-1 ring-white/10"
            />
          </motion.div>
          <motion.div style={{ y: yB }} className="md:col-span-5">
            <CinematicVideo
              src={reel[2].src}
              poster={reel[2].poster}
              label={reel[2].label}
              caption={reel[2].caption}
              className="aspect-square rounded-[2rem] ring-1 ring-white/10"
            />
          </motion.div>
          <motion.div style={{ y: yA }} className="md:col-span-7">
            <CinematicVideo
              src={reel[3].src}
              poster={reel[3].poster}
              label={reel[3].label}
              caption={reel[3].caption}
              className="aspect-video rounded-[2rem] ring-1 ring-white/10"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
