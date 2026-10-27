import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { Rotate3d, Layers, Maximize2 } from 'lucide-react';

interface HeroScene3DProps {
  theme?: 'dark' | 'light';
}

// Utility function to detect WebGL availability
function checkWebGLSupport(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

export const HeroScene3D: React.FC<HeroScene3DProps> = ({ theme = 'dark' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webGLSupported, setWebGLSupported] = useState<boolean>(true);
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [cameraMode, setCameraMode] = useState<'cinematic' | 'perspective'>('cinematic');

  // Three.js instances refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animFrameId = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);

  // Groups and Meshes refs
  const centralGroupRef = useRef<THREE.Group | null>(null);
  const coreMeshRef = useRef<THREE.Mesh | null>(null);
  const innerCoreRef = useRef<THREE.Mesh | null>(null);
  const ring1Ref = useRef<THREE.Mesh | null>(null);
  const ring2Ref = useRef<THREE.Mesh | null>(null);
  const archStructuresRef = useRef<THREE.Mesh[]>([]);
  const particlesRef = useRef<THREE.Points | null>(null);

  // Parallax & Camera Lerp vectors
  const pointer = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const isDragging = useRef<boolean>(false);
  const previousPointer = useRef({ x: 0, y: 0 });
  const cameraTargetPos = useRef(new THREE.Vector3(1.6, 0.4, 7.6));
  const cameraCurrentPos = useRef(new THREE.Vector3(0, 3.8, 13)); // Entrance position
  const cameraLookAtTarget = useRef(new THREE.Vector3(0.6, -0.1, 0));
  const cameraCurrentLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const isMobileRef = useRef<boolean>(false);

  // Check WebGL availability on mount
  useEffect(() => {
    if (!checkWebGLSupport()) {
      setWebGLSupported(false);
    }
  }, []);

  useEffect(() => {
    if (!webGLSupported) return;

    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || window.innerWidth;
    const height = mount.clientHeight || window.innerHeight;
    isMobileRef.current = width < 768;

    // Set initial camera target based on device width
    if (isMobileRef.current) {
      cameraTargetPos.current.set(0, 0.8, 9.4);
      cameraLookAtTarget.current.set(0, 0, 0);
    } else {
      cameraTargetPos.current.set(1.6, 0.4, 7.6);
      cameraLookAtTarget.current.set(0.6, -0.1, 0);
    }

    // 1. Scene & Depth Fog
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x06080c, 0.045);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.copy(cameraCurrentPos.current);
    camera.lookAt(cameraCurrentLookAt.current);
    cameraRef.current = camera;

    // 3. Renderer with PCF Soft Shadows & Tone Mapping
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        stencil: false
      });
    } catch {
      setWebGLSupported(false);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    rendererRef.current = renderer;

    mount.appendChild(renderer.domElement);

    // 4. Sophisticated Cinematic Lighting
    // Ambient base light
    const ambientLight = new THREE.AmbientLight(0x121622, 0.9);
    scene.add(ambientLight);

    // Key Directional Light with soft castShadow
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
    keyLight.position.set(7, 13, 8);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 32;
    keyLight.shadow.camera.left = -9;
    keyLight.shadow.camera.right = 9;
    keyLight.shadow.camera.top = 9;
    keyLight.shadow.camera.bottom = -9;
    keyLight.shadow.bias = -0.0004;
    keyLight.shadow.radius = 2.5;
    scene.add(keyLight);

    // Electric-Blue Rim / Edge Light
    const rimLight = new THREE.DirectionalLight(0x38bdf8, 3.4);
    rimLight.position.set(-8, 6, -6);
    scene.add(rimLight);

    // Violet Architectural Point Fill
    const violetFill = new THREE.PointLight(0x6366f1, 2.8, 26);
    violetFill.position.set(1.5, 0.8, 3.2);
    scene.add(violetFill);

    // Subtle cyan floor bounce light
    const cyanBounce = new THREE.PointLight(0x06b6d4, 1.4, 18);
    cyanBounce.position.set(-3, -1.8, 2);
    scene.add(cyanBounce);

    // 5. Architectural Floor Plane & Ground Grid
    const floorGeo = new THREE.PlaneGeometry(44, 44);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x07090e,
      roughness: 0.38,
      metalness: 0.82,
      depthWrite: true
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = -2.25;
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);

    // Precision Architectural Perspective Grid
    const grid = new THREE.GridHelper(40, 40, 0x38bdf8, 0x1b2230);
    grid.position.y = -2.24;
    (grid.material as THREE.Material).transparent = true;
    (grid.material as THREE.Material).opacity = 0.22;
    scene.add(grid);

    // 6. Central Focal Object (Monolithic Polyhedral Hyper-Structure)
    const centralGroup = new THREE.Group();
    if (isMobileRef.current) {
      centralGroup.position.set(0, 0.4, 0);
    } else {
      centralGroup.position.set(1.8, 0.1, 0);
    }
    scene.add(centralGroup);
    centralGroupRef.current = centralGroup;

    // (A) Monolithic Outer Obsidian Faceted Core
    const coreGeo = new THREE.IcosahedronGeometry(1.45, 1);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x141720,
      emissive: 0x0b0e16,
      emissiveIntensity: 0.4,
      roughness: 0.18,
      metalness: 0.88,
      clearcoat: 0.85,
      clearcoatRoughness: 0.12,
      reflectivity: 0.95
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.castShadow = true;
    coreMesh.receiveShadow = true;
    centralGroup.add(coreMesh);
    coreMeshRef.current = coreMesh;

    // (B) Inner Luminous Geometric Octahedron (Glowing Prismatic Core)
    const innerGeo = new THREE.OctahedronGeometry(0.72, 0);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0x38bdf8,
      emissiveIntensity: 1.85,
      roughness: 0.12,
      metalness: 0.9
    });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    centralGroup.add(innerCore);
    innerCoreRef.current = innerCore;

    // (C) Precision Kinetic Titanium Gimbals (Architectural Orbital Rings)
    const ring1Geo = new THREE.TorusGeometry(2.05, 0.024, 16, 120);
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0xa1a1aa,
      metalness: 0.94,
      roughness: 0.16
    });
    const ring1 = new THREE.Mesh(ring1Geo, ringMat1);
    ring1.rotation.set(Math.PI / 4.8, 0.2, 0.15);
    ring1.castShadow = true;
    centralGroup.add(ring1);
    ring1Ref.current = ring1;

    const ring2Geo = new THREE.TorusGeometry(2.45, 0.02, 16, 120);
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0x6366f1,
      emissive: 0x6366f1,
      emissiveIntensity: 0.45,
      metalness: 0.9,
      roughness: 0.2
    });
    const ring2 = new THREE.Mesh(ring2Geo, ringMat2);
    ring2.rotation.set(-Math.PI / 3.2, 0.35, -0.2);
    ring2.castShadow = true;
    centralGroup.add(ring2);
    ring2Ref.current = ring2;

    // Cardinal satellite markers along the gimbals
    const markerGeo = new THREE.BoxGeometry(0.08, 0.08, 0.16);
    const markerMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    for (let m = 0; m < 4; m++) {
      const angle = (m * Math.PI) / 2;
      const marker = new THREE.Mesh(markerGeo, markerMat);
      marker.position.set(2.05 * Math.cos(angle), 2.05 * Math.sin(angle), 0);
      ring1.add(marker);
    }

    // 7. Surrounding Architectural Structures (Monoliths, Pylons & Cantilevers)
    const archGroup = new THREE.Group();
    scene.add(archGroup);

    const archMeshes: THREE.Mesh[] = [];
    const archMat = new THREE.MeshStandardMaterial({
      color: 0x11131a,
      roughness: 0.24,
      metalness: 0.86
    });

    const structuresData = [
      // 1. Foreground-left vertical pylon (high optical parallax)
      { size: [0.65, 4.2, 0.65], pos: [-4.4, -0.15, 1.4], rot: [0, 0.22, 0] },
      // 2. Midground-left column
      { size: [0.45, 5.0, 0.45], pos: [-2.6, 0.25, -1.8], rot: [0, -0.15, 0] },
      // 3. Midground-right horizontal cantilever beam
      { size: [3.4, 0.36, 0.75], pos: [4.6, 1.6, -1.1], rot: [0.12, 0.25, 0.28] },
      // 4. Background-right towering spire piercing the horizon fog
      { size: [0.55, 6.4, 0.55], pos: [3.4, 0.95, -4.2], rot: [0, 0.3, 0] },
      // 5. Deep background architectural monolith
      { size: [1.4, 3.6, 0.6], pos: [-5.6, -0.45, -4.8], rot: [0, -0.35, 0] },
      // 6. Architectural pedestal foundation beneath central focal group
      { size: [2.5, 0.32, 2.5], pos: isMobileRef.current ? [0, -2.09, 0] : [1.8, -2.09, 0], rot: [0, 0.1, 0] }
    ];

    structuresData.forEach((s) => {
      const sGeo = new THREE.BoxGeometry(s.size[0], s.size[1], s.size[2]);
      const sMesh = new THREE.Mesh(sGeo, archMat);
      sMesh.position.set(s.pos[0], s.pos[1], s.pos[2]);
      sMesh.rotation.set(s.rot[0], s.rot[1], s.rot[2]);
      sMesh.castShadow = true;
      sMesh.receiveShadow = true;
      archGroup.add(sMesh);
      archMeshes.push(sMesh);
    });
    archStructuresRef.current = archMeshes;

    // 8. Floating Micro-Particle Stardust Field
    const particleCount = 420;
    const particlePositions = new Float32Array(particleCount * 3);

    for (let p = 0; p < particleCount; p++) {
      particlePositions[p * 3] = (Math.random() - 0.5) * 22;
      particlePositions[p * 3 + 1] = Math.random() * 9 - 1.8;
      particlePositions[p * 3 + 2] = (Math.random() - 0.5) * 16;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.038,
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    particlesRef.current = particles;

    // 9. Animation Loop with Parallax & Entrance Damping
    const clock = new THREE.Clock();
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const animate = () => {
      animFrameId.current = requestAnimationFrame(animate);

      if (!isVisibleRef.current) return;

      const elapsedTime = clock.getElapsedTime();

      // Smooth pointer parallax damping
      pointer.current.x += (pointer.current.targetX - pointer.current.x) * 0.05;
      pointer.current.y += (pointer.current.targetY - pointer.current.y) * 0.05;

      // Parallax multiplier based on motion preferences
      const parallaxFactor = prefersReducedMotion ? 0.05 : 1.0;

      // Camera Target with pointer offset
      const targetX = cameraTargetPos.current.x + pointer.current.x * 1.5 * parallaxFactor;
      const targetY = cameraTargetPos.current.y + pointer.current.y * 0.9 * parallaxFactor;
      const targetZ = cameraTargetPos.current.z;

      // Smooth camera lerp (Entrance transition + continuous parallax)
      cameraCurrentPos.current.x += (targetX - cameraCurrentPos.current.x) * 0.045;
      cameraCurrentPos.current.y += (targetY - cameraCurrentPos.current.y) * 0.045;
      cameraCurrentPos.current.z += (targetZ - cameraCurrentPos.current.z) * 0.045;

      const lookTargetX = cameraLookAtTarget.current.x + pointer.current.x * 0.45 * parallaxFactor;
      const lookTargetY = cameraLookAtTarget.current.y + pointer.current.y * 0.3 * parallaxFactor;

      cameraCurrentLookAt.current.x += (lookTargetX - cameraCurrentLookAt.current.x) * 0.045;
      cameraCurrentLookAt.current.y += (lookTargetY - cameraCurrentLookAt.current.y) * 0.045;

      camera.position.copy(cameraCurrentPos.current);
      camera.lookAt(cameraCurrentLookAt.current);

      // Central Focal Object Kinetic Rotations
      if (isRotating && centralGroupRef.current && coreMeshRef.current && innerCoreRef.current) {
        const speed = prefersReducedMotion ? 0.04 : 0.14;

        // Monolith subtle breathing and tilt
        coreMeshRef.current.rotation.y = elapsedTime * speed + pointer.current.x * 0.25;
        coreMeshRef.current.rotation.x = Math.sin(elapsedTime * 0.18) * 0.05 + pointer.current.y * 0.15;

        // Inner glowing crystal counter-rotation & luminous breathing
        innerCoreRef.current.rotation.y = -elapsedTime * speed * 2.2;
        innerCoreRef.current.rotation.x = elapsedTime * speed * 1.6;
        const pulse = 1 + Math.sin(elapsedTime * 2.4) * 0.06;
        innerCoreRef.current.scale.set(pulse, pulse, pulse);

        // Counter-rotating gimbals
        if (ring1Ref.current) ring1Ref.current.rotation.z = elapsedTime * speed * 1.8;
        if (ring2Ref.current) ring2Ref.current.rotation.z = -elapsedTime * speed * 1.4;

        // Gentle vertical levitation
        const levitation = Math.sin(elapsedTime * 1.2) * 0.06;
        centralGroupRef.current.position.y = (isMobileRef.current ? 0.4 : 0.1) + levitation;
      }

      // Micro-particles vertical drift
      if (particlesRef.current) {
        const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 1; i < particleCount * 3; i += 3) {
          positions[i] += 0.003;
          if (positions[i] > 8.5) positions[i] = -1.8;
        }
        particlesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 10. Pointer & Touch Event Handlers
    const handlePointerMove = (e: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      pointer.current.targetX = normX;
      pointer.current.targetY = normY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = mount.getBoundingClientRect();
        const normX = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        const normY = -(((touch.clientY - rect.top) / rect.height) * 2 - 1);
        pointer.current.targetX = normX * 0.7; // softer touch parallax
        pointer.current.targetY = normY * 0.7;
      }
    };

    const handleResize = () => {
      if (!mount) return;
      const newWidth = mount.clientWidth;
      const newHeight = mount.clientHeight;
      isMobileRef.current = newWidth < 768;

      if (isMobileRef.current) {
        cameraTargetPos.current.set(0, 0.8, 9.4);
        cameraLookAtTarget.current.set(0, 0, 0);
        if (centralGroupRef.current) centralGroupRef.current.position.set(0, 0.4, 0);
      } else {
        cameraTargetPos.current.set(1.6, 0.4, 7.6);
        cameraLookAtTarget.current.set(0.6, -0.1, 0);
        if (centralGroupRef.current) centralGroupRef.current.position.set(1.8, 0.1, 0);
      }

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('pointermove', handlePointerMove);
    mount.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('resize', handleResize);

    // IntersectionObserver to auto-pause rendering when scrolled away
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(mount);

    // Cleanup
    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      observer.disconnect();
      window.removeEventListener('pointermove', handlePointerMove);
      mount.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);

      // Dispose Three.js GPU resources
      floorGeo.dispose();
      floorMat.dispose();
      grid.geometry.dispose();
      (grid.material as THREE.Material).dispose();
      coreGeo.dispose();
      coreMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ring1Geo.dispose();
      ringMat1.dispose();
      ring2Geo.dispose();
      ringMat2.dispose();
      markerGeo.dispose();
      markerMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      archMeshes.forEach((m) => {
        m.geometry.dispose();
      });
      archMat.dispose();
      renderer.dispose();

      if (renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [webGLSupported]);

  // Fallback UI if WebGL is unavailable
  if (!webGLSupported) {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          minHeight: '620px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'radial-gradient(circle at 70% 50%, #0d121f 0%, #06080c 70%)',
          position: 'relative'
        }}
      >
        <svg
          width="480"
          height="480"
          viewBox="0 0 100 100"
          style={{ opacity: 0.15, transform: 'rotate(45deg)' }}
        >
          <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" fill="none" stroke="#38bdf8" strokeWidth="0.5" />
          <polygon points="50,15 80,30 80,70 50,85 20,70 20,30" fill="none" stroke="#6366f1" strokeWidth="0.5" />
        </svg>
      </div>
    );
  }

  return (
    <div
      className="hero-3d-scene-container"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'auto'
      }}
    >
      {/* Three.js Canvas Container */}
      <div
        ref={mountRef}
        style={{
          width: '100%',
          height: '100%',
          cursor: 'grab',
          touchAction: 'pan-y'
        }}
        aria-label="Interactive 3D Architectural Scene"
      />

      {/* Floating 3D HUD Telemetry (Discreet Editorial Controls) */}
      <div
        style={{
          position: 'absolute',
          bottom: '24px',
          right: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          zIndex: 10,
          pointerEvents: 'auto'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(8, 10, 15, 0.75)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)'
          }}
        >
          <span
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: '#38bdf8',
              boxShadow: '0 0 10px #38bdf8',
              display: 'inline-block'
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: '#cbd5e1',
              fontWeight: 500,
              letterSpacing: '0.04em'
            }}
          >
            3D SPATIAL PARALLAX · ACTIVE
          </span>
        </div>

        <button
          onClick={() => setIsRotating(!isRotating)}
          className="badge"
          style={{
            cursor: 'pointer',
            padding: '6px 12px',
            fontSize: '0.7rem',
            background: 'rgba(8, 10, 15, 0.75)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            color: '#f8fafc',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}
          title="Toggle rotation"
          aria-label="Toggle 3D Rotation"
        >
          <Rotate3d size={12} color="#38bdf8" />
          <span>{isRotating ? 'Active' : 'Paused'}</span>
        </button>
      </div>
    </div>
  );
};
