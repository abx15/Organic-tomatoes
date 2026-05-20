import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState } from "react";
import Hero from "../components/Hero";
import Nav from "../components/Nav";
import Journey from "../components/Journey";
import Lifecycle from "../components/Lifecycle";
import ParallaxBanner from "../components/ParallaxBanner";
import Showcase from "../components/Showcase";
import Stats from "../components/Stats";
import Quote from "../components/Quote";
import Gallery from "../components/Gallery";
import Testimonials from "../components/Testimonials";
import VideoReel from "../components/VideoReel";
import Footer from "../components/Footer";
import { MotionProvider } from "../components/MotionContext";
import { LottieAssetsProvider } from "../components/LottieAssetsContext";
import { preloadAssets } from "../lib/preload";

import heroFarm from "../assets/hero-farm.jpg";
import tomatoHero from "../assets/tomato-hero.jpg";
import farmerPortrait from "../assets/farmer-portrait.jpg";
import storySoil from "../assets/story-soil.jpg";
import storyWater from "../assets/story-water.jpg";
import storyHarvest from "../assets/story-harvest.jpg";
import storyDelivery from "../assets/story-delivery.jpg";
import gallery1 from "../assets/gallery-1.jpg";
import gallery2 from "../assets/gallery-2.jpg";
import gallery3 from "../assets/gallery-3.jpg";
import gallery4 from "../assets/gallery-4.jpg";
import lifeSeeds from "../assets/life-seeds.jpg";
import lifeSapling from "../assets/life-sapling.jpg";
import lifeCropping from "../assets/life-cropping.jpg";
import lifeKachcha from "../assets/life-kachcha.jpg";
import lifePakka from "../assets/life-pakka.jpg";
import lifeMarket from "../assets/life-market.jpg";
import parallaxFields from "../assets/parallax-fields.jpg";

const SmoothScroll = lazy(() => import("../components/SmoothScroll"));
const LoadingScreen = lazy(() => import("../components/LoadingScreen"));

export const Route = createFileRoute("/")({
  component: Index,
});

function Marquee() {
  const items = ["Hand grown", "Sun ripened", "Vine cured", "Soil to soul", "Since 1968", "No synthetics", "From the Deccan"];
  return (
    <div className="relative overflow-hidden border-y border-[#3E2723]/15 bg-[#FDF8F4] py-8">
      <div className="marquee flex w-max gap-16 whitespace-nowrap">
        {[...items, ...items, ...items].map((t, i) => (
          <div key={i} className="flex items-center gap-16">
            <span className="font-display text-4xl text-[#3E2723] md:text-6xl">{t}</span>
            <span className="text-[#E53935]">●</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const ASSET_IMAGES = [
  heroFarm,
  tomatoHero,
];

const LOTTIE_URLS = {
  sun: "https://lottie.host/8d7a3b34-2b6c-4f5b-95a5-7e9b1d0a3a3a/sun.json",
  leaves: "https://lottie.host/2c4b5d7e-1f3a-4b8c-9d2e-6a7b8c9d0e1f/leaves.json",
};

function Index() {
  const [mounted, setMounted] = useState(false);
  const [loaded, setLoaded] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("sunrise-harvest-loaded") === "true";
    }
    return false;
  });
  const [preloadProgress, setPreloadProgress] = useState(0);
  const [assetsReady, setAssetsReady] = useState(loaded);
  const [failed, setFailed] = useState<string[]>([]);
  const [retryNonce, setRetryNonce] = useState(0);
  const [lottie, setLottie] = useState<{ sun?: unknown | null; leaves?: unknown | null }>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      // If already loaded in this session, prefetch Lottie animations in the background
      // so they become available in LottieImage, but DO NOT block the UI.
      let cancelled = false;
      preloadAssets({
        images: [],
        lottieUrls: LOTTIE_URLS,
      }).then((res) => {
        if (!cancelled) {
          setLottie({ sun: res.lottie.sun, leaves: res.lottie.leaves });
        }
      });
      return () => {
        cancelled = true;
      };
    }

    let cancelled = false;
    setAssetsReady(false);
    setPreloadProgress(0);
    setFailed([]);

    const maxWait = setTimeout(() => !cancelled && setAssetsReady(true), 8000);

    preloadAssets({
      images: ASSET_IMAGES,
      lottieUrls: LOTTIE_URLS,
      onProgress: (p) => !cancelled && setPreloadProgress(p),
    }).then((res) => {
      if (cancelled) return;
      setLottie({ sun: res.lottie.sun, leaves: res.lottie.leaves });
      setFailed(res.failed);
      setAssetsReady(true);
    });

    // Hard safety: max 12s for the entire intro
    const safety = setTimeout(() => !cancelled && setLoaded(true), 12000);
    return () => {
      cancelled = true;
      clearTimeout(maxWait);
      clearTimeout(safety);
    };
  }, [retryNonce, loaded]);

  return (
    <MotionProvider>
      {mounted && !loaded && (
        <Suspense fallback={null}>
          <LoadingScreen
            ready={assetsReady}
            preloadProgress={preloadProgress}
            failed={failed}
            onRetry={() => setRetryNonce((n) => n + 1)}
            lottie={lottie}
            onComplete={() => {
              setLoaded(true);
              if (typeof window !== "undefined") {
                sessionStorage.setItem("sunrise-harvest-loaded", "true");
              }
            }}
          />
        </Suspense>
      )}
      {mounted && loaded && (
        <Suspense fallback={null}>
          <SmoothScroll />
        </Suspense>
      )}
      <LottieAssetsProvider value={lottie}>
          <Nav />
        <main className="relative">
          <Hero />
          <Marquee />
          <section id="story"><Journey /></section>
          <section id="lifecycle"><Lifecycle /></section>
          <ParallaxBanner />
          <VideoReel />
          <section id="showcase"><Showcase /></section>
          <Stats />
          <Quote />
          <section id="gallery"><Gallery /></section>
          <section id="testimonials"><Testimonials /></section>
          <section id="footer"><Footer /></section>
        </main>
      </LottieAssetsProvider>
    </MotionProvider>
  );
}
