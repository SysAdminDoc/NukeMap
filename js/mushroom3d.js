// NukeMap - 3D Mushroom Cloud (Three.js overlay on Leaflet)
window.NM = window.NM || {};

NM.Mushroom3D = {
  scene: null, camera: null, renderer: null, cloud: null,
  container: null, active: false, animId: null,
  currentDet: null,

  init() {
    if (typeof THREE === 'undefined') return;
    this.container = document.createElement('div');
    this.container.id = 'mushroom-3d';
    this.container.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;z-index:450;pointer-events:none;display:none';
    document.getElementById('map').appendChild(this.container);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(0, 2, 8);
    this.camera.lookAt(0, 2, 0);

    this.renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x000000, 0);
    this.container.appendChild(this.renderer.domElement);

    // Lighting
    const amb = new THREE.AmbientLight(0x444444);
    this.scene.add(amb);
    const dir = new THREE.DirectionalLight(0xffaa66, 1.2);
    dir.position.set(2, 5, 3);
    this.scene.add(dir);
    const rim = new THREE.DirectionalLight(0xff6633, 0.6);
    rim.position.set(-2, 3, -3);
    this.scene.add(rim);

    window.addEventListener('resize', () => {
      if (!this.renderer) return;
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
  },

  show(det) {
    if (!this.renderer) return;
    this.currentDet = det;
    this.cleanup();

    const e = det.effects;
    const scale = Math.max(0.5, Math.min(4, Math.log10(Math.max(det.yieldKt, 0.1)) * 0.6 + 1));

    // Build mushroom cloud geometry
    const group = new THREE.Group();

    // Stem (cylinder with slight taper)
    const stemGeo = new THREE.CylinderGeometry(0.15 * scale, 0.25 * scale, 3 * scale, 16);
    const stemMat = new THREE.MeshPhongMaterial({
      color: 0x8b7355, transparent: true, opacity: 0.7,
      emissive: 0x332211, emissiveIntensity: 0.3
    });
    const stem = new THREE.Mesh(stemGeo, stemMat);
    stem.position.y = 1.5 * scale;
    group.add(stem);

    // Debris cloud at base
    for (let i = 0; i < 8; i++) {
      const debrisGeo = new THREE.SphereGeometry(0.3 * scale * (0.5 + Math.random() * 0.5), 8, 8);
      const debrisMat = new THREE.MeshPhongMaterial({
        color: 0x665544, transparent: true, opacity: 0.5,
        emissive: 0x221100, emissiveIntensity: 0.2
      });
      const debris = new THREE.Mesh(debrisGeo, debrisMat);
      const angle = (i / 8) * Math.PI * 2;
      debris.position.set(Math.cos(angle) * 0.5 * scale, 0.2 * scale, Math.sin(angle) * 0.5 * scale);
      group.add(debris);
    }

    // Mushroom cap (multiple overlapping spheres for organic look)
    const capColors = [0xee8844, 0xdd6633, 0xcc5522, 0xff9955, 0xbb4411];
    for (let i = 0; i < 12; i++) {
      const r = (0.6 + Math.random() * 0.6) * scale;
      const capGeo = new THREE.SphereGeometry(r, 12, 10);
      const capMat = new THREE.MeshPhongMaterial({
        color: capColors[i % capColors.length],
        transparent: true, opacity: 0.55 + Math.random() * 0.2,
        emissive: 0x441100, emissiveIntensity: 0.4
      });
      const cap = new THREE.Mesh(capGeo, capMat);
      const angle = (i / 12) * Math.PI * 2;
      const dist = Math.random() * 0.5 * scale;
      cap.position.set(
        Math.cos(angle) * dist,
        3 * scale + (Math.random() - 0.3) * 0.5 * scale,
        Math.sin(angle) * dist
      );
      cap.userData.rotSpeed = (Math.random() - 0.5) * 0.01;
      cap.userData.bobSpeed = 0.5 + Math.random() * 0.5;
      cap.userData.bobAmp = 0.02 + Math.random() * 0.03;
      cap.userData.baseY = cap.position.y;
      group.add(cap);
    }

    // Inner glow sphere
    const glowGeo = new THREE.SphereGeometry(0.8 * scale, 16, 16);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0xff6600, transparent: true, opacity: 0.3
    });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    glow.position.y = 3 * scale;
    group.add(glow);

    // Animate entrance: scale from 0
    group.scale.set(0.01, 0.01, 0.01);
    this.cloud = group;
    this.scene.add(group);
    this.container.style.display = 'block';
    this.active = true;

    // Growth animation
    const startTime = performance.now();
    const growDuration = 2500;

    const animate = (now) => {
      if (!this.active) return;
      const elapsed = now - startTime;
      const growP = Math.min(1, elapsed / growDuration);
      const eased = 1 - Math.pow(1 - growP, 3);

      group.scale.set(eased, eased, eased);

      // Rotate slowly
      group.rotation.y += 0.003;

      // Bob cap spheres
      group.children.forEach(child => {
        if (child.userData.bobSpeed) {
          child.position.y = child.userData.baseY + Math.sin(now * 0.001 * child.userData.bobSpeed) * child.userData.bobAmp * scale;
        }
      });

      // Glow pulse
      if (glow) {
        glow.material.opacity = 0.2 + Math.sin(now * 0.003) * 0.1;
      }

      this.renderer.render(this.scene, this.camera);
      this.animId = requestAnimationFrame(animate);
    };
    this.animId = requestAnimationFrame(animate);
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
