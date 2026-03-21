# NukeMap v2.0.0

## Overview
Nuclear weapon effects simulator. Fully offline-capable single-page web app with Leaflet maps, comprehensive city/ZIP search, and nuclear physics calculations based on Glasstone & Dolan.

## Tech Stack
- HTML/CSS/JS (single file: `index.html`)
- Leaflet.js for mapping (CDN + offline canvas fallback)
- Service worker (`sw.js`) for offline tile caching
- Catppuccin Mocha dark theme with glassmorphism

## Architecture
- **Single HTML file** with all CSS/JS inline
- **Offline map**: Custom `L.TileLayer` extension renders canvas tiles with simplified world coastlines, lat/lng grid
- **Online map**: CartoDB dark_all tiles
- **Service worker**: Caches tiles and app shell for offline use after first load
- **City database**: ~130 entries (US cities, world cities, military targets) embedded in JS array
- **Search engine**: Fuzzy matching by city name, state, ZIP code, coordinates; population-weighted ranking

## Key Files
- `index.html` - Complete application
- `sw.js` - Service worker for offline caching

## Nuclear Physics (Glasstone & Dolan + Brode)
- Fireball: `0.066 * Y^0.4` km (airburst), `0.05 * Y^0.4` (surface)
- Blast radii: Cube root scaling (`Y^(1/3)`) - 200 psi, 20 psi, 5 psi, 3 psi, 1 psi
- Thermal: `Y^0.41` scaling - 3rd, 2nd, 1st degree burns
- Radiation: `Y^0.19` scaling (500 rem)
- EMP: `2.5 * Y^0.33` km (capped at 500 km)
- Crater: `0.038 * Y^(1/3.4)` for surface bursts
- Mushroom cloud: stem/cap dimensions from `Y^0.4` and `Y^0.42`
- Fallout: Elliptical plume with fission fraction, wind direction/speed
- Casualty: Zone-based (fireball/200psi/20psi/5psi/3psi/1psi/thermal) with population density model

## v2.0.0 Features (over v1.0.0)
- **Tabbed UI** (Weapon / Effects / Results) - cleaner organization
- **10 effect rings** (added 200 psi severe blast + crater)
- **Ring hover tooltips** - hover any ring for detailed description, radius, area
- **Mushroom cloud dimensions panel** - cloud top altitude, cap radius, stem radius
- **Event timeline** - time-sequenced blast/thermal/fallout events
- **Crater calculations** - radius, depth, lip height, ejecta (surface bursts)
- **Fission fraction control** - adjustable % affects fallout intensity
- **Direct yield input** - type exact value with kT/MT/tons unit selector
- **Quick target pills** - one-click fly to 12 major cities
- **Weapon select grouped by country** - optgroup organization
- **Weapon descriptions** - tooltip on each weapon
- **Shareable URLs** - detonation state encoded in URL params (?d=lat,lng,yield,burst)
- **Share button + copy** - easy sharing
- **Info bar overlay** - persistent casualty summary on map
- **Coordinates display** - live mouse position readout
- **Auto-zoom to fit** - map fits to largest effect ring after detonation
- **Imperial+metric** - radii shown as "X km (Y mi)"
- **SVG icons** - crisp vector icons instead of unicode
- **Improved styling** - better glass effects, tighter spacing, polished animations

## Version History
- v2.0.0 - Major upgrade: tabbed UI, 10 effects, tooltips, timeline, crater, mushroom cloud, shareable URLs, fission fraction, quick targets
- v1.0.0 - Initial release
