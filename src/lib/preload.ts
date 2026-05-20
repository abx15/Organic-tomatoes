// Preloads images, Lottie JSON, and three.js textures before the intro plays.

export type PreloadResult = {
  images: Record<string, HTMLImageElement>;
  lottie: Record<string, unknown | null>;
  failed: string[]; // human-readable keys/urls that failed to load
};

function loadImage(src: string, timeoutMs = 8000): Promise<{ img: HTMLImageElement; ok: boolean }> {
  return new Promise((resolve) => {
    const img = new Image();
    let settled = false;
    const finish = (ok: boolean) => {
      if (settled) return;
      settled = true;
      resolve({ img, ok });
    };
    img.onload = () => finish(true);
    img.onerror = () => finish(false);
    setTimeout(() => finish(false), timeoutMs);
    img.src = src;
  });
}

async function loadJson(url: string, timeoutMs = 1200): Promise<unknown | null> {
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), timeoutMs);
    const res = await fetch(url, { mode: "cors", signal: ctrl.signal });
    clearTimeout(t);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function preloadAssets(opts: {
  images: string[];
  lottieUrls?: Record<string, string>;
  onProgress?: (p: number) => void;
}): Promise<PreloadResult> {
  const lottieEntries = Object.entries(opts.lottieUrls ?? {});
  const total = opts.images.length + lottieEntries.length;
  let done = 0;
  const failed: string[] = [];
  const tick = () => {
    done += 1;
    opts.onProgress?.(total === 0 ? 1 : done / total);
  };

  const imagePromises = opts.images.map(async (src) => {
    const { img, ok } = await loadImage(src);
    if (!ok) failed.push(src);
    tick();
    return [src, img] as const;
  });

  const lottiePromises = lottieEntries.map(async ([k, url]) => {
    const data = await loadJson(url);
    if (data == null) failed.push(k);
    tick();
    return [k, data] as const;
  });

  const [imgs, lots] = await Promise.all([
    Promise.all(imagePromises),
    Promise.all(lottiePromises),
  ]);

  return {
    images: Object.fromEntries(imgs),
    lottie: Object.fromEntries(lots),
    failed,
  };
}
