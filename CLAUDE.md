# NukeMap v3.0.0

## Overview
Nuclear weapon effects simulator. Multi-file web app with Leaflet maps, 3D mushroom cloud, animated blast waves, MIRV simulation, sound effects, population heatmap, shelter analysis, weapon comparison, and comprehensive city search.

## Tech Stack
- HTML/CSS/JS (multi-file, 12 JS modules)
- Leaflet.js (maps), Three.js (3D mushroom cloud)
- Web Audio API (procedural explosion sounds)
- Service worker for offline caching
- Catppuccin Mocha dark theme
- `build.py` bundles to single offline HTML

## File Structure
```
index.html           - App shell, loads all modules
css/styles.css       - All styling (~300 lines)
js/data.js           - Cities (250+), weapons (32), MIRV presets, shelter types, world geometry
js/physics.js        - Glasstone & Dolan calculations, formatting, helpers
js/search.js         - Fuzzy search engine
js/effects.js        - Map ring drawing, fallout, markers, tooltips
js/animation.js      - Blast wave expansion, fireball glow, camera shake, flash
js/sound.js          - Web Audio API procedural explosion sounds
js/mushroom3d.js     - Three.js 3D mushroom cloud overlay
js/mirv.js           - MIRV pattern generation + staggered detonation
js/shelter.js        - Shelter survival analysis at multiple distances
js/compare.js        - Side-by-side weapon comparison table + overlay
js/heatmap.js        - Population density canvas heatmap overlay
js/app.js            - Main controller, UI, tabs, map init (~520 lines)
sw.js                - Service worker (caches app + tiles + CDN libs)
build.py             - Bundles everything into NukeMap-offline.html
```

## Key Features (v3.0.0)
- **Animated blast wave** - Rings expand outward at scaled speed with ease-out
- **Fireball glow** - Animated color-shifting fireball that grows and fades
- **Camera shake** - Screen shake proportional to yield
- **Sound effects** - Procedural crack + deep boom + sub-bass + echo via Web Audio API
- **3D mushroom cloud** - Three.js rendered with particle cap, stem, debris, inner glow
- **MIRV simulation** - 8 presets (Trident, Sarmat, SS-18, etc.), circle/triangle/grid/cross patterns
- **Population heatmap** - Canvas overlay showing city population density
- **Shelter survival** - Bar chart showing survival % by shelter type at each blast zone
- **Weapon comparison** - Side-by-side table + overlaid rings on map
- **4 tabs** - Weapon / Effects / Results / Tools
- **250+ cities** with ZIP codes, 100+ world cities, 25+ strategic targets
- **Shareable URLs**, toggleable effects, responsive design

## Physics
- 10 effects: fireball, crater, radiation, 200/20/5/1 psi blast, 3rd/1st thermal, EMP
- Fallout: elliptical with fission fraction + wind
- Crater + mushroom cloud dimensions
- Zone-based casualty model with density estimation

## Version History
- v3.0.0 - Multi-file rebuild. Animated blast wave, 3D mushroom cloud, sound effects, MIRV, population heatmap, shelter analysis, weapon comparison, build script
- v2.0.0 - Tabbed UI, 10 effects, tooltips, timeline, crater, shareable URLs
- v1.0.0 - Initial release
