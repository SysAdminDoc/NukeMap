# NukeMap v3.2.0

A premium nuclear weapon effects simulator with animated blast waves, SVG mushroom clouds, MIRV strikes, full WW3 simulation engine (418 verified targets, 708 warheads, 7 scenarios), sound effects, missile flight calculator, nuclear winter estimates, shelter survival analysis, and population heatmaps. Physics based on Glasstone & Dolan's *The Effects of Nuclear Weapons*.

**[Live Demo](https://sysadmindoc.github.io/NukeMap/)**

## Features

### Core Simulation
- **10 Effect Rings** - Fireball, crater, 500 rem radiation, 200/20/5/1 psi blast, 3rd/1st degree burns, EMP
- **32 Weapon Presets** - US, Russian, Chinese, UK, French, Indian, Pakistani, North Korean, Israeli arsenals
- **Fallout Modeling** - Elliptical plumes with adjustable wind direction, speed, and fission fraction
- **Casualty Estimation** - Zone-based fatality/injury model using population density data

### WW3 Simulation Engine
- **418 Verified Targets** - US (175), Russia (101), NATO Europe (74), China (66) sourced from FAS/BAS/NNSA
- **7 Scenarios** - US vs Russia, Russia vs NATO, US vs China, Counterforce Only, Global Thermonuclear War, Russian First Strike, US First Strike
- **Animated Missile Arcs** - Great-circle trajectories with altitude bulge, color-coded by nation (blue=US, red=Russia, yellow=China, green=UK, purple=France)
- **Phased Escalation** - Staggered launch waves with air raid siren, phase transition rumble, rocket whoosh, explosion boom
- **Nuclear Winter** - Progressive darkening overlay with long-term death estimates
- **Floating Map HUD** - Real-time casualties, warheads launched, megatonnage tracker
- **Speed Control** - 1x / 2x / 5x / 10x playback speed
- **End-of-Simulation Summary** - Total casualties, megatonnage, nuclear winter projections

### Animations & Sound
- **Animated Blast Wave** - Rings expand outward at scaled speed with physically-timed propagation
- **Fireball Glow** - Color-shifting fireball animation (white to orange to red)
- **Camera Shake** - Screen shake proportional to weapon yield
- **Sound Effects** - Procedural explosion via Web Audio API: initial crack, deep boom, sub-bass throb, distant echo rumble

### SVG Mushroom Cloud
- Realistic SVG mushroom cloud with proper anatomy (particle cap, stem, debris base, inner glow)
- Per-detonation clouds anchored to ground zero

### Advanced Tools
- **MIRV Simulation** - 8 presets (Trident II, SS-18 Satan, RS-28 Sarmat, etc.) with circle, triangle, grid, and cross deployment patterns. Staggered detonation timing.
- **Attack Scenarios** - Pre-built strike scenarios with experience mode
- **Missile Flight Calculator** - Trajectory and flight time estimation
- **Yield Chart** - Visual yield comparison across weapons
- **Nuclear Winter Estimates** - Global climate impact projections
- **Population Heatmap** - Canvas overlay visualizing population density before striking
- **Shelter Survival Analysis** - Distance-based survival probability for 8 shelter types (open air through deep underground)
- **Weapon Comparison** - Side-by-side table of two weapons' effect radii with overlaid rings on map
- **Shareable URLs** - Detonation state encoded in URL parameters

### Immersive Features
- **Geiger Counter** - Simulated radiation detector
- **Casualty Counter Animation** - Animated real-time casualty tallies
- **Size Comparisons** - Blast radius compared to familiar landmarks
- **Seismic Equivalent** - Earthquake magnitude equivalent of detonation
- **Escape Time Calculator** - Time to reach safety from ground zero
- **GPS Safety Check** - Uses device location to assess proximity to detonation
- **Shockwave Ring** - Animated expanding shockwave visualization
- **Fallout Contours** - Detailed fallout zone boundaries
- **KML Export** - Export detonation data for Google Earth
- **Nuclear Test Database** - Historical nuclear test reference data

### Extras
- **Ring Labels** - On-map labels for each effect zone
- **Distance Tools** - Measure distances from ground zero
- **Thermal Gradient Overlay** - Heat intensity visualization
- **Fallout Particles** - Animated particle fallout effect
- **Radiation Decay Calculator** - Time-based radiation level estimation
- **Screenshot Export** - Capture current map state as image
- **Overpressure Table** - Detailed PSI breakdown
- **Layer Switcher** - Multiple map tile providers

### Search & Data
- **250+ US Cities** with ZIP codes, **100+ World Cities**, **25+ Strategic/Military Targets**
- **Fuzzy Search** - City name, state, ZIP, partial ZIP, "City, State", or raw coordinates
- **12 Quick Target Pills** - One-click fly to major cities

## Usage

1. Open the **[Live Demo](https://sysadmindoc.github.io/NukeMap/)** or `index.html` in any modern browser
2. Search for a location or click a quick target
3. Select weapon, adjust yield, choose burst type
4. Click the map to detonate
5. **Effects tab**: Ring details, mushroom cloud dimensions, timeline, crater, shelter analysis
6. **Results tab**: Casualties, active detonations, share link
7. **Tools tab**: MIRV strikes, weapon comparison, WW3 simulation

## Offline Mode

```bash
python build.py    # Creates NukeMap-offline.html (fully self-contained)
```

Or just open `index.html` online once - the service worker caches everything for offline use.

## Architecture

```
NukeMap/
  index.html          App shell
  css/styles.css      All styling
  js/
    data.js           Cities, weapons, MIRV presets, shelter types
    physics.js        Glasstone & Dolan nuclear calculations
    search.js         Fuzzy search engine
    effects.js        Map ring drawing, fallout, markers
    animation.js      Blast wave, fireball glow, camera shake
    sound.js          Web Audio API procedural sounds
    mushroom3d.js     SVG mushroom cloud overlay
    mirv.js           MIRV pattern generation
    shelter.js        Shelter survival analysis
    compare.js        Weapon comparison mode
    heatmap.js        Population density overlay
    extras.js         Ring labels, distance tools, thermal gradient, fallout particles, screenshot
    advanced.js       Experience mode, attack scenarios, missile flight, yield chart, nuclear winter
    premium.js        Altitude profile, zone casualties, EMP details, destruction stats, export
    immersive.js      Geiger counter, seismic equivalent, escape time, GPS safety, KML export
    ww3.js           WW3 simulation engine (418 targets, 7 scenarios, missile arcs)
    app.js           Main controller
  data/
    us_targets.json       175 US targets (FAS/BAS/NNSA verified)
    russia_targets.json   103 Russian targets (FAS/BAS verified)
    targets.json          74 NATO + 66 Chinese targets (FAS/BAS/NTI verified)
    compiled_targets.js   Auto-generated JS arrays
  sw.js              Service worker
  build.py           Offline bundler
  build_targets.py   Target DB compiler
```

## License

MIT
