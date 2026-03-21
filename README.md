# NukeMap v2.0.0

A premium nuclear weapon effects simulator with offline map support, intelligent location search, and physics calculations based on Glasstone & Dolan's *The Effects of Nuclear Weapons*. Rebuilt from scratch with a modern dark UI and full offline capability.

## Features

- **Offline-First** - Service worker caches map tiles after first visit. Built-in canvas vector map renders simplified world coastlines when fully offline.
- **32 Weapon Presets** - From Davy Crockett (0.02 kT) to Tsar Bomba 100 MT design. US, Russian, Chinese, UK, French, Indian, Pakistani, North Korean, and Israeli weapons grouped by country.
- **10 Effect Rings** - Fireball, 500 rem radiation, severe blast (200 psi), heavy blast (20 psi), moderate blast (5 psi), 3rd degree burns, light blast (1 psi), 1st degree burns, EMP radius, and crater (surface bursts).
- **Intelligent Search** - City name, state, ZIP code, partial ZIP, "City, State" format, or raw lat/lng coordinates. Fuzzy matching with population-weighted ranking.
- **Ring Hover Tooltips** - Hover any effect ring for detailed description, radius in km+miles, and area.
- **Mushroom Cloud Dimensions** - Cloud top altitude, cap radius, stem radius, burst height.
- **Event Timeline** - Time-sequenced progression from detonation through fallout arrival.
- **Crater Calculations** - Radius, depth, lip height, and ejecta radius for surface bursts.
- **Fallout Modeling** - Elliptical plumes with adjustable wind direction compass, speed, and fission fraction.
- **Multiple Detonations** - Stack warheads with independent effects, numbered markers, and removal.
- **Casualty Estimation** - Zone-based fatality and injury estimates using population density modeling.
- **Shareable URLs** - Detonation state encoded in URL parameters. Share button with one-click copy.
- **6 Historical Presets** - Trinity, Hiroshima, Nagasaki, Ivy Mike, Castle Bravo, Tsar Bomba.
- **12 Quick Target Pills** - One-click fly to major world cities and strategic locations.
- **Tabbed Interface** - Weapon / Effects / Results tabs for clean organization.
- **Premium Dark UI** - Catppuccin Mocha with glassmorphism, backdrop blur, SVG icons, smooth animations.

## Usage

1. Open `index.html` in any modern browser
2. Search for a location, click a quick target pill, or click anywhere on the map
3. Select a weapon or adjust the yield slider (also accepts direct numeric input)
4. Choose burst type and fission fraction
5. Click the map to detonate, or press DETONATE for map center
6. Switch to Effects tab for detailed ring data, mushroom cloud, and timeline
7. Switch to Results tab for casualties and share link

## Nuclear Physics

Calculations based on Glasstone & Dolan's *The Effects of Nuclear Weapons* (1977) and Brode equations:

| Effect | Scaling | Formula |
|--------|---------|---------|
| Fireball | Y^0.4 | 0.066 * Y^0.4 km (airburst) |
| Severe Blast (200 psi) | Y^(1/3) | 0.11 * Y^(1/3) km |
| Heavy Blast (20 psi) | Y^(1/3) | 0.24 * Y^(1/3) km |
| Moderate Blast (5 psi) | Y^(1/3) | 0.59 * Y^(1/3) km |
| Light Blast (1 psi) | Y^(1/3) | 1.93 * Y^(1/3) km |
| Thermal 3rd Degree | Y^0.41 | 0.68 * Y^0.41 km |
| Radiation 500 rem | Y^0.19 | 1.15 * Y^0.19 km |
| EMP | Y^0.33 | 2.5 * Y^0.33 km (max 500) |
| Crater | Y^(1/3.4) | 0.038 * Y^(1/3.4) km |
| Cloud Top | Y^0.42 | 0.29 * Y^0.42 km |

## Offline Capability

| Scenario | Map Quality |
|----------|-------------|
| First visit (online) | Full CartoDB dark tiles, cached by service worker |
| Subsequent visits (offline) | Cached tiles for previously viewed areas |
| Never been online | Built-in canvas map with coastlines and grid |

## Tech Stack

- Vanilla HTML/CSS/JS (zero dependencies, no build step)
- Leaflet.js for mapping
- Service Worker for offline tile caching
- Catppuccin Mocha color palette

## License

MIT
