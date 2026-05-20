import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import seeds from "../assets/life-seeds.jpg";
import sapling from "../assets/life-sapling.jpg";
import cropping from "../assets/life-cropping.jpg";
import kachcha from "../assets/life-kachcha.jpg";
import pakka from "../assets/life-pakka.jpg";
import market from "../assets/life-market.jpg";
import { useReducedMotionPref } from "./MotionContext";
import LottieImage from "./LottieImage";
import DepthLayer from "./DepthLayer";

gsap.registerPlugin(ScrollTrigger);

type Stage = {
  idx: string;
  hindi: string;
  title: string;
  body: string;
  img: string;
  tone: string;
};

const stages: Stage[] = [
  {
    idx: "01",
    hindi: "बीज",
    title: "Seeding",
    body: "Heirloom beej, soaked overnight in cow-water, then pressed into warm coco-peat beds. Each tray is labelled by hand and dated by the moon.",
    img: seeds,
    tone: "#FF7043",
  },
  {
    idx: "02",
    hindi: "पौधा",
    title: "Sapling nursery",
    body: "Twenty-one days under filtered morning sun. The first true leaves appear — fragile, fuzzy, alive. We talk to them. Genuinely.",
    img: sapling,
    tone: "#A5D6A7",
  },
  {
    idx: "03",
    hindi: "खेती",
    title: "Cropping & staking",
    body: "Transplanted into rows three feet apart, tied to bamboo stakes with jute. Marigold borders keep the pests guessing.",
    img: cropping,
    tone: "#FFD54F",
  },
  {
    idx: "04",
    hindi: "कच्चा",
    title: "Kachcha — the green hold",
    body: "Hard, glossy, the colour of unripe limes. This is the patience stage — the vines decide when, not the calendar.",
    img: kachcha,
    tone: "#9CCC65",
  },
  {
    idx: "05",
    hindi: "पक्का",
    title: "Pakka — the red surrender",
    body: "Sun-blushed, vine-cured, picked when the stem snaps with a sigh. No gas chamber. No cold storage. Just ripeness, on its own time.",
    img: pakka,
    tone: "#E53935",
  },
  {
    idx: "06",
    hindi: "मंडी",
    title: "Mandi & home",
    body: "Loaded into open crates and driven before sunrise to the local mandi — and direct to a thousand kitchens across the valley.",
    img: market,
    tone: "#FF8A65",
  },
];

export default function Lifecycle() {
  const { reduced } = useReducedMotionPref();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const totalScroll = () => track.scrollWidth - window.innerWidth;

      const scrollTween = gsap.to(track, {
        x: () => -totalScroll(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalScroll()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // parallax inside each card
      gsap.utils.toArray<HTMLElement>(".lc-card").forEach((card) => {
        const img = card.querySelector<HTMLElement>(".lc-img");
        const text = card.querySelector<HTMLElement>(".lc-text");
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.25, yPercent: -4 },
            {
              scale: 1,
              yPercent: 4,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                containerAnimation: scrollTween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            }
          );
        }
        if (text) {
          gsap.fromTo(
            text,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                containerAnimation: scrollTween,
                start: "left 80%",
                end: "left 40%",
                scrub: true,
              },
            }
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, [reduced]);

  if (reduced) {
    return (
      <section className="bg-[#FDF8F4] py-24 text-[#3E2723]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-[10px] uppercase tracking-[0.32em] text-[#E53935]">
            <span className="mr-3">◐</span>From beej to mandi
          </div>
          <h2 className="font-display mt-3 text-3xl font-light tracking-[-0.02em] md:text-5xl">
            The full <em className="italic text-[#E53935]">lifecycle</em>.
          </h2>
          <div className="mt-16 grid gap-12 md:grid-cols-2">
            {stages.map((s) => (
              <article key={s.idx} className="space-y-4">
                <div className="aspect-[4/3] overflow-hidden rounded-3xl">
                  <LottieImage src={s.img} alt={s.title} variant="leaves" className="h-full w-full" imgClassName="h-full w-full object-cover" />
                </div>
                <div className="text-[10px] uppercase tracking-[0.28em]" style={{ color: s.tone }}>
                  {s.idx} · {s.hindi}
                </div>
                <h3 className="font-display text-3xl font-light tracking-[-0.02em]">{s.title}</h3>
                <p className="max-w-md text-[#3E2723]/75">{s.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden bg-[#FDF8F4] text-[#3E2723]">
      <div className="pointer-events-none absolute inset-0 grain" />
      <DepthLayer count={36} tint="#E53935" variant="leaves" className="opacity-40" />
      <div className="absolute left-0 right-0 top-0 z-10 px-6 pt-10 md:pt-14">
        <div className="mx-auto flex max-w-7xl items-end justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.32em] text-[#E53935]">
              <span className="mr-3">◐</span>From beej to mandi
            </div>
            <h2 className="font-display mt-3 text-3xl font-light tracking-[-0.02em] md:text-5xl">
              The full <em className="italic text-[#E53935]">lifecycle</em>.
            </h2>
          </div>
          <div className="hidden text-[10px] uppercase tracking-[0.28em] text-[#3E2723]/50 md:block">
            Scroll → horizontally
          </div>
        </div>
      </div>

      <div ref={trackRef} className="absolute left-0 top-0 flex h-full items-center gap-10 pl-[10vw] pr-[10vw] pt-32 will-change-transform">
        {stages.map((s) => (
          <article
            key={s.idx}
            className="lc-card relative flex h-[72vh] w-[80vw] shrink-0 overflow-hidden rounded-[2rem] bg-[#1a0e0a] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.4)] md:w-[58vw]"
          >
            <div className="absolute inset-0">
              <LottieImage
                src={s.img}
                alt={s.title}
                variant="leaves"
                timeoutMs={7000}
                className="lc-img absolute inset-0 h-full w-full"
                imgClassName="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div
                className="pointer-events-none absolute inset-0 opacity-60 mix-blend-overlay"
                style={{ background: `radial-gradient(80% 60% at 20% 100%, ${s.tone}66, transparent 70%)` }}
              />
            </div>

            <div className="lc-text relative z-10 mt-auto w-full p-8 text-[#FDF8F4] md:p-12">
              <div className="flex items-center gap-4">
                <span className="text-[10px] uppercase tracking-[0.32em]" style={{ color: s.tone }}>
                  {s.idx}
                </span>
                <span className="h-px w-10" style={{ backgroundColor: s.tone }} />
                <span className="font-display text-2xl italic" style={{ color: s.tone }}>
                  {s.hindi}
                </span>
              </div>
              <h3 className="font-display mt-4 text-4xl font-light leading-[1] tracking-[-0.02em] md:text-6xl">
                {s.title}
              </h3>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-[#FDF8F4]/80 md:text-lg">
                {s.body}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
