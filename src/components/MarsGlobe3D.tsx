import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { MARS_LANDMARKS, MarsLandmark } from '../data/marsData';
import { MapPin, Compass, Info, ExternalLink } from 'lucide-react';

interface MarsGlobe3DProps {
  onSelectLandmark?: (landmark: MarsLandmark) => void;
  selectedLandmark?: MarsLandmark | null;
}

export default function MarsGlobe3D({ onSelectLandmark, selectedLandmark }: MarsGlobe3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSite, setActiveSite] = useState<MarsLandmark>(MARS_LANDMARKS[0]);
  const [isRotating, setIsRotating] = useState(true);

  useEffect(() => {
    if (selectedLandmark) {
      setActiveSite(selectedLandmark);
    }
  }, [selectedLandmark]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 2.8;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Mars Sphere
    const sphereRadius = 1.0;
    const sphereGeometry = new THREE.SphereGeometry(sphereRadius, 64, 64);

    // Texture Loader
    const textureLoader = new THREE.TextureLoader();
    const marsTexture = textureLoader.load(
      '/basemaps/mars_viking_global.jpg',
      () => renderer.render(scene, camera),
      undefined,
      () => {
        // Fallback procedural texture if image load fails
      }
    );

    const sphereMaterial = new THREE.MeshStandardMaterial({
      map: marsTexture,
      roughness: 0.85,
      metalness: 0.1,
    });

    const marsMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(marsMesh);

    // Atmosphere Rim Glow
    const atmosphereGeometry = new THREE.SphereGeometry(sphereRadius * 1.03, 48, 48);
    const atmosphereMaterial = new THREE.MeshBasicMaterial({
      color: 0xff6622,
      transparent: true,
      opacity: 0.15,
      side: THREE.BackSide,
    });
    const atmosphereMesh = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphereMesh);

    // Orbital Graticule Ring
    const ringGeometry = new THREE.RingGeometry(1.35, 1.36, 64);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.25,
      side: THREE.DoubleSide,
    });
    const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
    ringMesh.rotation.x = Math.PI / 2.3;
    scene.add(ringMesh);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff5ea, 1.8);
    sunLight.position.set(5, 3, 4);
    scene.add(sunLight);

    // Background Subtle Stars
    const starsGeometry = new THREE.BufferGeometry();
    const starCount = 300;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 20;
      starPositions[i + 1] = (Math.random() - 0.5) * 20;
      starPositions[i + 2] = -Math.random() * 15 - 2;
    }
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starsMaterial = new THREE.PointsMaterial({
      color: 0x93c5fd,
      size: 0.035,
      transparent: true,
      opacity: 0.7,
    });
    const starField = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starField);

    // Interaction Controls (Drag to rotate)
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      marsMesh.rotation.y += deltaX * 0.005;
      marsMesh.rotation.x += deltaY * 0.005;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isDragging) {
        marsMesh.rotation.y += 0.0018;
      }
      ringMesh.rotation.z += 0.0008;

      renderer.render(scene, camera);
    };
    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      dom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      if (container.contains(dom)) {
        container.removeChild(dom);
      }
      sphereGeometry.dispose();
      sphereMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[400px] sm:h-[480px] lg:h-[540px] flex items-center justify-center select-none overflow-hidden rounded-3xl border border-white/10 bg-slate-950/60 backdrop-blur-xl shadow-2xl">
      {/* Three.js Canvas Container */}
      <div ref={containerRef} className="absolute inset-0 cursor-grab active:cursor-grabbing" />

      {/* Top HUD Overlay */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none text-xs font-mono">
        <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 pointer-events-auto">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-slate-200 font-semibold text-[11px]">INTERACTIVE 3D AREOID (IAU 2000)</span>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-[10px] text-slate-300 pointer-events-auto">
          <span>DRAG TO ROTATE MARS</span>
        </div>
      </div>

      {/* Landmark Selector Pills */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-center gap-1.5 z-10 pointer-events-auto">
        {MARS_LANDMARKS.slice(0, 4).map((site) => {
          const isActive = activeSite.id === site.id;
          return (
            <button
              key={site.id}
              onClick={() => {
                setActiveSite(site);
                if (onSelectLandmark) onSelectLandmark(site);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
                isActive
                  ? 'bg-orange-500 text-white font-bold shadow-[0_0_15px_rgba(255,87,34,0.5)] border border-orange-400'
                  : 'bg-black/60 hover:bg-black/80 text-slate-300 hover:text-white border border-white/10'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: site.highlightColor }} />
              <span>{site.name.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Site Detail Floating Badge */}
      <div className="absolute top-14 left-4 max-w-xs bg-slate-900/85 backdrop-blur-md border border-white/15 p-3.5 rounded-2xl shadow-xl pointer-events-none hidden sm:block text-left">
        <div className="flex items-center gap-1.5 text-orange-400 text-[10px] font-mono uppercase tracking-wider mb-0.5">
          <Compass size={12} /> {activeSite.type}
        </div>
        <div className="text-white font-bold text-sm">{activeSite.name}</div>
        <div className="text-[11px] font-mono text-cyan-300 mt-0.5">
          {Math.abs(activeSite.lat)}°{activeSite.lat >= 0 ? 'N' : 'S'}, {Math.abs(activeSite.lon)}°{activeSite.lon >= 0 ? 'E' : 'W'} · Elev {activeSite.elevationM}m
        </div>
        <p className="text-[10px] text-slate-300 mt-1 line-clamp-2 leading-relaxed">
          {activeSite.description}
        </p>
      </div>
    </div>
  );
}
