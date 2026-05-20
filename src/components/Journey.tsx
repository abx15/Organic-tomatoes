import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import soil from "../assets/story-soil.jpg";
import water from "../assets/story-water.jpg";
import harvest from "../assets/story-harvest.jpg";
import delivery from "../assets/story-delivery.jpg";
import portrait from "../assets/farmer-portrait.jpg";
import field from "../assets/hero-farm.jpg";
import { useReducedMotionPref } from "./MotionContext";
import LottieImage from "./LottieImage";

gsap.registerPlugin(ScrollTrigger);

type Step = {
  idx: string;
  time: string;
  title: string;
  body: string;
  img: string;
};

const steps: Step[] = [
  { idx: "01", time: "04:42", title: "Wake up.", body: "A quiet tea before sunrise. The village still sleeping. The first thought of the day belongs to the field.", img: portrait },
  { idx: "02", time: "05:30", title: "The soil.", body: "He turns the earth with his hands. No machines here — soil this alive deserves to be touched.", img: soil },
  { idx: "03", time: "06:55", title: "Plant the seeds.", body: "Heirloom seeds saved from last season. Each one placed by hand, in lines as straight as memory.", img: field },
  { idx: "04", time: "09:12", title: "Water, slowly.", body: "Drip by patient drip. No flooding. No waste. Just what the vines have always asked for.", img: water },
  { idx: "05", time: "17:55", title: "Harvest.", body: "Picked at the exact moment of ripeness. The basket fills. The light turns gold. The day finally softens.", img: harvest },
  { idx: "06", time: "next dawn", title: "Delivery.", body: "Within hours, the baskets travel from soil to kitchen — never refrigerated, never gassed, never anything but themselves.", img: delivery },
];

