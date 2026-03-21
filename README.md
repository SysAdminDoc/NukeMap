# NukeMap v3.0.0

A premium nuclear weapon effects simulator with animated blast waves, 3D mushroom clouds, MIRV strikes, sound effects, population heatmaps, and shelter survival analysis. Physics based on Glasstone & Dolan's *The Effects of Nuclear Weapons*.

## Features

### Core Simulation
- **10 Effect Rings** - Fireball, crater, 500 rem radiation, 200/20/5/1 psi blast, 3rd/1st degree burns, EMP
- **32 Weapon Presets** - US, Russian, Chinese, UK, French, Indian, Pakistani, North Korean, Israeli arsenals
- **Fallout Modeling** - Elliptical plumes with adjustable wind direction, speed, and fission fraction
- **Casualty Estimation** - Zone-based fatality/injury model using population density data

### Animations & Sound
- **Animated Blast Wave** - Rings expand outward at scaled speed with physically-timed propagation
- **Fireball Glow** - Color-shifting fireball animation (white to orange to red)
- **Camera Shake** - Screen shake proportional to weapon yield
- **Sound Effects** - Procedural explosion via Web Audio API: initial crack, deep boom, sub-bass throb, distant echo rumble

### 3D Visualization
- **Three.js Mushroom Cloud** - Animated 3D mushroom cloud with particle cap, stem, debris base, and inner glow. Toggleable overlay on the map.

### Advanced Tools
- **MIRV Simulation** - 8 presets (Trident II, SS-18 Satan, RS-28 Sarmat, etc.) with circle, triangle, grid, and cross deployment patterns. Staggered detonation timing.
- **Population Heatmap** - Canvas overlay visualizing population density before striking
- **Shelter Survival Analysis** - Distance-based survival probability for 8 shelter types (open air through deep underground)
- **Weapon Comparison** - Side-by-side table of two weapons' effect radii with overlaid rings on map
- **Shareable URLs** - Detonation state encoded in URL parameters

### Search & Data
- **250+ US Cities** with ZIP codes, **100+ World Cities**, **25+ Strategic/Military Targets**
- **Fuzzy Search** - City name, state, ZIP, partial ZIP, "City, State", or raw coordinates
- **12 Quick Target Pills** - One-click fly to major cities

## Usage

1. Open `index.html` in any modern browser (Edge, Chrome, Firefox)
2. Search for a location or click a quick target
3. Select weapon, adjust yield, choose burst type
4. Click the map to detonate
5. **Effects tab**: Ring details, mushroom cloud dimensions, timeline, crater, shelter analysis
6. **Results tab**: Casualties, active detonations, share link
7. **Tools tab**: MIRV strikes, weapon comparison

## Offline Mode

```bash
python build.py    # Creates NukeMap-offline.html (fully self-contained)
```

Or just open `index.html` online once - the service worker caches everything for offline use.

## Architecture

```
NukeMap/
  index.html         App shell
  css/styles.css     All styling
  js/
    data.js          Cities, weapons, MIRV presets, shelter types
    physics.js       Glasstone & Dolan nuclear calculations
    search.js        Fuzzy search engine
    effects.js       Map ring drawing, fallout, markers
    animation.js     Blast wave, fireball glow, camera shake
    sound.js         Web Audio API procedural sounds
    mushroom3d.js    Three.js 3D mushroom cloud
    mirv.js          MIRV pattern generation
    shelter.js       Shelter survival analysis
    compare.js       Weapon comparison mode
    heatmap.js       Population density overlay
    app.js           Main controller
  sw.js              Service worker
  build.py           Offline bundler
```

## License

MIT
