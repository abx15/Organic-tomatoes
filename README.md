# ◍ Sunrise Harvest — From Soil to Table

Sunrise Harvest is a premium, highly interactive, and visually stunning web experience built to tell the story of fresh, organic, handpicked tomatoes. By combining modern web technologies, 3D interactions, and elegant storytelling, Sunrise Harvest offers an immersive digital journey through the life of a tomato on our farm.

---

## 🌟 Key Features

- **3D Interactive Tomato Model**: Features an interactive 3D tomato model powered by **Three.js**, **React Three Fiber (R3F)**, and **Drei** to engage users immediately.
- **Lenis Smooth Scroll**: Features fluid, inertia-based smooth scrolling across all sections.
- **Cinematic Storytelling & Video Reels**: Features dynamic fullscreen cinematic video showcases.
- **Parallax & Depth Effects**: Immersive, multi-layered parallax headers and banners that react to scroll input.
- **Rich Micro-animations**: Implemented using **GSAP** and **Framer Motion** for subtle entrance animations, interactive magnetic buttons, and text reveal effects.
- **The Lifecycle Showcase**: An interactive scroll-based timeline detailing the tomato lifecycle from seed to fully ripe fruit.
- **Robust SSR Routing**: Built on **TanStack Start** (React 19, TypeScript, File-based routing) ensuring lightning-fast load times and seamless SEO.

---

## 🛠️ Technology Stack

- **Framework**: [TanStack Start](https://tanstack.com/router/v1/docs/start/overview) (React 19, Vite, Server-Side Rendering)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (modern CSS-first framework integration)
- **3D Graphics**: [Three.js](https://threejs.org/), `@react-three/fiber`, `@react-three/drei`
- **Animations**: [GSAP](https://gsap.com/) (GreenSock), [Framer Motion](https://www.framer.com/motion/)
- **Scroll Engine**: [Lenis Scroll](https://lenis.darkroom.engineering/)
- **Infrastructure**: [Cloudflare Workers / Pages](https://pages.cloudflare.com/) (highly-scalable edge deployment)
- **Language**: TypeScript

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js** (v18+) and **npm** installed on your system.

### Installation

1. Clone or download the repository:
   ```bash
   git clone https://github.com/abx15/sunrise-harvest.git
   cd sunrise-harvest
   ```

2. Install the project dependencies:
   ```bash
   npm install
   ```

### Running Locally

To start the local development server with Hot Module Replacement (HMR) and automatic route generation:

```bash
npm run dev
```

The app will be running at `http://localhost:5173/`. Open it in your browser to view the experience.

### Building for Production

To compile client assets, server-side bundles, and deployable edge functions for Cloudflare Pages/Workers:

```bash
npm run build
```

This compiles optimized assets inside the `dist/` directory.

### Previewing the Production Build

To preview the built production site locally:

```bash
npm run preview
```

---

## 📁 Project Directory Structure

```text
├── .gitignore          # Git exclusion rules
├── bunfig.toml         # Bun package manager configuration
├── package.json        # Project metadata & dependencies
├── vite.config.ts      # Standard Vite + TanStack Start configurations
├── wrangler.jsonc      # Cloudflare Workers configuration
├── tsconfig.json       # TypeScript configuration
└── src/
    ├── assets/         # Static visual assets (images, videos, icons)
    ├── components/     # Interactive UI components (R3F Canvas, Lenis, GSAP, etc.)
    │   ├── ui/         # Reusable low-level interface elements
    │   └── ...         # Core story-telling and layout sections
    ├── hooks/          # Custom React hooks
    ├── lib/            # Shared utilities (SSR error handling, helpers)
    ├── routes/         # TanStack Start file-based pages/routes
    ├── server.ts       # SSR custom error wrapper entry point
    └── start.ts        # TanStack Start application entry point
```

---

## 🌾 Our Philosophy

At Sunrise Harvest, we believe in **honest farming**. No gassing, no artificial ripening, and no refrigeration. Just soil, sun, patient water, and hands that know when to pick. This site is crafted to bring that authenticity directly to your screen.

---

*Harvested with care. Designed with precision.*
