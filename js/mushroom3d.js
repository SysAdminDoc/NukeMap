// NukeMap - Mushroom Cloud (SVG Leaflet overlay, map-anchored, zoom-scaled)
window.NM = window.NM || {};

NM.Mushroom3D = {
  active: false,
  overlays: [],    // all active cloud overlays
  currentDet: null,

  init() { /* no-op, no Three.js needed */ },

  show(det, keepExisting) {
    if (!keepExisting) this.hideAll();
    this.currentDet = det;
    const map = NM._map;
    if (!map) return;

    const e = det.effects;
    // Cloud footprint: use cloud cap radius, minimum fireball*2
    const footprintKm = Math.max(e.cloudTopR * 1.2, e.fireball * 3, 0.5);
    const heightKm = e.cloudTopH;
    const stemRatio = e.stemR / Math.max(e.cloudTopR, 0.1);
    const capRatio = footprintKm / Math.max(heightKm, 0.1);

    // Compute map bounds for the overlay
    const R = 6371;
    const dLat = (footprintKm / R) * (180 / Math.PI);
    // Height in map: we want the cloud to extend upward (north) from GZ
    // Use ~2x footprint vertically to show the full cloud shape
    const vExtent = dLat * 2.5;
    const hExtent = dLat * 1.3;

    const bounds = L.latLngBounds(
      [det.lat - dLat * 0.3, det.lng - hExtent],
      [det.lat + vExtent, det.lng + hExtent]
    );

    const svgStr = this._buildSVG(det.yieldKt, footprintKm, heightKm);
    const svgEl = document.createElement('div');
    svgEl.innerHTML = svgStr;
    const svgNode = svgEl.firstElementChild;

    const overlay = L.svgOverlay(svgNode, bounds, {
      interactive: false,
      className: 'mushroom-overlay'
    }).addTo(map);

    this.overlays.push(overlay);
    this.active = true;

    // Animate: reveal from bottom up using the SVG clip-path
    // The SVG has a <clipPath id="XX-reveal"> with a <rect> we animate
    const uid = svgNode.querySelector('clipPath')?.id?.replace('-reveal', '');
    const clipRect = svgNode.querySelector('.mc-reveal-rect');
    if (clipRect) {
      const totalH = 500; // matches SVG viewBox height
      const duration = 3000;
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min(1, (now - start) / duration);
        // Ease-out cubic
        const eased = 1 - Math.pow(1 - p, 3);
        // Rect starts at full height (everything clipped) and shrinks upward
        const y = totalH * (1 - eased);
        clipRect.setAttribute('y', y.toFixed(1));
        clipRect.setAttribute('height', (totalH - y + 10).toFixed(1));
        if (p < 1 && this.active) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }

    // Fade in quickly
    svgNode.style.opacity = '0';
    svgNode.style.transition = 'opacity 0.4s ease-out';
    requestAnimationFrame(() => { svgNode.style.opacity = '1'; });
  },

  _buildSVG(yieldKt, footprintKm, heightKm) {
    // Determine color intensity based on yield (hotter for bigger)
    const intensity = Math.min(1, Math.log10(Math.max(yieldKt, 0.1)) / 5 + 0.5);
    const W = 400, H = 500;
    const cx = W / 2;

    // Cloud proportions
    const stemW = W * 0.08;
    const stemBase = H * 0.95;
    const stemTop = H * 0.45;
    const capCY = H * 0.3;
    const capRX = W * 0.38;
    const capRY = H * 0.18;

    // Generate unique ID for filters
    const uid = 'mc' + Date.now();

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" style="overflow:visible">
      <defs>
        <!-- Turbulence for cloud texture -->
        <filter id="${uid}-turb" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="4" seed="${Math.floor(Math.random()*100)}" result="noise"/>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="18" xChannelSelector="R" yChannelSelector="G"/>
        </filter>
        <filter id="${uid}-turb2" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" seed="${Math.floor(Math.random()*100)+50}" result="noise"/>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" xChannelSelector="R" yChannelSelector="G"/>
        </filter>
        <filter id="${uid}-glow">
          <feGaussianBlur stdDeviation="6" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="${uid}-shadow">
          <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="rgba(0,0,0,0.4)"/>
        </filter>

        <!-- Reveal clip-path: starts showing nothing, animated to show everything -->
        <clipPath id="${uid}-reveal">
          <rect class="mc-reveal-rect" x="-50" y="${H}" width="${W+100}" height="10"/>
        </clipPath>

        <!-- Cap gradient (fire -> smoke) -->
        <radialGradient id="${uid}-capGrad" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stop-color="rgb(${Math.round(255*intensity)},${Math.round(160*intensity)},${Math.round(60*intensity)})"/>
          <stop offset="25%" stop-color="rgb(${Math.round(220*intensity)},${Math.round(120*intensity)},${Math.round(40*intensity)})"/>
          <stop offset="50%" stop-color="rgb(${Math.round(180*intensity)},${Math.round(90*intensity)},${Math.round(30*intensity)})"/>
          <stop offset="75%" stop-color="rgb(140,100,70)"/>
          <stop offset="100%" stop-color="rgb(90,70,55)"/>
        </radialGradient>

        <!-- Inner fire glow -->
        <radialGradient id="${uid}-fireGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="rgba(255,200,100,0.6)"/>
          <stop offset="40%" stop-color="rgba(255,120,40,0.3)"/>
          <stop offset="100%" stop-color="rgba(200,60,20,0)"/>
        </radialGradient>

        <!-- Stem gradient -->
        <linearGradient id="${uid}-stemGrad" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stop-color="rgb(100,80,60)" stop-opacity="0.3"/>
          <stop offset="30%" stop-color="rgb(140,110,80)" stop-opacity="0.7"/>
          <stop offset="50%" stop-color="rgb(160,120,85)" stop-opacity="0.8"/>
          <stop offset="70%" stop-color="rgb(140,110,80)" stop-opacity="0.7"/>
          <stop offset="100%" stop-color="rgb(100,80,60)" stop-opacity="0.3"/>
        </linearGradient>

        <!-- Base debris gradient -->
        <radialGradient id="${uid}-baseGrad" cx="50%" cy="30%" r="60%">
          <stop offset="0%" stop-color="rgba(200,150,100,0.5)"/>
          <stop offset="50%" stop-color="rgba(150,110,75,0.3)"/>
          <stop offset="100%" stop-color="rgba(100,80,60,0)"/>
        </radialGradient>
      </defs>

      <!-- All visible content clipped by the rising reveal rect -->
      <g clip-path="url(#${uid}-reveal)">

        <!-- Drop shadow layer -->
        <g filter="url(#${uid}-shadow)" opacity="0.7">

          <!-- Ground debris / dust ring -->
          <ellipse cx="${cx}" cy="${stemBase}" rx="${W*0.35}" ry="${H*0.06}"
            fill="url(#${uid}-baseGrad)" filter="url(#${uid}-turb2)"/>

          <!-- Stem -->
          <path d="M${cx-stemW} ${stemBase} Q${cx-stemW*1.5} ${(stemBase+stemTop)/2} ${cx-stemW*0.7} ${stemTop}
                   L${cx+stemW*0.7} ${stemTop} Q${cx+stemW*1.5} ${(stemBase+stemTop)/2} ${cx+stemW} ${stemBase} Z"
            fill="url(#${uid}-stemGrad)" filter="url(#${uid}-turb2)"/>

          <!-- Stem collar / skirt where it meets cap -->
          <ellipse cx="${cx}" cy="${stemTop+capRY*0.3}" rx="${capRX*0.5}" ry="${capRY*0.4}"
            fill="rgb(130,95,65)" opacity="0.5" filter="url(#${uid}-turb2)"/>

          <!-- Main mushroom cap - large ellipse with turbulence -->
          <ellipse cx="${cx}" cy="${capCY}" rx="${capRX}" ry="${capRY}"
            fill="url(#${uid}-capGrad)" filter="url(#${uid}-turb)" opacity="0.9"/>

          <!-- Cap top dome (slightly smaller, brighter) -->
          <ellipse cx="${cx}" cy="${capCY - capRY*0.15}" rx="${capRX*0.75}" ry="${capRY*0.7}"
            fill="url(#${uid}-capGrad)" filter="url(#${uid}-turb)" opacity="0.7"/>

          <!-- Inner fire glow -->
          <ellipse cx="${cx}" cy="${capCY + capRY*0.1}" rx="${capRX*0.5}" ry="${capRY*0.5}"
            fill="url(#${uid}-fireGrad)" filter="url(#${uid}-glow)"/>

          <!-- Cap edge wisps (smaller ellipses around the rim) -->
          ${this._generateWisps(cx, capCY, capRX, capRY, uid)}

          <!-- Rising smoke column above cap -->
          <ellipse cx="${cx}" cy="${capCY - capRY*0.8}" rx="${capRX*0.3}" ry="${capRY*0.5}"
            fill="rgb(110,85,65)" opacity="0.3" filter="url(#${uid}-turb)"/>

        </g>

        <!-- Animated inner pulse -->
        <ellipse cx="${cx}" cy="${capCY}" rx="${capRX*0.35}" ry="${capRY*0.35}"
          fill="rgba(255,180,80,0.15)">
          <animate attributeName="rx" values="${capRX*0.3};${capRX*0.4};${capRX*0.3}" dur="3s" repeatCount="indefinite"/>
          <animate attributeName="ry" values="${capRY*0.3};${capRY*0.4};${capRY*0.3}" dur="3s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.15;0.25;0.15" dur="3s" repeatCount="indefinite"/>
        </ellipse>

      </g>

    </svg>`;
  },

  _generateWisps(cx, cy, rx, ry, uid) {
    let wisps = '';
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const wx = cx + Math.cos(angle) * rx * (0.85 + Math.random() * 0.2);
      const wy = cy + Math.sin(angle) * ry * (0.7 + Math.random() * 0.3);
      const wr = 15 + Math.random() * 25;
      wisps += `<circle cx="${wx.toFixed(1)}" cy="${wy.toFixed(1)}" r="${wr.toFixed(1)}"
        fill="rgb(${120+Math.floor(Math.random()*40)},${80+Math.floor(Math.random()*30)},${50+Math.floor(Math.random()*20)})"
        opacity="${(0.3 + Math.random()*0.3).toFixed(2)}" filter="url(#${uid}-turb2)"/>`;
    }
    return wisps;
  },

  hide() { this.hideAll(); },

  hideAll() {
    this.active = false;
    const map = NM._map;
    if (map) this.overlays.forEach(o => map.removeLayer(o));
    this.overlays = [];
    this.currentDet = null;
  },

  // Remove a specific overlay by index (for removing individual detonations)
  removeAt(idx) {
    const map = NM._map;
    if (map && this.overlays[idx]) map.removeLayer(this.overlays[idx]);
    this.overlays.splice(idx, 1);
    if (!this.overlays.length) this.active = false;
  },

  cleanup() { this.hideAll(); },

  onMapMove() { /* SVG overlay auto-tracks with Leaflet, no manual reposition needed */ },

  toggle(det, keepExisting) {
    if (this.active && !keepExisting) this.hideAll();
    else if (det) this.show(det, keepExisting);
  }
};
