import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Rotate3d, Layers, Bot, Database, Workflow, Terminal, Cpu } from 'lucide-react';

interface HeroScene3DProps {
  theme?: 'dark' | 'light';
}

interface OrbitConfig {
  id: string;
  name: string;
  role: string;
  color: string;
  radius: number;
  speed: number;
  tilt: { x: number; y: number; z: number };
  icon: 'bot' | 'db' | 'workflow' | 'terminal';
}

const ORBIT_CONFIGS: OrbitConfig[] = [
  {
    id: 'langgraph',
    name: 'LangGraph',
    role: 'Supervisor Agent Swarm',
    color: '#6366f1',
    radius: 2.3,
    speed: 0.65,
    tilt: { x: 0.42, y: 0.26, z: -0.18 }, // ~24°, 15°, -10°
    icon: 'bot'
  },
  {
    id: 'chromadb',
    name: 'ChromaDB RAG',
    role: 'Vector Embeddings',
    color: '#06b6d4',
    radius: 3.0,
    speed: 0.50,
    tilt: { x: -0.58, y: 0.52, z: 0.24 }, // ~-33°, 30°, 14°
    icon: 'db'
  },
  {
    id: 'n8n',
    name: 'n8n Automations',
    role: 'Business Pipelines',
    color: '#ec4899',
    radius: 3.7,
    speed: 0.38,
    tilt: { x: 0.72, y: -0.48, z: 0.36 }, // ~41°, -27°, 21°
    icon: 'workflow'
  },
  {
    id: 'fastapi',
    name: 'FastAPI Backend',
    role: 'Async LLM Services',
    color: '#10b981',
    radius: 4.4,
    speed: 0.30,
    tilt: { x: -0.35, y: -0.65, z: -0.32 }, // ~-20°, -37°, -18°
    icon: 'terminal'
  }
];

interface NodeScreenPos {
  x: number;
  y: number;
  z: number;
  visible: boolean;
}

