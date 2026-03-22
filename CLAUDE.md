# NukeMap v3.0.0

## Overview
Nuclear weapon effects simulator with 15 JS modules, animated blast waves, SVG mushroom cloud, MIRV simulation, sound effects, attack scenarios, missile flight calculator, nuclear winter estimates, shelter analysis, weapon comparison, population heatmap, immersive features (Geiger counter, seismic equivalent, escape time, GPS safety, shockwave ring, fallout contours, KML export, nuclear test database), and comprehensive search.

## Tech Stack
- HTML/CSS/JS (15 JS modules, ~4100 lines total)
- Leaflet.js (maps), Web Audio API (sounds)
- Service worker for offline, `build.py` for bundling
- Catppuccin Mocha dark theme

## File Structure
```
index.html            App shell (~370 lines)
css/styles.css        All styling (~440 lines)
js/
  data.js             Cities (250+), weapons (32), MIRV/shelter/world data
  physics.js          Glasstone & Dolan calcs + formatting
  search.js           Fuzzy search engine
  effects.js          Map rings, fallout, markers, tooltips
  animation.js        Blast wave expansion, fireball glow, camera shake
  sound.js            Web Audio API procedural explosion
  mushroom3d.js       SVG mushroom cloud overlay (replaced Three.js)
  mirv.js             MIRV patterns + staggered detonation
  shelter.js          Shelter survival analysis
  compare.js          Weapon comparison mode
  heatmap.js          Population density canvas overlay
  extras.js           Ring labels, distance tools, thermal gradient, fallout particles, radiation decay, screenshot, overpressure table, layer switcher
  advanced.js         Experience mode, attack scenarios, measurement tool, missile flight, yield chart, nuclear winter, facts
  premium.js          Altitude profile, zone casualties, EMP details, destruction stats, weapon specs, survival calc, draggable GZ, export PNG, delivery arc
  immersive.js        Geiger counter, casualty counter anim, size comparisons, seismic equivalent, escape time, GPS safety, shockwave ring, fallout contours, KML export, nuclear test DB
  app.js              Main controller (~770 lines)
sw.js                 Service worker
build.py              Offline bundler
```

## All Features
### Simulation
- 10 effect rings (fireball, crater, radiation, 4 blast, 2 thermal, EMP)
- 32 weapon presets grouped by country
- Airburst/surface/custom burst + fission fraction
- Fallout with wind direction/speed
- Casualty estimation (zone-based population density model)

### Animations & Sound
- Animated blast wave expansion (ease-out cubic, per-ring timing)
- Fireball glow (white->orange->red color shift)
- Camera shake (yield-proportional)
- Procedural explosion sound (crack + boom + sub-bass + echo)

### 3D
- Three.js mushroom cloud (particle cap, stem, debris, inner glow, animated growth)

### Advanced Tools (Tools tab)
- MIRV simulation (8 presets, 4 patterns: circle/triangle/grid/cross)
- Weapon comparison (side-by-side table + overlaid rings)
- "What Would I Experience?" (click mode: survival report at any distance)
- 6 attack scenario presets (auto-deploy multi-warhead strikes)
- Measurement tool (ruler between points)
- Missile flight time calculator (ICBM/SLBM/IRBM/SRBM from 3 countries)
- Yield comparison bar chart (logarithmic)
- Nuclear winter estimates (Toon et al. soot model)
- Radiation decay calculator (7:10 rule)
- Custom overpressure table (12 psi levels)

### Map Overlays (toggleable)
- Ring labels on map
- Distance reference rings
- Distance from GZ indicator
- Thermal flash gradient
- Animated fallout particles
- Population heatmap
- Map layer switcher (dark/satellite/topo/OSM)
- Shockwave ring animation (expanding + fading)
- Fallout dose rate contour lines (5 levels)
- Historic nuclear test sites (25 tests, color-coded by country)

### Immersive Features
- Geiger counter audio (hover near GZ, click rate scales with radiation intensity)
- Casualty counter animation (ease-out quartic count-up)
- City size comparisons (zone area vs landmarks: Vatican City, Manhattan, etc.)
- Seismic equivalent (Richter magnitude + earthquake comparison)
- Escape time calculator (walk/run/bike/car vs zone distances)
- GPS "Am I Safe?" (browser geolocation check against last detonation)
- KML export (effect rings for Google Earth)
- Nuclear test database (25 historic tests plotted on map)

### UI
- 4 tabs: Weapon / Effects / Results / Tools
- Screenshot mode (hide all UI)
- 20 rotating educational facts banner
- Shareable URLs
- 12 quick target pills
- Responsive design

## Version History
- v3.0.0e - Immersive features: Geiger counter, seismic, escape time, GPS safety, shockwave ring, fallout contours, KML export, nuclear test DB
- v3.0.0d - Realistic SVG mushroom cloud with proper anatomy, per-detonation clouds
- v3.0.0c - Attack scenarios, experience mode, measurement, missile flight, yield chart, nuclear winter, facts
- v3.0.0b - Ring labels, distance tools, layer switcher, thermal overlay, fallout particles, radiation decay, screenshot, PSI table
- v3.0.0a - Multi-file rebuild with animations, 3D, MIRV, sound, shelter, comparison, heatmap
- v2.0.0 - Tabbed UI, 10 effects, tooltips, timeline, crater, shareable URLs
- v1.0.0 - Initial release
