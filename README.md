# AtlasX — Planetary Surface Intelligence & Mission Planning Platform

<div align="center">

![AtlasX Mars Logo](public/mars-icon.svg)

**AtlasX – An Advanced Planetary Exploration, Surface Intelligence and Mission Planning Platform.**

[![License: MIT](https://img.shields.io/badge/License-MIT-orange.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-blue.svg)](https://nodejs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-purple.svg)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.x-cyan.svg)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black.svg)](https://threejs.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.x-38bdf8.svg)](https://tailwindcss.com/)

</div>

---

## ⚠ Compliance & Research Notice

> **Affiliation Notice:**  
> AtlasX is an independent educational and research project. It is not affiliated with, endorsed by, or officially associated with NASA or any other space agency.

---

## 🪐 About AtlasX

AtlasX is a web-based planetary exploration, cartography, and mission-planning platform built on open scientific data streams. It bridges orbital telemetry, geological outcrop imaging, astronaut biometrics, and surface meteorology into an accessible, interactive console.

### Key Capabilities

* **Interactive 3D Mars Globe (WebGL / Three.js):**
  * Real-time 3D planetary rendering with atmospheric Fresnel glow, space lighting, and coordinate graticules.
  * Interactive surface landmarks (**Jezero Crater**, **Gale Crater**, **Olympus Mons**, **Valles Marineris**) displaying elevation and coordinates.
  * Drag-to-rotate and zoom controls with touch-screen support for phones and tablets.
* **Live Mission Control Console:**
  * **2D Planetary Surface Atlas:** MOLA Color Elevation (463 m/px), Viking True-Color Mosaic (232 m/px), and THEMIS Infrared with coordinate crosshairs.
  * **0.38g Astronaut EVA Biometrics Calculator:** Real-time Pandolf-Margaria metabolic power expenditure ($W$), $VO_2$ depletion ($L/\text{min}$), and Point of No Return (PNR) margin with mandatory 30-minute reserve buffer.
  * **Meteorological Hazard Simulator:** Koschmieder optical depth ($\tau$) dust scattering visibility, thermal suit heating draw, and real-time EVA Status (`GO`, `CAUTION`, `NO-GO`).
  * **Mars 2020 Raw Outcrop Feeds:** Outcrop imagery and sample tube caching workflow from Jezero and Gale craters.
* **Real-Time Astronomical Telemetry HUD:**
  * Earth UTC, Mars Sol Date (MSD), Coordinated Mars Time (MTC Airy-0), Solar Longitude ($L_s$), Heliocentric Distance (AU), and Solar Irradiance ($W/m^2$) calculated live using the Allison & McEwen GISS Mars24 algorithm.
* **Desktop App Download Center:**
  * One-click downloads for `AtlasX-Setup.exe` (92.2 MB), `AtlasX 1.0.0.exe` (92.0 MB), and `AtlasX-SourceCode.zip` (1.09 MB).
  * Authenticode digital signature details (`CN=AtlasX Code Signing`).
* **Design & Theme Support:**
  * Premium glassmorphism aesthetic.
  * Full **Bright Mode** and **Dark Mode** toggle.
  * Web Audio API synthesized UI soundscapes with mute toggle.

---

## 🚀 Quick Start — Run Locally on Any Device

Anyone can clone and run this application locally on **Windows**, **macOS**, **Linux**, or explore it on **iOS/Android** phones and tablets.

### Prerequisites
* [Node.js](https://nodejs.org) (v18.0 or newer)
* npm (bundled with Node.js)

### Method 1: Using One-Click Scripts

* **Windows:** Double-click `start.bat` (or right-click `start.ps1` → Run with PowerShell).
* **macOS / Linux:** Run `chmod +x start.sh && ./start.sh`.

### Method 2: Standard Command Line

```bash
# 1. Clone this repository
git clone https://github.com/<your-username>/atlasx-website.git
cd atlasx-website

# 2. Install dependencies
npm install

# 3. Start development server (accessible locally and on your local Wi-Fi)
npm run dev
```

Open **`http://localhost:5173`** in your browser.

---

## 📱 Testing on Mobile Phones & Tablets

Because the Vite dev server is configured with `host: true`, anyone on the same Wi-Fi network can open and interact with the website on their smartphone or tablet:

1. When you run `npm run dev`, check the terminal output:
   ```
     ➜  Local:   http://localhost:5173/
     ➜  Network: http://192.168.1.15:5173/
   ```
2. Open the `Network` address (e.g. `http://192.168.1.15:5173`) in mobile Safari, Chrome, or Firefox.
3. Enjoy the full interactive 3D Mars globe with multi-touch gestures!

---

## 📦 Build for Production

To create an optimized, static production build ready to host anywhere:

```bash
npm run build
```

The compiled files will be saved in `dist/`. You can preview the production build locally with:

```bash
npm run preview
```

---

## 🌐 Deploy to Free Web Hosting

This website is a standard Single-Page Application (SPA) and can be deployed with zero backend requirements to:

* **Vercel:** Import this repo into [vercel.com](https://vercel.com) — builds automatically.
* **Netlify:** Import this repo into [netlify.com](https://netlify.com) — build command `npm run build`, publish directory `dist`.
* **GitHub Pages:** Deploy the `dist/` folder directly to the `gh-pages` branch.

---

## 🔬 Open Scientific Data Attribution

AtlasX derives frameworks and telemetry from open planetary science pipelines:

* **NASA Mars Trek:** Global tile pipelines and high-resolution DTMs.
* **USGS Astrogeology Science Center:** MOLA 128 PPD digital elevation models & Viking MDIM 2.1 mosaics.
* **NASA Mars 2020 & Curiosity Raw Image Archive:** Mastcam-Z, SuperCam LIBS, SHERLOC, and PIXL instruments.
* **JPL Horizons DE441:** Real-time planetary ephemeris, areocentric solar longitude ($L_s$), and solar flux.
* **NASA InSight APSS & MEDA:** In-situ Martian atmospheric and surface weather measurements.
* **NASA Worldview:** Time-series and layer mapping methodologies.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.
