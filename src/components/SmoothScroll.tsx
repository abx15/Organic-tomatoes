import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotionPref } from "./MotionContext";

gsap.registerPlugin(ScrollTrigger);

// Expose lenis on window so other components can call scrollTo without prop drilling.
declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export default function SmoothScroll() {
  const { reduced } = useReducedMotionPref();

  useEffect(() => {
    if (reduced) {
      // Native scroll. Still drive ScrollTrigger updates via the standard ticker.
      window.__lenis = undefined;
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    window.__lenis = lenis;

    // Keep ScrollTrigger perfectly in sync with Lenis at any frame rate.
    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const tickerFn = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    // Debounced resize/orientation handler — keeps pinned timelines &
    // progress bars aligned with the new viewport.
    let resizeTimer: number | undefined;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        lenis.resize();
        ScrollTrigger.refresh();
      }, 150);
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      window.clearTimeout(resizeTimer);
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(tickerFn);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, [reduced]);

  return null;
}
