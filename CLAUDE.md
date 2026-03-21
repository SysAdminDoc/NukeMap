# NukeMap v1.0.0

## Overview
Nuclear weapon effects simulator. Fully offline-capable single-page web app with Leaflet maps, comprehensive city/ZIP search, and nuclear physics calculations.

## Tech Stack
- HTML/CSS/JS (single file: `index.html`)
- Leaflet.js for mapping (CDN + offline canvas fallback)
- Service worker (`sw.js`) for offline tile caching
- Catppuccin Mocha dark theme

## Architecture
- **Single HTML file** with all CSS/JS inline
- **Offline map**: Custom `L.TileLayer` extension renders canvas tiles with simplified world coastlines, lat/lng grid
- **Online map**: CartoDB dark_all tiles
- **Service worker**: Caches tiles and app shell for offline use after first load
- **City database**: ~170 entries (US cities, world cities, military targets) embedded in JS array
- **Search engine**: Fuzzy matching by city name, state, ZIP code, coordinates; population-weighted ranking

## Nuclear Physics
- Fireball: `0.066 * Y^0.4` km (airburst), `0.05 * Y^0.4` (surface)
- Blast radii: Cube root scaling (`Y^(1/3)`) with Glasstone & Dolan coefficients
- Thermal: `Y^0.41` scaling
- Radiation: `Y^0.19` scaling (significant for < 200 kT)
- Fallout: Elliptical plume for surface bursts, wind-direction aware
- EMP: `2.5 * Y^0.33` km (capped at 400 km)
- Casualty estimation based on population density from nearest city data

## Key Files
- `index.html` - Complete application
- `sw.js` - Service worker for offline caching

## Weapon Database
32 weapons from Davy Crockett (0.02 kT) to Tsar Bomba 100 MT design. US, Russian, Chinese, UK, French, Indian, Pakistani, North Korean, Israeli weapons.

## Features
- Click-to-detonate on map
- 32 weapon presets + custom yield
- Logarithmic yield slider (0.001 kT - 100 MT)
- Airburst/Surface/Custom burst height
- 8 effect rings (fireball, radiation, 3 blast levels, 2 thermal, EMP)
- Fallout plume with wind direction control
- Multiple simultaneous detonations
- Casualty estimation
- 6 historical detonation presets (auto-navigate + detonate)
- Toggle individual effect layers
- Responsive design
- Detonation flash animation

## Version History
- v1.0.0 - Initial release
