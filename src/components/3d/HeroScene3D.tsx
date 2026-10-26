import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Rotate3d, Layers, Bot, Database, Workflow, Terminal, Cpu } from 'lucide-react';

interface HeroScene3DProps {
  theme?: 'dark' | 'light';
}

interface OrbitNodeData {
  id: string;
  name: string;
  role: string;
  color: string;
  radius: number;
  speed: number;
  icon: 'bot' | 'db' | 'workflow' | 'terminal';
}

const ORBIT_NODES: OrbitNodeData[] = [
  {
    id: 'langgraph',
    name: 'LangGraph',
    role: 'Supervisor Agent Swarm',
    color: '#6366f1',
    radius: 2.2,
    speed: 0.7,
    icon: 'bot'
  },
  {
    id: 'chromadb',
    name: 'ChromaDB RAG',
    role: 'Vector Embeddings',
    color: '#06b6d4',
    radius: 2.9,
    speed: 0.5,
    icon: 'db'
  },
  {
    id: 'n8n',
    name: 'n8n Automations',
    role: 'Business Pipelines',
    color: '#ec4899',
    radius: 3.5,
    speed: 0.4,
    icon: 'workflow'
  },
  {
    id: 'fastapi',
    name: 'FastAPI Backend',
    role: 'Async LLM Services',
    color: '#10b981',
    radius: 4.1,
    speed: 0.3,
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
  const [isWireframe, setIsWireframe] = useState<boolean>(false);
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [activeColor, setActiveColor] = useState<string>('#6366f1');
  const [activeTelemetry, setActiveTelemetry] = useState<string>('Supervisor Orchestrating 4 Agents');
  const [nodePositions, setNodePositions] = useState<Record<string, NodeScreenPos>>({});
  const [centerPos, setCenterPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const sceneRef = useRef<THREE.Scene | null>(null);
  const coreMeshRef = useRef<THREE.Mesh | null>(null);
  const innerMeshRef = useRef<THREE.Mesh | null>(null);
  const ringsRef = useRef<THREE.Group | null>(null);
  const agentMeshesRef = useRef<THREE.Mesh[]>([]);
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
    camera.position.set(0, 0, 7.8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    rendererRef.current = renderer;

    mount.appendChild(renderer.domElement);

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x6366f1, 4, 25);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x06b6d4, 3, 25);
    pointLight2.position.set(-5, -5, -2);
    scene.add(pointLight2);

    // 3. Central Agentic Neural Core (Holographic Wireframe & Core)
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Outer Faceted Core Geometry
    const outerGeo = new THREE.IcosahedronGeometry(1.4, 2);
    const outerMat = new THREE.MeshStandardMaterial({
      color: 0x4f46e5,
      emissive: 0x312e81,
      emissiveIntensity: 0.5,
      wireframe: isWireframe,
      roughness: 0.15,
      metalness: 0.85,
      transparent: true,
      opacity: 0.75
    });
    const coreMesh = new THREE.Mesh(outerGeo, outerMat);
    coreGroup.add(coreMesh);
    coreMeshRef.current = coreMesh;

    // Inner Glowing Crystal Octahedron
    const innerGeo = new THREE.OctahedronGeometry(0.75, 0);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0x6366f1,
      emissiveIntensity: 1.2,
      roughness: 0.1,
      metalness: 0.9
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerMesh);
    innerMeshRef.current = innerMesh;

    // 4. Multi-Agent Orbital Rings & Nodes
    const ringsGroup = new THREE.Group();
    scene.add(ringsGroup);
    ringsRef.current = ringsGroup;

    const ringAngles = [
      { x: Math.PI / 4, y: Math.PI / 6, z: 0 },
      { x: -Math.PI / 3.5, y: Math.PI / 4, z: Math.PI / 10 },
      { x: Math.PI / 6, y: -Math.PI / 3, z: Math.PI / 5 },
      { x: -Math.PI / 5, y: -Math.PI / 5, z: Math.PI / 3 }
    ];

    const agentMeshes: THREE.Mesh[] = [];

    ORBIT_NODES.forEach((node, i) => {
      // Orbital Ring Tube
      const ringGeo = new THREE.RingGeometry(node.radius - 0.015, node.radius + 0.015, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(node.color),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.35
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.set(ringAngles[i].x, ringAngles[i].y, ringAngles[i].z);
      ringsGroup.add(ringMesh);

      // Orbiting Sphere
      const sphereGeo = new THREE.SphereGeometry(0.18, 20, 20);
      const sphereMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(node.color),
        emissive: new THREE.Color(node.color),
        emissiveIntensity: 0.9,
        roughness: 0.1
      });
      const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
      sphereMesh.userData = { id: node.id };
      ringsGroup.add(sphereMesh);
      agentMeshes.push(sphereMesh);
    });
    agentMeshesRef.current = agentMeshes;

    // 5. Surrounding Quantum Neural Particle Cloud
    const particleCount = 1000;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.4 + Math.random() * 4.2;
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
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 6. Vector conversion for 2D Screen Anchors
    const tempVec = new THREE.Vector3();
    let clock = new THREE.Clock();
    let lastUiUpdate = 0;

    const animate = () => {
      animFrameId.current = requestAnimationFrame(animate);

      if (!isVisibleRef.current) return;

      const elapsedTime = clock.getElapsedTime();

      // Smooth pointer parallax
      pointerPos.current.x += (pointerPos.current.targetX - pointerPos.current.x) * 0.05;
      pointerPos.current.y += (pointerPos.current.targetY - pointerPos.current.y) * 0.05;

      // Rotate Core
      if (isRotating && coreMeshRef.current && innerMeshRef.current) {
        coreMeshRef.current.rotation.x = elapsedTime * 0.2 + pointerPos.current.y * 0.4;
        coreMeshRef.current.rotation.y = elapsedTime * 0.25 + pointerPos.current.x * 0.4;

        innerMeshRef.current.rotation.x = -elapsedTime * 0.35;
        innerMeshRef.current.rotation.y = -elapsedTime * 0.45;

        // Subtle breathing scale pulse
        const scale = 1 + Math.sin(elapsedTime * 2.2) * 0.05;
        coreMeshRef.current.scale.set(scale, scale, scale);
      }

      // Rotate Rings and position agent nodes along their orbit
      if (ringsRef.current) {
        ringsRef.current.rotation.y = elapsedTime * 0.08;

        agentMeshes.forEach((mesh, idx) => {
          const node = ORBIT_NODES[idx];
          const angle = elapsedTime * node.speed + (idx * Math.PI * 2) / agentMeshes.length;
          const r = node.radius;

          // Compute 3D coordinate along tilted orbital planes
          mesh.position.x = Math.cos(angle) * r;
          mesh.position.z = Math.sin(angle) * r;
          mesh.position.y = Math.sin(angle * 1.4) * 0.8;
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
        agentMeshes.forEach((mesh, idx) => {
          mesh.getWorldPosition(tempVec);
          tempVec.project(camera);

          const isFront = tempVec.z < 1.0;
          newPositions[ORBIT_NODES[idx].id] = {
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
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();

      if (renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [isWireframe]);

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
              padding: '4px 12px',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(7, 9, 14, 0.88)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(99, 102, 241, 0.5)',
              boxShadow: '0 0 20px rgba(99, 102, 241, 0.45)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Cpu size={14} color="#818cf8" />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, color: '#f8fafc', letterSpacing: '0.06em' }}>
              AGENTIC NEURAL CORE
            </span>
          </div>
          <span style={{ fontSize: '0.65rem', color: '#818cf8', fontFamily: 'var(--font-mono)' }}>
            Orchestrating Autonomous Swarms
          </span>
        </div>
      )}

      {/* Orbiting Tech Labels Overlay (Projected 3D to 2D) */}
      {ORBIT_NODES.map((node) => {
        const pos = nodePositions[node.id];
        if (!pos || !pos.visible) return null;

        // Depth perspective calculation
        const scale = Math.max(0.78, Math.min(1.05, 1 - (pos.z - 0.5) * 0.3));
        const opacity = Math.max(0.65, Math.min(1, 1 - (pos.z - 0.5) * 0.4));

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
                backgroundColor: 'rgba(14, 18, 27, 0.92)',
                backdropFilter: 'blur(8px)',
                border: `1.5px solid ${node.color}`,
                boxShadow: `0 0 16px ${node.color}55`,
                color: '#ffffff',
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
                fontSize: '0.65rem',
                fontFamily: 'var(--font-mono)',
                color: node.color,
                marginTop: '2px',
                textShadow: '0 1px 3px rgba(0,0,0,0.8)'
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
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
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
