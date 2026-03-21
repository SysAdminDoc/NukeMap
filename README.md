# NukeMap v1.0.0

A premium nuclear weapon effects simulator with offline map support, intelligent location search, and accurate nuclear physics calculations. Inspired by Alex Wellerstein's NUKEMAP, rebuilt from scratch with a modern dark UI and full offline capability.

## Features

- **Offline-First** - Service worker caches map tiles after first visit. Built-in vector map fallback renders simplified world coastlines when fully offline.
- **32 Weapon Presets** - From the Davy Crockett tactical nuke (0.02 kT) to the Tsar Bomba 100 MT design yield. US, Russian, Chinese, UK, French, Indian, Pakistani, North Korean, and Israeli weapons.
- **8 Effect Rings** - Fireball, 500 rem radiation, heavy blast (20 psi), moderate blast (5 psi), 3rd degree burns, light blast (1 psi), 1st degree burns, and EMP radius.
- **Intelligent Search** - Search by city name, state, ZIP code, partial ZIP, "City, State" format, or raw coordinates. Fuzzy matching with population-weighted ranking.
- **Fallout Modeling** - Surface burst fallout plumes with adjustable wind direction compass and speed.
- **Multiple Detonations** - Stack multiple warheads on the same map with independent effects.
- **Casualty Estimation** - Population density-based fatality and injury estimates.
- **6 Historical Presets** - Hiroshima, Nagasaki, Castle Bravo, Tsar Bomba, Trinity, and Ivy Mike. Click to auto-navigate and detonate.
- **Premium Dark UI** - Catppuccin Mocha theme with glassmorphism, backdrop blur, and smooth animations.

## Usage

1. Open `index.html` in any modern browser
2. Search for a location or click anywhere on the map
3. Select a weapon or adjust the yield slider
4. Choose burst type (Airburst/Surface/Custom)
5. Click the map to detonate, or press the DETONATE button for map center

## Nuclear Physics

Calculations based on scaling laws from Glasstone & Dolan's *The Effects of Nuclear Weapons*:

| Effect | Scaling | Formula |
|--------|---------|---------|
| Fireball | Y^0.4 | 0.066 * Y^0.4 km |
| Blast | Y^(1/3) | Cube root with psi-specific coefficients |
| Thermal | Y^0.41 | Burn-degree specific coefficients |
| Radiation | Y^0.19 | Significant for yields < 200 kT |
| EMP | Y^0.33 | Capped at 400 km |

## Offline Capability

| Scenario | Map Quality |
|----------|-------------|
| First visit (online) | Full CartoDB dark tiles, cached by service worker |
| Subsequent visits (offline) | Cached tiles for previously viewed areas |
| Never been online | Built-in vector map with coastlines and grid |

## Tech Stack

- Vanilla HTML/CSS/JS (no build step)
- Leaflet.js for mapping
- Service Worker for offline caching
- Catppuccin Mocha color palette

## License

MIT
