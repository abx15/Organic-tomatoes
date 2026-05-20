import { motion, useScroll, useSpring } from "framer-motion";
import MotionToggle from "./MotionToggle";

export default function Nav() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  return (
    <>
      <motion.div
        style={{ scaleX: x, transformOrigin: "0% 50%" }}
        className="fixed left-0 right-0 top-0 z-50 h-[2px] bg-[#E53935]"
      />
      <nav className="fixed left-0 right-0 top-0 z-40 px-6 py-5">
        <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/15 bg-black/30 px-5 py-3 text-[#FDF8F4] backdrop-blur-xl">
          <a href="#" className="font-display text-lg tracking-tight">Sol &amp; Soil</a>
          <div className="hidden items-center gap-8 text-xs uppercase tracking-[0.24em] md:flex">
            <a href="#story" className="text-white/80 transition-colors hover:text-[#FF7043]">Story</a>
            <a href="#showcase" className="text-white/80 transition-colors hover:text-[#FF7043]">Fruit</a>
            <a href="#gallery" className="text-white/80 transition-colors hover:text-[#FF7043]">Diary</a>
            <a href="#testimonials" className="text-white/80 transition-colors hover:text-[#FF7043]">Voices</a>
          </div>
          <div className="flex items-center gap-3">
            <MotionToggle />
            <a
              href="#footer"
              className="rounded-full bg-[#E53935] px-4 py-2 text-xs uppercase tracking-[0.24em] text-white transition-colors hover:bg-[#c62828]"
            >
              Order
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
