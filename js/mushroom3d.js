// NukeMap - 3D Mushroom Cloud (map-anchored, zoom-relative, overhead view)
window.NM = window.NM || {};

NM.Mushroom3D = {
  scene: null, camera: null, renderer: null, cloud: null,
  container: null, active: false, animId: null,
  currentDet: null, map: null,

  init() {
    if (typeof THREE === 'undefined') return;
    // Container will be positioned over the GZ point on the map
    this.container = document.createElement('div');
    this.container.id = 'mushroom-3d';
    this.container.style.cssText = 'position:absolute;z-index:450;pointer-events:none;display:none;overflow:hidden;border-radius:50%';
    document.getElementById('map').appendChild(this.container);

    this.scene = new THREE.Scene();
    // Perspective from slightly angled overhead
    this.camera = new THREE.PerspectiveCamera(40, 1, 0.1, 500);

    this.renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x000000, 0);
    this.container.appendChild(this.renderer.domElement);

    // Lighting
    this.scene.add(new THREE.AmbientLight(0x555555));
    const dir = new THREE.DirectionalLight(0xffaa66, 1.2);
    dir.position.set(2, 8, 3);
    this.scene.add(dir);
    const rim = new THREE.DirectionalLight(0xff6633, 0.5);
    rim.position.set(-2, 5, -3);
    this.scene.add(rim);
    // Bottom light to illuminate underside of cap
    const bottom = new THREE.DirectionalLight(0xff4400, 0.3);
    bottom.position.set(0, -2, 0);
    this.scene.add(bottom);
  },

  show(det) {
    if (!this.renderer) return;
    this.currentDet = det;
    this.cleanup();

    const group = new THREE.Group();

    // Stem
    const stemGeo = new THREE.CylinderGeometry(0.12, 0.22, 3, 16);
    const stemMat = new THREE.MeshPhongMaterial({
      color: 0x8b7355, transparent: true, opacity: 0.65,
      emissive: 0x332211, emissiveIntensity: 0.3
    });
    const stem = new THREE.Mesh(stemGeo, stemMat);
    stem.position.y = 1.5;
    group.add(stem);

    // Debris ring at base
    for (let i = 0; i < 8; i++) {
      const dGeo = new THREE.SphereGeometry(0.18 + Math.random() * 0.15, 8, 6);
      const dMat = new THREE.MeshPhongMaterial({
        color: 0x665544, transparent: true, opacity: 0.45,
        emissive: 0x221100, emissiveIntensity: 0.2
      });
      const d = new THREE.Mesh(dGeo, dMat);
      const a = (i / 8) * Math.PI * 2;
      d.position.set(Math.cos(a) * 0.4, 0.15, Math.sin(a) * 0.4);
      group.add(d);
    }

    // Mushroom cap — overlapping spheres
    const capColors = [0xee8844, 0xdd6633, 0xcc5522, 0xff9955, 0xbb4411, 0xee7733];
    for (let i = 0; i < 14; i++) {
      const r = 0.45 + Math.random() * 0.45;
      const cGeo = new THREE.SphereGeometry(r, 12, 10);
      const cMat = new THREE.MeshPhongMaterial({
        color: capColors[i % capColors.length],
        transparent: true, opacity: 0.5 + Math.random() * 0.2,
        emissive: 0x441100, emissiveIntensity: 0.35
      });
      const c = new THREE.Mesh(cGeo, cMat);
      const a = (i / 14) * Math.PI * 2;
      const dist = Math.random() * 0.35;
      c.position.set(Math.cos(a) * dist, 3 + (Math.random() - 0.3) * 0.4, Math.sin(a) * dist);
      c.userData.bobSpeed = 0.4 + Math.random() * 0.4;
      c.userData.bobAmp = 0.015 + Math.random() * 0.02;
      c.userData.baseY = c.position.y;
      group.add(c);
    }

    // Inner glow
    const glowGeo = new THREE.SphereGeometry(0.6, 16, 16);
    const glowMat = new THREE.MeshBasicMaterial({color: 0xff6600, transparent: true, opacity: 0.25});
    const glow = new THREE.Mesh(glowGeo, glowMat);
    glow.position.y = 3;
    group.add(glow);

    group.scale.set(0.01, 0.01, 0.01);
    this.cloud = group;
    this.scene.add(group);
    this.container.style.display = 'block';
    this.active = true;

    const startTime = performance.now();
    const growDuration = 2500;

    const animate = (now) => {
      if (!this.active) return;
      const elapsed = now - startTime;
      const growP = Math.min(1, elapsed / growDuration);
      const eased = 1 - Math.pow(1 - growP, 3);
      group.scale.set(eased, eased, eased);
      group.rotation.y += 0.002;

      group.children.forEach(child => {
        if (child.userData.bobSpeed) {
          child.position.y = child.userData.baseY + Math.sin(now * 0.001 * child.userData.bobSpeed) * child.userData.bobAmp;
        }
      });
      if (glow) glow.material.opacity = 0.2 + Math.sin(now * 0.003) * 0.08;

      // Reposition on map
      this._updatePosition();

      this.renderer.render(this.scene, this.camera);
      this.animId = requestAnimationFrame(animate);
    };
    this.animId = requestAnimationFrame(animate);
  },

  // Position the 3D container over the GZ point, sized relative to the fireball/cloud radius on the map
  _updatePosition() {
    if (!this.currentDet || !this.active) return;
    const map = NM._map;
    if (!map) return;

    const det = this.currentDet;
    const e = det.effects;

    // Use the cloud cap radius as the visual footprint on the map
    const cloudR = Math.max(e.cloudTopR, e.fireball * 2, 1);

    // Convert cloud radius to pixels at current zoom
    const center = map.latLngToContainerPoint([det.lat, det.lng]);
    const R = 6371;
    const edgeLat = det.lat + (cloudR / R) * (180 / Math.PI);
    const edge = map.latLngToContainerPoint([edgeLat, det.lng]);
    const pixelR = Math.abs(center.y - edge.y);

    // Size the container: diameter = pixelR * 2, clamped
    const size = Math.max(60, Math.min(500, pixelR * 2.5));
    const halfSize = size / 2;

    this.container.style.width = size + 'px';
    this.container.style.height = size + 'px';
    this.container.style.left = (center.x - halfSize) + 'px';
    this.container.style.top = (center.y - halfSize) + 'px';

    this.renderer.setSize(size, size);
    this.camera.aspect = 1;

    // Camera: angled overhead view looking down at the cloud
    // Distance scales so cloud fills the container nicely
    const camDist = 7;
    this.camera.position.set(0, camDist * 0.85, camDist * 0.55);
    this.camera.lookAt(0, 1.5, 0);
    this.camera.updateProjectionMatrix();
  },

  // Call on map move/zoom
  onMapMove() {
    if (this.active) this._updatePosition();
  },

  hide() {
    this.active = false;
    if (this.animId) cancelAnimationFrame(this.animId);
    if (this.container) this.container.style.display = 'none';
    this.cleanup();
  },

  cleanup() {
    if (this.cloud) {
      this.cloud.children.forEach(c => {
        if (c.geometry) c.geometry.dispose();
        if (c.material) c.material.dispose();
      });
      this.scene.remove(this.cloud);
      this.cloud = null;
    }
  },

  toggle(det) {
    if (this.active) this.hide();
    else if (det) this.show(det);
  }
};