export const HeroScene3D: React.FC<HeroScene3DProps> = ({ theme = 'dark' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  // Default is solid outer shell (isWireframe = false) as confirmed by user
  const [isWireframe, setIsWireframe] = useState<boolean>(false);
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [activeTelemetry, setActiveTelemetry] = useState<string>('Supervisor Orchestrating 4 Agents');
  const [nodePositions, setNodePositions] = useState<Record<string, NodeScreenPos>>({});
  const [centerPos, setCenterPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const sceneRef = useRef<THREE.Scene | null>(null);
  const coreMeshRef = useRef<THREE.Mesh | null>(null);
  const innerMeshRef = useRef<THREE.Mesh | null>(null);
  const ringsGroupRef = useRef<THREE.Group | null>(null);
  const orbitNodesRef = useRef<{
    nodeMesh: THREE.Mesh;
    config: OrbitConfig;
    pulseBeads: THREE.Mesh[];
    beadOffsets: number[];
  }[]>([]);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animFrameId = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);

  // Mouse drag & parallax
  const pointerPos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 8.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    rendererRef.current = renderer;

    mount.appendChild(renderer.domElement);

    // 2. Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, theme === 'dark' ? 0.9 : 1.1);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x6366f1, 4.5, 30);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x06b6d4, 3.5, 30);
    pointLight2.position.set(-5, -5, -2);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0xec4899, 2.5, 25);
    pointLight3.position.set(0, -6, 4);
    scene.add(pointLight3);

    // 3. Central Agentic Neural Core (Faceted Crystal Core)
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Outer Faceted Core Geometry (Solid Shell by default)
    const outerGeo = new THREE.IcosahedronGeometry(1.4, 2);
    const outerMat = new THREE.MeshPhysicalMaterial({
      color: theme === 'dark' ? 0x4338ca : 0x4f46e5,
      emissive: theme === 'dark' ? 0x2e1065 : 0x312e81,
      emissiveIntensity: 0.38,
      wireframe: isWireframe,
      roughness: 0.15,
      metalness: 0.35,
      transmission: 0.32,
      thickness: 1.1,
      transparent: true,
      opacity: isWireframe ? 0.72 : 0.92,
      clearcoat: 0.85,
      clearcoatRoughness: 0.12
    });
    const coreMesh = new THREE.Mesh(outerGeo, outerMat);
    coreGroup.add(coreMesh);
    coreMeshRef.current = coreMesh;

    // Inner Glowing Crystal Octahedron
    const innerGeo = new THREE.OctahedronGeometry(0.75, 0);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0x818cf8,
      emissiveIntensity: 1.35,
      roughness: 0.12,
      metalness: 0.9
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerMesh);
    innerMeshRef.current = innerMesh;

    // 4. Strict Parametric Orbital Groups & Visible Paths
    const ringsGroup = new THREE.Group();
    scene.add(ringsGroup);
    ringsGroupRef.current = ringsGroup;

    const orbitNodes: {
      nodeMesh: THREE.Mesh;
      config: OrbitConfig;
      pulseBeads: THREE.Mesh[];
      beadOffsets: number[];
    }[] = [];

    // Sphere geometry shared
    const sphereGeo = new THREE.SphereGeometry(0.18, 24, 24);

    ORBIT_CONFIGS.forEach((config) => {
      // Create dedicated orbital plane group with exact Euler tilt
      const orbitPlane = new THREE.Group();
      orbitPlane.rotation.set(config.tilt.x, config.tilt.y, config.tilt.z);
      ringsGroup.add(orbitPlane);

      // (A) Smooth Continuous Orbital Guide Line Loop
      const lineSegments = 128;
      const ringPoints: THREE.Vector3[] = [];
      for (let s = 0; s <= lineSegments; s++) {
        const theta = (s / lineSegments) * Math.PI * 2;
        ringPoints.push(new THREE.Vector3(
          config.radius * Math.cos(theta),
          0,
          config.radius * Math.sin(theta)
        ));
      }
      const ringGeo = new THREE.BufferGeometry().setFromPoints(ringPoints);
      const ringMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(config.color),
        transparent: true,
        opacity: theme === 'dark' ? 0.42 : 0.52
      });
      const ringLine = new THREE.LineLoop(ringGeo, ringMat);
      orbitPlane.add(ringLine);

      // (B) Main Orbiting Node Sphere (locked to the orbitPlane local space)
      const sphereMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(config.color),
        emissive: new THREE.Color(config.color),
        emissiveIntensity: 1.1,
        roughness: 0.15,
        metalness: 0.5
      });
      const nodeMesh = new THREE.Mesh(sphereGeo, sphereMat);
      nodeMesh.userData = { id: config.id };
      orbitPlane.add(nodeMesh);

      // (C) Glowing Orbital Traveling Pulse Beads (Tracer Pulses)
      const beadOffsets = [-0.32, -0.62, 0.38];
      const beadSizes = [0.065, 0.05, 0.055];
      const pulseBeads: THREE.Mesh[] = [];

      beadOffsets.forEach((_, bIdx) => {
        const beadGeo = new THREE.SphereGeometry(beadSizes[bIdx], 12, 12);
        const beadMat = new THREE.MeshBasicMaterial({
          color: new THREE.Color(config.color),
          transparent: true,
          opacity: 0.85 - bIdx * 0.2
        });
        const beadMesh = new THREE.Mesh(beadGeo, beadMat);
        orbitPlane.add(beadMesh);
        pulseBeads.push(beadMesh);
      });

      orbitNodes.push({
        nodeMesh,
        config,
        pulseBeads,
        beadOffsets
      });
    });

    orbitNodesRef.current = orbitNodes;

    // 5. Surrounding Quantum Neural Particle Cloud
    const particleCount = 950;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.4 + Math.random() * 4.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);

      const color = new THREE.Color(i % 2 === 0 ? 0x6366f1 : 0x06b6d4);
      particleColors[i * 3] = color.r;
      particleColors[i * 3 + 1] = color.g;
      particleColors[i * 3 + 2] = color.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.038,
      vertexColors: true,
      transparent: true,
      opacity: theme === 'dark' ? 0.65 : 0.45,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 6. Vector conversion for 2D Screen Anchors
    const tempVec = new THREE.Vector3();
    const clock = new THREE.Clock();
    let lastUiUpdate = 0;

    const animate = () => {
      animFrameId.current = requestAnimationFrame(animate);

      if (!isVisibleRef.current) return;

      const elapsedTime = clock.getElapsedTime();

      // Smooth pointer parallax
      pointerPos.current.x += (pointerPos.current.targetX - pointerPos.current.x) * 0.05;
      pointerPos.current.y += (pointerPos.current.targetY - pointerPos.current.y) * 0.05;

      // Rotate Neural Core
      if (isRotating && coreMeshRef.current && innerMeshRef.current) {
        coreMeshRef.current.rotation.x = elapsedTime * 0.18 + pointerPos.current.y * 0.35;
        coreMeshRef.current.rotation.y = elapsedTime * 0.22 + pointerPos.current.x * 0.35;

        innerMeshRef.current.rotation.x = -elapsedTime * 0.32;
        innerMeshRef.current.rotation.y = -elapsedTime * 0.42;

        // Subtle biological breathing pulse
        const scale = 1 + Math.sin(elapsedTime * 2.2) * 0.045;
        coreMeshRef.current.scale.set(scale, scale, scale);
      }

      // Strict Parametric Position along Orbital Splines
      if (ringsGroupRef.current) {
        // Slow ambient orbital precession
        if (isRotating) {
          ringsGroupRef.current.rotation.y = elapsedTime * 0.04;
        }

        orbitNodes.forEach(({ nodeMesh, config, pulseBeads, beadOffsets }, idx) => {
          const currentAngle = isRotating
            ? elapsedTime * config.speed + idx * 1.57
            : idx * 1.57;

          // Main node strictly follows x = r * cos(t), z = r * sin(t) in the inclined plane
          nodeMesh.position.x = config.radius * Math.cos(currentAngle);
          nodeMesh.position.y = 0;
          nodeMesh.position.z = config.radius * Math.sin(currentAngle);

          // Pulse beads travel along the exact same path
          pulseBeads.forEach((bead, bIdx) => {
            const beadAngle = currentAngle + beadOffsets[bIdx];
            bead.position.x = config.radius * Math.cos(beadAngle);
            bead.position.y = 0;
            bead.position.z = config.radius * Math.sin(beadAngle);
          });
        });
      }

      // Update projected 2D coordinates for UI badges (throttled to ~30-60fps)
      if (mount && Date.now() - lastUiUpdate > 24) {
        lastUiUpdate = Date.now();
        const currentW = mount.clientWidth;
        const currentH = mount.clientHeight;

        // Center Core screen position
        tempVec.set(0, 0, 0);
        tempVec.project(camera);
        setCenterPos({
          x: (tempVec.x * 0.5 + 0.5) * currentW,
          y: (-(tempVec.y * 0.5) + 0.5) * currentH
        });

        // Orbiting nodes screen positions
        const newPositions: Record<string, NodeScreenPos> = {};
        orbitNodes.forEach(({ nodeMesh, config }) => {
          nodeMesh.getWorldPosition(tempVec);
          tempVec.project(camera);

          const isFront = tempVec.z < 1.0;
          newPositions[config.id] = {
            x: (tempVec.x * 0.5 + 0.5) * currentW,
            y: (-(tempVec.y * 0.5) + 0.5) * currentH,
            z: tempVec.z,
            visible: isFront
          };
        });
        setNodePositions(newPositions);
      }

      renderer.render(scene, camera);
    };

    animate();

    // 7. Event Handlers
    const handleResize = () => {
      if (!mount) return;
      const newWidth = mount.clientWidth;
      const newHeight = mount.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (isDragging.current) {
        const deltaX = e.clientX - previousMousePosition.current.x;
        const deltaY = e.clientY - previousMousePosition.current.y;
        if (coreGroup) {
          coreGroup.rotation.y += deltaX * 0.01;
          coreGroup.rotation.x += deltaY * 0.01;
        }
        previousMousePosition.current = { x: e.clientX, y: e.clientY };
      } else {
        const rect = mount.getBoundingClientRect();
        const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        pointerPos.current.targetX = normX;
        pointerPos.current.targetY = normY;
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      isDragging.current = true;
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = () => {
      isDragging.current = false;
    };

    mount.addEventListener('pointermove', handlePointerMove);
    mount.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('resize', handleResize);

    const observer = new IntersectionObserver(([entry]) => {
      isVisibleRef.current = entry.isIntersecting;
    }, { threshold: 0.1 });
    observer.observe(mount);

    // Cyclic status update for immersion
    const statusCycle = [
      'Supervisor: LangGraph StateGraph active',
      'Researcher: ChromaDB dense vector retrieval',
      'Coder: FastAPI microservices responding (200 OK)',
      'Reviewer: Self-correcting loop confidence 0.98'
    ];
    let statusIdx = 0;
    const interval = setInterval(() => {
      statusIdx = (statusIdx + 1) % statusCycle.length;
      setActiveTelemetry(statusCycle[statusIdx]);
    }, 4000);

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      clearInterval(interval);
      observer.disconnect();
      mount.removeEventListener('pointermove', handlePointerMove);
      mount.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('resize', handleResize);

      outerGeo.dispose();
      outerMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      sphereGeo.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();

      if (renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [isWireframe, theme]);

  const getNodeIcon = (icon: 'bot' | 'db' | 'workflow' | 'terminal') => {
    switch (icon) {
      case 'bot': return <Bot size={13} />;
      case 'db': return <Database size={13} />;
      case 'workflow': return <Workflow size={13} />;
      case 'terminal': return <Terminal size={13} />;
    }
  };

  return (
    <div className="hero-3d-wrapper" style={{ position: 'relative', width: '100%', height: '100%', minHeight: '520px', overflow: 'hidden' }}>
      {/* Three.js Canvas Container */}
      <div 
        ref={mountRef} 
        style={{ 
          width: '100%', 
          height: '100%', 
          minHeight: '520px', 
          cursor: isDragging.current ? 'grabbing' : 'grab',
          touchAction: 'none'
        }}
        aria-label="Interactive 3D Agentic Neural Core simulation"
      />

      {/* Meaningful Central Core Label Overlay */}
      {centerPos.x > 0 && (
        <div
          style={{
            position: 'absolute',
            left: `${centerPos.x}px`,
            top: `${centerPos.y}px`,
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: 12,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3px'
          }}
        >
          <div
            style={{
              padding: '5px 14px',
              borderRadius: 'var(--radius-full)',
              background: theme === 'dark' ? 'rgba(7, 9, 14, 0.94)' : 'rgba(255, 255, 255, 0.96)',
              backdropFilter: 'blur(12px)',
              border: theme === 'dark' ? '1.5px solid rgba(99, 102, 241, 0.6)' : '1.5px solid rgba(79, 70, 229, 0.65)',
              boxShadow: theme === 'dark' ? '0 0 24px rgba(99, 102, 241, 0.5)' : '0 4px 20px rgba(0, 0, 0, 0.12), 0 0 15px rgba(79, 70, 229, 0.25)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Cpu size={14} color={theme === 'dark' ? '#818cf8' : '#4f46e5'} />
            <span 
              style={{ 
                fontFamily: 'var(--font-mono)', 
                fontSize: '0.75rem', 
                fontWeight: 700, 
                color: theme === 'dark' ? '#f8fafc' : '#0a0d14', 
                letterSpacing: '0.06em' 
              }}
            >
              AGENTIC NEURAL CORE
            </span>
          </div>
          <span 
            style={{ 
              fontSize: '0.68rem', 
              color: theme === 'dark' ? '#818cf8' : '#4338ca', 
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              background: theme === 'dark' ? 'rgba(10, 14, 23, 0.85)' : 'rgba(241, 245, 249, 0.96)',
              padding: '2px 8px',
              borderRadius: 'var(--radius-full)',
              marginTop: '4px',
              border: `1px solid ${theme === 'dark' ? 'rgba(99, 102, 241, 0.35)' : 'rgba(79, 70, 229, 0.3)'}`,
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
            }}
          >
            Orchestrating Autonomous Swarms
          </span>
        </div>
      )}

      {/* Orbiting Tech Labels Overlay (Projected 3D to 2D) */}
      {ORBIT_CONFIGS.map((node) => {
        const pos = nodePositions[node.id];
        if (!pos || !pos.visible) return null;

        // Depth perspective calculation
        const scale = Math.max(0.78, Math.min(1.05, 1 - (pos.z - 0.5) * 0.3));
        const opacity = Math.max(0.72, Math.min(1, 1 - (pos.z - 0.5) * 0.45));

        return (
          <div
            key={node.id}
            style={{
              position: 'absolute',
              left: `${pos.x}px`,
              top: `${pos.y - 32}px`,
              transform: `translate(-50%, -100%) scale(${scale})`,
              opacity: opacity,
              pointerEvents: 'none',
              zIndex: pos.z < 0.5 ? 15 : 8,
              transition: 'transform 0.05s linear, opacity 0.1s linear',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 10px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: theme === 'dark' ? 'rgba(10, 14, 23, 0.94)' : 'rgba(255, 255, 255, 0.96)',
                backdropFilter: 'blur(10px)',
                border: `2px solid ${node.color}`,
                boxShadow: theme === 'dark' 
                  ? `0 0 20px ${node.color}55, 0 4px 16px rgba(0, 0, 0, 0.5)`
                  : `0 4px 16px rgba(0, 0, 0, 0.12), 0 0 12px ${node.color}35`,
                color: theme === 'dark' ? '#ffffff' : '#0a0d14',
                fontSize: '0.75rem',
                fontWeight: 700,
                whiteSpace: 'nowrap'
              }}
            >
              <span style={{ color: node.color }}>{getNodeIcon(node.icon)}</span>
              <span>{node.name}</span>
            </div>
            <span
              style={{
                fontSize: '0.68rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                color: theme === 'dark' ? node.color : '#0a0d14',
                backgroundColor: theme === 'dark' ? 'rgba(15, 23, 42, 0.88)' : 'rgba(241, 245, 249, 0.96)',
                padding: '2px 8px',
                borderRadius: 'var(--radius-full)',
                border: `1px solid ${node.color}70`,
                marginTop: '4px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            >
              {node.role}
            </span>
          </div>
        );
      })}

      {/* Floating 3D Control Bar */}
      <div 
        className="glass-panel"
        style={{
          position: 'absolute',
          bottom: '16px',
          left: '16px',
          right: '16px',
          padding: '10px 16px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          zIndex: 20,
          borderRadius: 'var(--radius-md)',
          background: 'var(--bg-glass-card)'
        }}
      >
        {/* Live Swarm Telemetry */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span 
            style={{ 
              width: '8px', 
              height: '8px', 
              borderRadius: '50%', 
              backgroundColor: '#10b981',
              boxShadow: '0 0 10px #10b981',
              display: 'inline-block'
            }} 
          />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-primary)', fontWeight: 600 }}>
            {activeTelemetry}
          </span>
        </div>

        {/* 3D Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Wireframe toggle */}
          <button
            onClick={() => setIsWireframe(!isWireframe)}
            className={`badge ${isWireframe ? 'badge-primary' : ''}`}
            style={{ cursor: 'pointer', padding: '4px 10px', fontSize: '0.7rem' }}
            title="Toggle Wireframe Shell"
            aria-label="Toggle 3D Wireframe"
          >
            <Layers size={12} />
            {isWireframe ? 'Solid Shell' : 'Wireframe'}
          </button>

          {/* Spin Toggle */}
          <button
            onClick={() => setIsRotating(!isRotating)}
            className="badge"
            style={{ cursor: 'pointer', padding: '4px 10px', fontSize: '0.7rem' }}
            title="Pause/Resume Orbit Rotation"
            aria-label="Toggle Orbit Rotation"
          >
            <Rotate3d size={12} />
            {isRotating ? 'Active Orbit' : 'Orbit Paused'}
          </button>
        </div>
      </div>
    </div>
  );
};
