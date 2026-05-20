import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type Props = {
  children: ReactNode;
  variant?: "solid" | "ghost";
  href?: string;
  onClick?: () => void;
};

export default function MagneticButton({ children, variant = "solid", href, onClick }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 20, mass: 0.4 });

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = e.clientX - r.left - r.width / 2;
    const py = e.clientY - r.top - r.height / 2;
    x.set(px * 0.35);
    y.set(py * 0.35);
  };
  const reset = () => { x.set(0); y.set(0); };

  const cls =
    variant === "solid"
      ? "bg-[#E53935] text-[#FDF8F4] hover:bg-[#c62828]"
      : "border border-[#FDF8F4]/60 text-[#FDF8F4] hover:bg-[#FDF8F4]/10 backdrop-blur";

  const Inner = (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={`group relative inline-flex items-center gap-3 rounded-full px-7 py-4 text-sm uppercase tracking-[0.18em] transition-colors ${cls}`}
    >
      <span className="relative z-10">{children}</span>
      <span className="relative z-10 grid h-7 w-7 place-items-center rounded-full bg-white/15 transition-transform group-hover:rotate-45">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </span>
    </motion.div>
  );

  if (href) return <a href={href} onClick={onClick}>{Inner}</a>;
  return <button type="button" onClick={onClick}>{Inner}</button>;
}
