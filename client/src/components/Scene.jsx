import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Persistent 3D background. `home` = big hero dumbbell that reacts to scroll.
 * On other pages it shrinks and moves aside so content stays readable.
 */
export default function Scene({ home }) {
  const ref = useRef(null);
  const homeRef = useRef(home);
  useEffect(() => { homeRef.current = home; }, [home]);

  useEffect(() => {
    const cv = ref.current;
    const renderer = new THREE.WebGLRenderer({ canvas: cv, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07080a, 0.06);
    const cam = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    cam.position.set(0, 0, 8);

    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const l1 = new THREE.PointLight(0xc6ff3d, 40, 30); l1.position.set(4, 3, 5);
    const l2 = new THREE.PointLight(0x3dffd4, 30, 30); l2.position.set(-5, -2, 4);
    const l3 = new THREE.PointLight(0xffffff, 20, 30); l3.position.set(0, 5, -3);
    scene.add(l1, l2, l3);

    const steel = new THREE.MeshStandardMaterial({ color: 0x2a2d31, metalness: 0.95, roughness: 0.28 });
    const chrome = new THREE.MeshStandardMaterial({ color: 0xb9bec4, metalness: 1, roughness: 0.18 });
    const lime = new THREE.MeshStandardMaterial({ color: 0xc6ff3d, metalness: 0.4, roughness: 0.35, emissive: 0x2c4400 });

    const db = new THREE.Group();
    const cyl = (r, h, m) => {
      const x = new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, 48), m);
      x.rotation.z = Math.PI / 2;
      return x;
    };
    db.add(cyl(0.12, 3.6, chrome));
    for (let i = -6; i <= 6; i++) {
      if (Math.abs(i) < 1) continue;
      const k = cyl(0.135, 0.04, steel); k.position.x = i * 0.1; db.add(k);
    }
    [[1, 1.05, 0.3, 1.15], [1, 0.82, 0.24, 1.5], [-1, 1.05, 0.3, 1.15], [-1, 0.82, 0.24, 1.5]].forEach(([s, r, w, off]) => {
      const x = s * off;
      const p = cyl(r, w, steel); p.position.x = x; db.add(p);
      const rim = new THREE.Mesh(new THREE.TorusGeometry(r, 0.03, 16, 72), lime);
      rim.rotation.y = Math.PI / 2; rim.position.x = x + (s * w) / 2; db.add(rim);
    });
    [-1, 1].forEach((s) => { const c = cyl(0.2, 0.12, lime); c.position.x = s * 1.8; db.add(c); });
    scene.add(db);

    const rings = [1.9, 2.5].map((r, i) => {
      const m = new THREE.Mesh(
        new THREE.TorusGeometry(r, 0.008, 8, 160),
        new THREE.MeshBasicMaterial({ color: i ? 0x3dffd4 : 0xc6ff3d, transparent: true, opacity: 0.45 })
      );
      m.rotation.x = 1.2 + i * 0.5; scene.add(m); return m;
    });

    const N = 700, pos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 26;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 16 - 2;
    }
    const pg = new THREE.BufferGeometry();
    pg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const pts = new THREE.Points(pg, new THREE.PointsMaterial({ color: 0xc6ff3d, size: 0.04, transparent: true, opacity: 0.7 }));
    scene.add(pts);

    const mouse = { x: 0, y: 0 }, cur = { x: 0, y: 0 };
    const onMove = (e) => { mouse.x = (e.clientX / innerWidth) * 2 - 1; mouse.y = (e.clientY / innerHeight) * 2 - 1; };
    addEventListener("pointermove", onMove);
    const resize = () => {
      renderer.setSize(innerWidth, innerHeight, false);
      cam.aspect = innerWidth / innerHeight; cam.updateProjectionMatrix();
    };
    resize(); addEventListener("resize", resize);

    let raf, sp = 0, blend = homeRef.current ? 1 : 0;
    const t0 = performance.now();
    const loop = () => {
      const t = (performance.now() - t0) / 1000;
      const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
      const target = homeRef.current ? scrollY / max : 0;
      sp += (target - sp) * 0.06;
      blend += ((homeRef.current ? 1 : 0) - blend) * 0.05; // smooth home <-> inner-page transition
      cur.x += (mouse.x - cur.x) * 0.05; cur.y += (mouse.y - cur.y) * 0.05;

      const mob = innerWidth < 760;
      const homeX = mob ? 0 : 1.9 * Math.cos(sp * Math.PI * 3);
      const sideX = mob ? 0 : 3.8;
      db.position.x = sideX + (homeX - sideX) * blend;
      db.position.y = (mob ? 1.6 : 0) + Math.sin(t * 1.2) * 0.12 - sp * 0.6;
      const s = (mob ? 0.62 : 1) * (1 - 0.3 * sp) * (0.5 + 0.5 * blend);
      db.scale.setScalar(s);
      db.rotation.y = t * 0.35 + sp * 9 + cur.x * 0.6;
      db.rotation.x = cur.y * 0.4 + 0.2;
      db.rotation.z = 0.35 + Math.sin(sp * 6) * 0.2;
      rings[0].rotation.z = t * 0.3; rings[1].rotation.z = -t * 0.22;
      rings.forEach((r) => { r.position.copy(db.position); r.scale.setScalar(s); });
      pts.rotation.y = t * 0.02 + sp * 1.2; pts.position.y = sp * 2;
      l1.position.x = 4 + Math.sin(t) * 2; l2.position.y = -2 + Math.cos(t * 0.8) * 2;
      renderer.render(scene, cam);
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("pointermove", onMove);
      removeEventListener("resize", resize);
      renderer.dispose();
    };
  }, []);

  return <canvas ref={ref} className="bg" />;
}
