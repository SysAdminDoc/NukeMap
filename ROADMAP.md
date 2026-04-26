# Roadmap

Nuclear weapon effects simulator with 12 effect rings, 32 weapon presets, full WW3 engine (418 targets, 708 warheads, 7 scenarios), HEMP, SVG mushroom cloud, PWA. Physics from Glasstone & Dolan. Roadmap focuses on simulation fidelity, data depth, and interactive scenario building.

## Planned Features

### Physics & Fidelity
- Meteorological fallout model with live wind-field ingestion (GFS / HRRR / ECMWF grids)
- Elevation-aware blast propagation (SRTM height map shadowing of effect rings)
- Water-detonation mode with base-surge and tsunami estimate
- Multi-burst damage superposition (overlapping overpressure sums correctly)
- Dose-rate integration with actual fallout arrival times + rainfall rainout factor
- Neutron-initiated prompt radiation modeled separately from thermal/fallout

### Weapon & Target Data
- Declassified W-series yield refresh (W76-2, B61-12, RS-28 Sarmat, DF-41, Avangard HGV)
- Submarine / bomber basing markers with patrol-zone overlays
- Non-strategic targets: dams, refineries, power grid nodes, datacenter clusters
- Counter-value vs counter-force target toggles
- Historical scenario library (Able Archer 83, Cuban Missile scenarios, etc.)

### WW3 Engine
- Response-chain logic (first strike → survivable retaliation modeled from launch-on-warning logic)
- SLBM vs ICBM differentiated flight times with bastion deployment of SSBN
- Missile defense modeled: GMD interceptors at Fort Greely, THAAD batteries
- Post-war estimate: nuclear winter modeled on declassified Robock & Toon 2007/2022 papers
- Shareable scenario URLs that include warhead assignments

### Analysis & Education
- Lesson mode: guided scripted walkthroughs of historic tests + hypothetical strikes
- Citation view: every physics number linked to source (Glasstone page, FAS page, NUKEMAP paper)
- Accessibility captions for animations (screen-reader-friendly narration)
- Glossary panel expansion (50+ terms from the current 11)
- Compare two scenarios side-by-side with synchronized playback

### Rendering
- WebGL heatmap for damage aggregation (smoother than canvas)
- 3D globe alternate view (Cesium/MapLibre-3D) for intercontinental trajectories
- High-DPI SVG rerender for print-quality export
- Multiple basemap providers with attribution rotation

### Platform
- True offline PWA (bundle ZIP DB, target DB, map tiles for US/Europe minimum)
- Desktop Electron / Tauri wrapper for zero-latency use
- Android/iOS Capacitor build
- CLI target-database updater (`build_targets.py`) hooked to FAS/BAS RSS for automated refresh

## Competitive Research
- **NUKEMAP (Alex Wellerstein)** — the canonical reference; study fallout model implementation.
- **MissileMap** — great for flight times + interceptor modeling; borrow UX patterns.
- **OUTRIDER / Plan A (Princeton SGS)** — excellent escalation scenarios, strong visualization.
- **Nukewar (ICANW)** — advocacy angle, global death-toll framing; relevant for education view.

## Nice-to-Haves
- User-submitted detonation scenario sharing (moderated gist index)
- VR mode for ground-level experience walk
- Audio: yield-scaled sonic boom delay modeling
- Integration with real-world radar (NEXRAD overlay) for fallout-plume verification on test mode
- Language packs beyond English (German, French, Russian, Japanese, Mandarin)
- Educator mode: disable shock-value animations, emphasize physics and citations

## Open-Source Research (Round 2)

### Related OSS Projects
- https://github.com/GOFAI/glasstone — Python library for nuclear weapon effects modeling (numpy/scipy). Primary academic reference.
- https://github.com/Prethea-Phoenixia/HeWu — Python empirical effects models, cross-references multiple sources.
- https://github.com/nuclearblastsimulator/nuclear-blast-simulator — Web-based educational blast simulator with weapon library from TNT to Tsar Bomba.
- https://github.com/farhannysf/global-thermonuclear-strike — 3D Cesium MIRV simulation of Trident II D-5 payload.
- https://github.com/diego-devs/Nuclear-Annihilation-Simulator — Leaflet-based click-to-detonate with cumulative global impact log.
- https://github.com/Mammad900/OpenHeimer — Open nuclear weapon *design* tool (yield math, not effects).
- https://github.com/paulromano/awesome-nuclear — Curated list, good source of secondary projects.
- https://nuclearweaponarchive.org/Library/Nukesims.html — Repository of public-domain sim binaries/sources (HotSpot, KDFOC, etc.).

### Features to Borrow
- Cesium 3D globe overlay for trajectory + detonation animation (farhannysf).
- Cumulative global casualty/damage log across a session (diego-devs).
- Python-validated physics module — port glasstone's scaling laws as a JSON oracle for the JS engine to regression-test against (GOFAI/glasstone).
- HeWu's cross-referenced multi-source fits — expose a "model source" selector (Glasstone-77 vs Brode vs Soviet 1987) per ring.
- OpenHeimer-style yield editor — configure custom warhead yields beyond presets.
- Fallout plume with time-phased dose-rate isolines (HotSpot-style from the archive repo).
- Weapon library imported/exported as JSON (nuclearblastsimulator pattern).
- Scenario "replay" with timeline scrubber for MIRV arrival sequencing.

### Patterns & Architectures Worth Studying
- **Cesium + Leaflet dual-mode render path** (farhannysf + diego-devs) — reuse target DB for both 2D and 3D views.
- **WebWorker-partitioned ring computation** — offload 12-ring × 708-warhead math off the main thread before paint.
- **Empirical fit validation harness** — glasstone-style pytest oracle that the JS bundle is built against in CI.
- **Blast model plugin interface** — swap Brode/Glasstone/Soviet formulas without forking the UI layer.
