# NukeMap v3.2.0

## Overview
Nuclear weapon effects simulator with 16 JS modules (~5000 lines), animated blast waves, SVG mushroom cloud, MIRV simulation, full WW3 simulation engine (418 verified targets, 708 warheads, 7 scenarios), sound effects, attack scenarios, missile flight calculator, nuclear winter estimates, shelter analysis, weapon comparison, population heatmap, and comprehensive immersive features.

## Tech Stack
- HTML/CSS/JS (16 JS modules, ~5000+ lines total, ww3.js alone is 1070 lines)
- Leaflet.js (maps), Web Audio API (sounds)
- Service worker for offline, `build.py` for bundling, `build_targets.py` for target DB
- Catppuccin Mocha dark theme

## File Structure
```
index.html            App shell (~385 lines)
css/styles.css        All styling (~500 lines)
js/
  data.js             Cities (250+), weapons (32), MIRV/shelter/world data
  physics.js          Glasstone & Dolan calcs + formatting
  search.js           Fuzzy search engine
  effects.js          Map rings, fallout, markers, tooltips
  animation.js        Blast wave expansion, fireball glow, camera shake
  sound.js            Web Audio API procedural explosion
  mushroom3d.js       SVG mushroom cloud overlay
  mirv.js             MIRV patterns + staggered detonation
  shelter.js          Shelter survival analysis
  compare.js          Weapon comparison mode
  heatmap.js          Population density canvas overlay
  extras.js           Ring labels, distance tools, thermal gradient, fallout particles, radiation decay, screenshot, overpressure table, layer switcher
  advanced.js         Experience mode, attack scenarios, measurement tool, missile flight, yield chart, nuclear winter, facts
  premium.js          Altitude profile, zone casualties, EMP details, destruction stats, weapon specs, survival calc, draggable GZ, export PNG, delivery arc
  immersive.js        Geiger counter, casualty counter anim, size comparisons, seismic equivalent, escape time, GPS safety, shockwave ring, fallout contours, KML export, nuclear test DB
  ww3.js              WW3 simulation engine (1070 lines) - 418 targets, 7 scenarios, missile arcs, phased escalation
  app.js              Main controller (~810 lines)
sw.js                 Service worker
build.py              Offline bundler
build_targets.py      Target DB compiler (JSON -> JS arrays)
data/
  us_targets.json     175 US targets (verified from FAS/BAS/NNSA)
  russia_targets.json 103 Russian targets (verified from FAS/BAS/russianforces.org)
  targets.json        74 NATO + 66 Chinese targets (verified from FAS/BAS/NTI)
  compiled_targets.js Auto-generated JS arrays from above
```

## WW3 Simulation Engine
### Target Database (418 verified targets)
- **US (175)**: 7 ICBM bases/MAFs, 5 bomber bases, 2 SSBN bases, 13 C2, 11 nuclear facilities, 20 military bases, 17 infrastructure, 101 metro areas 500K+
- **Russia (101)**: 12 ICBM silo regiments, 20 mobile ICBM garrisons, 3 sub bases, 2 bomber bases, 6 C2, 10 nuclear cities, 8 military, 38 cities 500K+
- **NATO Europe (74)**: 7 nuclear sharing bases, 7 NATO HQs, 5 UK nuclear, 8 French nuclear, 17 NATO bases, 30 capitals + cities
- **China (66)**: 8 ICBM silo fields, 5 mobile ICBM, 3 sub bases, 2 bomber, 8 nuclear facilities, 5 C2, 41 cities 2M+

### 7 Scenarios
1. US vs Russia (Full Exchange) - ~495 warheads
2. Russia vs NATO + UK/FR Retaliation - NATO attacked, UK Trident + French M51 fire back
3. US vs China - bilateral exchange
4. Counterforce Only (US-Russia) - military only, no cities
5. Global Thermonuclear War - all 708 warheads, all sides
6. Russian First Strike on US - surprise attack
7. US First Strike on Russia - surprise attack

### Features
- Animated great-circle missile arcs with altitude bulge and antimeridian fix
- Side-colored arcs (blue=US, red=Russia, yellow=China, green=UK, purple=France)
- Launch site flash animations
- Air raid siren at start (procedural Web Audio)
- Phase transition rumble sounds
- Rocket launch whoosh + explosion boom (throttled)
- Screen flash + camera shake on impact
- Real effect rings for city targets, fireball animation for all
- Pulsing GZ markers (cities pulse, military static)
- Nuclear winter darkening overlay (progressive)
- Floating map HUD (casualties, warheads, megatonnage)
- Map legend (arc colors + target types)
- Speed control (1x / 2x / 5x / 10x)
- End-of-simulation summary with long-term death estimates
- Megatonnage tracking

## Gotchas
- SVG mushroom cloud bounds: ground level at 93% from SVG top, anchor to detonation lat
- MSVC raw string 16380 char limit if ever porting to C++
- Antimeridian: great circle paths must unwrap longitude to prevent straight lines
- Performance: only city targets get full effect rings (blast/thermal/EMP); military gets fireball only
- Sound throttling: explosion max 1/350ms, rocket max 1/200ms, flash max 1/600ms, shake max 1/500ms

## Version History
- v3.2.0 - OG meta/favicon, loading overlay, undo button, total yield stat, right-click detonate, auto Effects tab, mobile responsive (480/768px), Hiroshima equivalents, detonation toasts, scale bar, fullscreen, coords copy, flash blindness ring (day/night), firestorm zone, nearby strategic targets, dose calculator, night mode, 12 map styles + floating switcher, quick weapon bar, save/load scenarios, yield in dropdown, population per ring
- v3.1.0 - WW3 simulation: 418 targets, 7 scenarios, missile arcs, HUD, nuclear winter, speed control
- v3.0.0e - Immersive features: Geiger counter, seismic, escape time, GPS safety, shockwave ring, fallout contours, KML export, nuclear test DB
- v3.0.0d - Realistic SVG mushroom cloud with proper anatomy, per-detonation clouds
- v3.0.0c - Attack scenarios, experience mode, measurement, missile flight, yield chart, nuclear winter, facts
- v3.0.0b - Ring labels, distance tools, layer switcher, thermal overlay, fallout particles, radiation decay, screenshot, PSI table
- v3.0.0a - Multi-file rebuild with animations, 3D, MIRV, sound, shelter, comparison, heatmap
- v2.0.0 - Tabbed UI, 10 effects, tooltips, timeline, crater, shareable URLs
- v1.0.0 - Initial release
