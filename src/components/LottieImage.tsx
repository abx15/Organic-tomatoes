import { useEffect, useRef, useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { useLottieAssets } from "./LottieAssetsContext";

type Props = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  /** Which preloaded lottie to use as the placeholder/fallback shimmer. */
  variant?: "leaves" | "sun";
  /** ms to wait for the image to load before declaring it failed. */
  timeoutMs?: number;
  /** Forwarded to <img>. */
  loading?: "eager" | "lazy";
  imgProps?: React.ImgHTMLAttributes<HTMLImageElement>;
};

/**
 * Wraps an <img> in a cinematic Lottie placeholder. The Lottie animation
 * (leaves or sun) plays underneath while the image is loading. When the
 * image finishes loading we cross-fade to it. If loading times out, the
 * Lottie animation stays visible as a graceful fallback with a soft
 * "still growing" label.
 */
export default function LottieImage({
  src,
  alt,
  className = "",
  imgClassName = "absolute inset-0 h-full w-full object-cover",
  variant = "leaves",
  timeoutMs = 8000,
  loading = "lazy",
  imgProps,
}: Props) {
  const lottie = useLottieAssets();
  const data = (variant === "sun" ? lottie.sun : lottie.leaves) ?? null;

  const [state, setState] = useState<"loading" | "loaded" | "failed">("loading");
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setState("loading");
    const el = imgRef.current;
    if (!el) return;
    // If the browser already has it cached, complete is true synchronously.
    if (el.complete && el.naturalWidth > 0) {
      setState("loaded");
      return;
    }
    const t = window.setTimeout(() => {
      setState((s) => (s === "loading" ? "failed" : s));
    }, timeoutMs);
    return () => window.clearTimeout(t);
  }, [src, timeoutMs]);

  const showPlaceholder = state !== "loaded";

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Lottie / fallback layer */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${
          showPlaceholder ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Tinted organic backdrop — always visible behind Lottie */}
        <div
          className="absolute inset-0"
          style={{
            background:
              variant === "sun"
                ? "radial-gradient(circle at 50% 40%, rgba(255,176,90,0.55), rgba(229,57,53,0.18) 45%, rgba(26,14,10,0.95) 80%)"
                : "linear-gradient(135deg, #2a1813 0%, #3b1f17 50%, #1a0e0a 100%)",
          }}
        />
        {/* Subtle animated shimmer as a CSS fallback (always on) */}
        <div className="absolute inset-0 animate-pulse opacity-40 mix-blend-overlay"
          style={{
            background:
              "linear-gradient(110deg, transparent 30%, rgba(255,216,168,0.25) 50%, transparent 70%)",
          }}
        />
        {data ? (
          <Player
            autoplay
            loop
            src={data as object}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          />
        ) : (
          // No Lottie data — pure CSS fallback: floating dot field
          <div className="absolute inset-0">
            {Array.from({ length: 12 }).map((_, i) => (
              <span
                key={i}
                className="absolute h-1.5 w-1.5 rounded-full bg-[#FFD8A8]/60"
                style={{
                  left: `${(i * 47) % 100}%`,
                  top: `${(i * 29) % 100}%`,
                  animation: `floaty ${4 + (i % 4)}s ease-in-out ${i * 0.3}s infinite`,
                }}
              />
            ))}
          </div>
        )}

        {state === "failed" && (
          <div className="absolute inset-x-0 bottom-3 flex justify-center">
            <span className="rounded-full bg-black/55 px-3 py-1 text-[9px] uppercase tracking-[0.28em] text-[#FDF8F4]/80 backdrop-blur">
              Still growing…
            </span>
          </div>
        )}
      </div>

      {/* Actual image — fades in once loaded */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading={loading}
        onLoad={() => setState("loaded")}
        onError={() => setState("failed")}
        className={`${imgClassName} transition-opacity duration-700 ${
          state === "loaded" ? "opacity-100" : "opacity-0"
        }`}
        {...imgProps}
      />
    </div>
  );
}