export default function Journey() {
  const { reduced } = useReducedMotionPref();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    if (reduced) return; // skip pinning entirely

    const panels = gsap.utils.toArray<HTMLElement>(".jr-panel");

    const ctx = gsap.context(() => {
      panels.forEach((panel, i) => {
        const img = panel.querySelector(".jr-img") as HTMLElement | null;
        const words = panel.querySelectorAll<HTMLElement>(".jr-text > *");
        if (i === 0) {
          if (img) gsap.set(img, { clipPath: "inset(0% 0% 0% 0%)", scale: 1 });
          gsap.set(words, { yPercent: 0, opacity: 1 });
        } else {
          if (img) gsap.set(img, { clipPath: "inset(50% 50% 50% 50%)", scale: 1.25 });
          gsap.set(words, { yPercent: 110, opacity: 0 });
        }
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${panels.length * window.innerHeight * 0.9}`,
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const i = Math.min(panels.length - 1, Math.floor(self.progress * panels.length));
            setActive(i);
          },
        },
      });
      stRef.current = tl.scrollTrigger ?? null;

      tl.fromTo(
        progressRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: panels.length, ease: "none" },
        0
      );

      panels.forEach((panel, i) => {
        if (i === 0) return;
        const prev = panels[i - 1];
        const prevImg = prev.querySelector(".jr-img");
        const prevWords = prev.querySelectorAll<HTMLElement>(".jr-text > *");
        const img = panel.querySelector(".jr-img");
        const words = panel.querySelectorAll<HTMLElement>(".jr-text > *");
        const at = i;
        tl.to(prevWords, { yPercent: -110, opacity: 0, duration: 0.5, stagger: 0.04, ease: "power2.in" }, at - 0.5);
        if (prevImg) tl.to(prevImg, { clipPath: "inset(0% 50% 0% 50%)", duration: 0.6, ease: "power2.inOut" }, at - 0.5);
        if (img) tl.to(img, { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 0.8, ease: "power2.inOut" }, at - 0.3);
        tl.to(words, { yPercent: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: "expo.out" }, at - 0.1);
      });
    }, section);

    return () => {
      stRef.current = null;
      ctx.revert();
    };
  }, [reduced]);

  const goTo = (i: number) => {
    const st = stRef.current;
    if (!st) {
      // reduced-motion fallback: scroll the panel into view
      const panel = sectionRef.current?.querySelectorAll<HTMLElement>(".jr-panel")[i];
      panel?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    // Compute scroll position aligned to step i across the pinned timeline
    const target = st.start + ((i + 0.001) / steps.length) * (st.end - st.start);
    const lenis = window.__lenis;
    if (lenis) {
      lenis.scrollTo(target, { duration: 1.4 });
    } else {
      window.scrollTo({ top: target, behavior: "smooth" });
    }
  };

  // Reduced-motion layout: just stack panels readably
  if (reduced) {
    return (
      <section ref={sectionRef} className="relative bg-[#1a0e0a] text-[#FDF8F4]">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="text-[10px] uppercase tracking-[0.32em] text-[#FF7043]">
            <span className="mr-3">◍</span>One day on the farm
          </div>
          <h2 className="font-display mt-3 text-3xl font-light tracking-[-0.02em] md:text-5xl">
            The farmer's <em className="italic text-[#FF7043]">journey</em>.
          </h2>
          <div className="mt-16 space-y-24">
            {steps.map((s) => (
              <div key={s.idx} className="grid grid-cols-1 items-center gap-8 md:grid-cols-12">
                <div className="relative col-span-1 h-[50vh] overflow-hidden rounded-3xl md:col-span-7">
                  <LottieImage src={s.img} alt={s.title} variant="leaves" timeoutMs={7000} className="absolute inset-0 h-full w-full" />
                </div>
                <div className="col-span-1 md:col-span-5">
                  <div className="text-[10px] uppercase tracking-[0.28em] text-[#FF7043]">{s.idx} · {s.time}</div>
                  <div className="font-display mt-3 text-4xl font-light leading-[0.95] tracking-[-0.02em] md:text-6xl">{s.title}</div>
                  <p className="mt-5 max-w-md text-base leading-relaxed text-[#FDF8F4]/75 md:text-lg">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden bg-[#1a0e0a] text-[#FDF8F4]">
      <div className="pointer-events-none absolute inset-0 opacity-50" style={{
        background: "radial-gradient(60% 60% at 50% 0%, rgba(255,112,67,0.2), transparent 60%)",
      }} />

      {/* heading */}
      <div className="absolute left-0 right-0 top-0 z-20 px-6 pt-10 md:pt-14">
        <div className="mx-auto flex max-w-7xl items-end justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.32em] text-[#FF7043]">
              <span className="mr-3">◍</span>One day on the farm
            </div>
            <h2 className="font-display mt-3 text-3xl font-light tracking-[-0.02em] md:text-5xl">
              The farmer's <em className="italic text-[#FF7043]">journey</em>.
            </h2>
          </div>
          <div className="hidden text-[10px] uppercase tracking-[0.28em] text-[#FDF8F4]/50 md:block">
            Scroll · or tap a step
          </div>
        </div>
      </div>

      {/* panels */}
      <div ref={trackRef} className="relative h-full">
        {steps.map((s) => (
          <div
            key={s.idx}
            className="jr-panel absolute inset-0 mx-auto grid h-full max-w-7xl grid-cols-1 items-center gap-12 px-6 pt-24 md:grid-cols-12"
          >
            <div className="relative col-span-1 h-[60vh] overflow-hidden rounded-3xl md:col-span-7 md:h-[70vh]">
              <LottieImage
                src={s.img}
                alt={s.title}
                variant="leaves"
                timeoutMs={7000}
                className="jr-img absolute inset-0 h-full w-full"
                imgClassName="absolute inset-0 h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1a0e0a]/40 to-transparent" />
              <div className="absolute left-5 top-5 flex items-center gap-3 rounded-full bg-black/40 px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-white/90 backdrop-blur">
                <span>{s.idx}</span>
                <span className="h-3 w-px bg-white/40" />
                <span>{s.time}</span>
              </div>
            </div>

            <div className="jr-text col-span-1 space-y-6 md:col-span-5">
              <div className="font-display text-5xl font-light leading-[0.95] tracking-[-0.02em] md:text-7xl">
                {s.title}
              </div>
              <p className="max-w-md text-base leading-relaxed text-[#FDF8F4]/75 md:text-lg">
                {s.body}
              </p>
              <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.32em] text-[#4CAF50]">
                <span className="h-px w-8 bg-[#4CAF50]" />
                Step {s.idx} of {String(steps.length).padStart(2, "0")}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* SR-only live region announcing the active chapter */}
      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        Chapter {steps[active].idx} of {String(steps.length).padStart(2, "0")}: {steps[active].title} — {steps[active].time}
      </div>

      {/* step markers + progress bar */}
      <div className="absolute bottom-8 left-0 right-0 z-30 px-6">
        <div className="mx-auto max-w-7xl">
          <div
            className="mb-3 flex items-center justify-between gap-2"
            role="tablist"
            aria-label="Farmer's journey chapters"
            onKeyDown={(e) => {
              if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                e.preventDefault();
                goTo(Math.min(steps.length - 1, active + 1));
              } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                e.preventDefault();
                goTo(Math.max(0, active - 1));
              } else if (e.key === "Home") {
                e.preventDefault();
                goTo(0);
              } else if (e.key === "End") {
                e.preventDefault();
                goTo(steps.length - 1);
              }
            }}
          >
            {steps.map((s, i) => {
              const isActive = i === active;
              return (
                <button
                  key={s.idx}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Chapter ${s.idx}: ${s.title} at ${s.time}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => goTo(i)}
                  className="group flex flex-1 flex-col items-start gap-1 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7043] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a0e0a] rounded-sm"
                >
                  <span
                    className={`text-[10px] uppercase tracking-[0.28em] transition-colors ${
                      isActive ? "text-[#FF7043]" : "text-[#FDF8F4]/45 group-hover:text-[#FDF8F4]/80"
                    }`}
                  >
                    {s.idx} · <span className="hidden md:inline">{s.title}</span>
                    <span className="md:hidden">{s.time}</span>
                  </span>
                  <span
                    className={`h-[2px] w-full origin-left rounded-full transition-all ${
                      isActive ? "bg-[#FF7043] scale-y-[2]" : "bg-[#FDF8F4]/15 group-hover:bg-[#FDF8F4]/40"
                    }`}
                  />
                </button>
              );
            })}
          </div>
          <div className="h-px w-full bg-[#FDF8F4]/10">
            <div ref={progressRef} className="h-px origin-left bg-[#FF7043]" />
          </div>
        </div>
      </div>
    </section>
  );
}
