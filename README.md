# ◍ Sol & Soil — A Cinematic Harvest
### *Hand grown in the Deccan plateau. From soil to soul.*

[![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![TanStack Start](https://img.shields.io/badge/TanStack-Start--React19-FF3366?style=flat-square&logo=react)](https://tanstack.com/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![React 19](https://img.shields.io/badge/React-19.x-61DAFB?style=flat-square&logo=react)](https://react.dev/)

**Sol & Soil** is a premium, highly interactive, and visually stunning web experience designed to showcase the authentic story of fresh, organic, vine-cured tomatoes. By blending modern front-end engineering, immersive 3D interactions, and elegant documentary-style typography, Sol & Soil offers users a quiet, cinematic journey through the lifecycle of organic agriculture.

---

## 🎨 Premium Cinematic Features & Interactive Mechanics

### 🎭 1. Immersive Documentary-Style Loading Screen
* **Forest-Black Radial Background**: Uses a deep forest-black radial gradient (`#141b16` to `#070a08`) symbolizing the rich Deccan soil before sunrise.
* **Ambient Solar Pulse**: A massive glowing solar orb dynamically expands and dims infinitely via GSAP to simulate early dawn.
* **Fractal Film Grain overlay**: Features an active SVG fractal noise filter generating organic movie projector reel cell flicker across the screen.
* **Ticking Monospace Agricultural Logs**: Percentage loaders show ticking steps mimicking a documentary timeline:
  * `◍ GATHERING MORNING DEW` (0% - 24%)
  * `◍ WAKING THE FIELDS` (25% - 54%)
  * `◍ HARVESTING THE LIGHT` (55% - 84%)
  * `◍ ENTERING THE FIELD` (85% - 100%)
* **Laser-Sleek Progress Line**: A highly responsive `1px` progress bar that expands and changes color dynamically.

### ⚡ 2. Session-Based Bypass & Background Pre-fetching
* **Bypass on Refresh**: To match high-end Single-Page Application (SPA) production layouts, `sessionStorage` tracks completed visits. The loading animation plays on first load but is bypassed completely on subsequent page refreshes in the same tab.
* **Background Lottie Fetch**: While the loader is skipped on refresh for instant interactivity, Lottie resources are prefetched asynchronously in the background. High-fidelity CSS shimmers and floating particle grids gracefully handle the loaders until they are fully loaded.

### 🍅 3. Interactive 3D Model Rendering
* **R3F Canvas**: Hosts an interactive 3D tomato model powered by **Three.js**, **React Three Fiber (R3F)**, and **Drei**.
* **Smooth Physics**: The model rotates on drag and reacts directly to user cursor movement, establishing premium tactile engagement.

### 📜 4. Inertial Smooth Scroll & ScrollTriggers
* **Lenis Engine**: Integrates smooth, inertia-based scrolling for buttery transitions.
* **Scroll-Bound Timelines**: Connects GSAP ScrollTriggers and Framer Motion with Lenis' requestAnimationFrame cycle to align scroll percentages with character fades, parallax banner displacements, and section reveals perfectly.

### 🔍 5. Pristine SEO & Semantic Architecture
* **Single H1 Tag Rule**: Restructured the Hero landing sections to group heading items under exactly one parent `<h1>` element, ensuring perfect accessibility and search engine compliance.
* **Comprehensive Meta tags**: Outfitted with search title, semantic description, Open Graph protocol, and Twitter card integrations.

---

## 🛠️ Unified Technology Stack

| Technology | Purpose | Key Details |
| :--- | :--- | :--- |
| **TanStack Start** | Framework & SSR | File-based routing, React 19, Server-side rendering, and hydration. |
| **Vite** | Build Tooling | Native compiling, hot-module-replacement, and standard tree-shaking. |
| **Tailwind CSS v4** | Styling | Modern, CSS-first framework utility styling and clean design tokens. |
| **GSAP & ScrollTrigger** | High-fidelity Motion | Drives timeline progress log counters, cinematic character blurs, and solar loops. |
| **Framer Motion** | Micro-animations | Handles floating dust field particles, magnetic buttons, and page fades. |
| **Three.js & R3F** | 3D Interactions | High-fidelity interactive tomato geometry, lighting, and shadow coordinates. |
| **Lenis Scroll** | Scroll Physics | Premium inertial smooth scrolling fully bound to the GSAP ticker. |

---

## 📁 Project Directory Structure

```text
├── .gitignore          # Git exclusion rules
├── bunfig.toml         # Bun package manager configuration
├── package.json        # Project metadata & standard dependencies
├── vite.config.ts      # Native Vite + TanStack Start configuration
├── wrangler.jsonc      # Cloudflare Workers configuration
├── tsconfig.json       # TypeScript configuration
└── src/
    ├── assets/         # Static visual media (images, videos, metadata assets)
    ├── components/     # Interactive UI components (Three.js Canvas, Lenis, GSAP etc.)
    │   ├── ui/         # Low-level UI elements (Radix wrappers)
    │   └── ...         # Core agricultural journey templates
    ├── hooks/          # Custom utility React hooks
    ├── lib/            # Shared utilities (SSR capture handlers, error layouts)
    ├── routes/         # TanStack Start file-based routing
    │   ├── __root.tsx  # Application shell, SEO header elements, layout provider
    │   └── index.tsx   # Entry page hosting preloader and central structure
    ├── server.ts       # SSR custom error wrapper entry point
    └── start.ts        # TanStack Start application entry point
```

---

## 🚀 Getting Started Locally

### Prerequisites

Ensure you have **Node.js** (v18+) and **npm** installed on your system.

### 1. Installation

Clone or download the repository:
```bash
git clone https://github.com/abx15/Organic-tomatoes.git
cd Organic-tomatoes
```

Install the dependencies:
```bash
npm install
```

### 2. Run Local Development Server

Launch the development server with Hot Module Replacement (HMR):
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your web browser.

### 3. Production Compilation & Build

To compile highly-optimized production assets, server-side bundles, and edge workers for deployment (such as Cloudflare Pages/Workers):
```bash
npm run build
```

### 4. Local Build Preview

To preview the built production bundle locally:
```bash
npm run preview
```

---

## 🌾 Our Philosophy

At Sol & Soil, we believe in **honest farming**. No gassing, no artificial ripening, and no refrigeration. Just soil, sun, patient water, and hands that know when to pick. This site is crafted to bring that authenticity directly to your screen.

---

*Harvested with care. Engineered with precision.*
