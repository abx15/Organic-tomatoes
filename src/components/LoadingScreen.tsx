import { useEffect, useRef, useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { gsap } from "gsap";

type Props = {
  onComplete: () => void;
  ready: boolean; // start the GSAP intro only when assets are preloaded
  preloadProgress: number; // 0..1 — shown during preload phase
  failed?: string[];
  onRetry?: () => void;
  lottie?: {
    sun?: unknown | null;
    leaves?: unknown | null;
  };
};

export default function LoadingScreen({
  onComplete,
  ready,
  preloadProgress,
  failed = [],
  onRetry,
  lottie,
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const statusTextRef = useRef<HTMLDivElement>(null);
  const sheetTopRef = useRef<HTMLDivElement>(null);
  const sheetBotRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);
  const [done, setDone] = useState(false);
  const [slow, setSlow] = useState(false);

  // Reveal "slow" fallback UI if preload hangs for > 4s without completing.
  useEffect(() => {
    if (ready) return;
    const t = setTimeout(() => setSlow(true), 4000);
    return () => clearTimeout(t);
  }, [ready]);

  // Show preload progress in the counter until GSAP intro takes over.
  useEffect(() => {
    if (!counterRef.current || startedRef.current) return;
    const pct = Math.min(99, Math.floor(preloadProgress * 99));
    counterRef.current.textContent = String(pct).padStart(3, "0");
    if (progressBarRef.current) {
      progressBarRef.current.style.width = `${pct}%`;
    }
  }, [preloadProgress]);

  // Start the GSAP intro only once assets are ready.
  useEffect(() => {
    if (!ready || startedRef.current) return;
    startedRef.current = true;
    document.documentElement.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.documentElement.style.overflow = "";
          setDone(true);
          onComplete();
        },
      });

      // Soft ambient pulse for cinematic sun glow
      gsap.to(".ambient-glow", {
        scale: 1.12,
        opacity: 0.95,
        duration: 3.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });

      const counter = { v: Math.max(0, Math.min(99, preloadProgress * 99)) };
      
      // Beautiful smooth timeline loading progress
      tl.to(counter, {
        v: 100,
        duration: 1.6,
        ease: "power3.out",
        onUpdate: () => {
          const val = Math.floor(counter.v);
          if (counterRef.current) {
            counterRef.current.textContent = String(val).padStart(3, "0");
          }
          if (progressBarRef.current) {
            progressBarRef.current.style.width = `${val}%`;
          }
          if (statusTextRef.current) {
            if (val < 25) {
              statusTextRef.current.textContent = "◍ GATHERING MORNING DEW";
            } else if (val < 55) {
              statusTextRef.current.textContent = "◍ WAKING THE FIELDS";
            } else if (val < 85) {
              statusTextRef.current.textContent = "◍ HARVESTING THE LIGHT";
            } else {
              statusTextRef.current.textContent = "◍ ENTERING THE FIELD";
            }
          }
        },
      }, 0.1);

      // Elegant blur-in and character split-feel dissolve
      tl.from(titleRef.current?.querySelectorAll(".lt-word") ?? [], {
        yPercent: 40,
        opacity: 0,
        filter: "blur(12px)",
        letterSpacing: "0.2em",
        duration: 1.0,
        ease: "power3.out",
        stagger: 0.15,
      }, 0.1);

      tl.to(titleRef.current, {
        scale: 1.03,
        duration: 0.6,
        ease: "power2.inOut",
      }, "+=0.05");

      // Split sheets pull back like premium film curtains
      tl.to([sheetTopRef.current, sheetBotRef.current], {
        scaleY: 0,
        duration: 0.9,
        ease: "power4.inOut",
        stagger: 0.04,
      }, "-=0.2");

      tl.to(rootRef.current, {
        autoAlpha: 0,
        duration: 0.3,
        pointerEvents: "none",
      }, "-=0.3");
    }, rootRef);

    return () => {
      ctx.revert();
      document.documentElement.style.overflow = "";
    };
  }, [ready, onComplete, preloadProgress]);

  const skip = () => {
    document.documentElement.style.overflow = "";
    setDone(true);
    onComplete();
  };

  if (done) return null;

  const hasFailures = failed.length > 0;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden text-[#FDF8F4]"
      style={{ background: "radial-gradient(circle at center, #141b16 0%, #070a08 100%)" }}
      role="dialog"
      aria-label="Loading Sol and Soil"
      aria-busy={!ready}
    >
      {/* Splits reveal the index cream background beautifully */}
      <div ref={sheetTopRef} className="absolute inset-x-0 top-0 z-[60] h-1/2 origin-top bg-[#FDF8F4]" />
      <div ref={sheetBotRef} className="absolute inset-x-0 bottom-0 z-[60] h-1/2 origin-bottom bg-[#FDF8F4]" />

      {/* Pulsating Cinematic Glow representing the sun "Sol" */}
      <div className="ambient-glow pointer-events-none absolute inset-0 flex items-center justify-center opacity-70">
        <div className="relative h-[90vmin] w-[90vmin]">
          {lottie?.sun ? (
            <Player
              autoplay
              loop
              src={lottie.sun as object}
              style={{ width: "100%", height: "100%" }}
            />
          ) : null}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle, rgba(255,112,67,0.45) 0%, rgba(229,57,53,0.18) 40%, transparent 70%)",
              filter: "blur(50px)",
            }}
          />
        </div>
      </div>

      {lottie?.leaves ? (
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <Player
            autoplay
            loop
            src={lottie.leaves as object}
            style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}
          />
        </div>
      ) : null}

      <div className="relative z-[55] flex flex-col items-center px-6 text-center">
        {/* Subtitle */}
        <div className="mb-6 text-[10px] uppercase tracking-[0.45em] text-[#FDF8F4]/50 font-sans">
          A Cinematic Harvest
        </div>

        {/* Serif Logo Title */}
        <div ref={titleRef} className="overflow-hidden py-2">
          <div className="font-display text-7xl font-light leading-none tracking-[-0.01em] md:text-[9.5rem] select-none">
            <span className="lt-word inline-block">Sol</span>{" "}
            <span className="lt-word inline-block italic text-[#FF7043]">&amp;</span>{" "}
            <span className="lt-word inline-block">Soil</span>
          </div>
        </div>

        {/* Sleek Cinematic Progress Bar */}
        <div className="w-56 md:w-72 h-[1px] bg-[#FDF8F4]/10 rounded-full overflow-hidden mt-12 relative">
          <div
            ref={progressBarRef}
            className="h-full bg-gradient-to-r from-[#FF7043] via-[#ff8a65] to-[#E53935] w-0 transition-all duration-100 ease-out"
          />
        </div>

        {/* Dynamic Organic Message */}
        <div
          ref={statusTextRef}
          className="mt-4 text-[9px] md:text-[10px] font-mono tracking-[0.3em] text-[#FF7043]/90 uppercase min-h-[1.5em]"
        >
          ◍ GATHERING MORNING DEW
        </div>

        {/* Ticking Percentage Counter */}
        <div
          className="mt-2 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] text-[#FDF8F4]/40 font-mono"
          role="status"
          aria-live="polite"
        >
          <span>INDEX LOAD</span>
          <span className="text-[#FF7043]/80" ref={counterRef}>000</span>
          <span>%</span>
        </div>

        {/* Fallback Option */}
        {!ready && (slow || hasFailures) && (
          <div className="mt-8 flex flex-col items-center gap-3 animate-fade-in">
            <p className="max-w-sm text-xs leading-relaxed text-[#FDF8F4]/40">
              {hasFailures
                ? `Some assets couldn't load (${failed.length}). You can continue with standard rendering.`
                : "Optimizing cinematic visual elements..."}
            </p>
            <div className="flex gap-3">
              {onRetry && (
                <button
                  type="button"
                  onClick={onRetry}
                  className="rounded-full border border-[#FF7043]/40 px-5 py-2 text-[10px] uppercase tracking-[0.28em] text-[#FF7043] transition hover:bg-[#FF7043]/10 focus:outline-none"
                >
                  Retry
                </button>
              )}
              <button
                type="button"
                onClick={skip}
                className="rounded-full border border-[#FDF8F4]/20 px-5 py-2 text-[10px] uppercase tracking-[0.28em] text-[#FDF8F4]/60 transition hover:bg-[#FDF8F4]/10 focus:outline-none"
              >
                Skip intro
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Moving film-cell grain active texture overlay */}
      <div className="grain-active pointer-events-none absolute inset-0" />
    </div>
  );
}
