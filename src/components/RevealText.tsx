import React, { useEffect, useRef } from "react";
import SplitType from "split-type";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotionPref } from "./MotionContext";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  as?: keyof React.JSX.IntrinsicElements;
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  trigger?: boolean;
};

export default function RevealText({
  as: Tag = "h2",
  children,
  className = "",
  delay = 0,
  stagger = 0.04,
  trigger = true,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const { reduced } = useReducedMotionPref();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced) {
      // Skip SplitType entirely — readable text, no animation.
      return;
    }
    const split = new SplitType(el, { types: "lines,words", lineClass: "ov-line" });
    el.querySelectorAll(".ov-line").forEach((l) => {
      (l as HTMLElement).style.overflow = "hidden";
      (l as HTMLElement).style.display = "block";
    });
    gsap.set(split.words ?? [], { yPercent: 110, opacity: 0 });
    const anim = gsap.to(split.words ?? [], {
      yPercent: 0,
      opacity: 1,
      duration: 1.1,
      ease: "expo.out",
      stagger,
      delay,
      scrollTrigger: trigger
        ? { trigger: el, start: "top 85%", once: true }
        : undefined,
    });
    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
      split.revert();
    };
  }, [delay, stagger, trigger, reduced]);

  return React.createElement(
    Tag as string,
    { ref, className } as React.HTMLAttributes<HTMLElement> & { ref: React.Ref<HTMLElement> },
    children
  );
}
