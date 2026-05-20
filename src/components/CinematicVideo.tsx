import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  poster?: string;
  className?: string;
  videoClassName?: string;
  label?: string;
  caption?: string;
};

export default function CinematicVideo({
  src,
  poster,
  className = "",
  videoClassName = "h-full w-full object-cover",
  label,
  caption,
}: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {poster && (
        <img
          src={poster}
          alt=""
          aria-hidden
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            ready ? "opacity-0" : "opacity-100"
          }`}
        />
      )}
      <video
        ref={ref}
        src={visible ? src : undefined}
        muted
        loop
        playsInline
        preload="metadata"
        onLoadedData={() => setReady(true)}
        className={videoClassName}
      />
      {(label || caption) && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-black/70 to-transparent p-5 text-[#FDF8F4]">
          {label && (
            <span className="text-[10px] uppercase tracking-[0.32em] text-[#FF7043]">
              ▸ {label}
            </span>
          )}
          {caption && <span className="text-xs uppercase tracking-[0.24em] text-white/80">{caption}</span>}
        </div>
      )}
    </div>
  );
}
