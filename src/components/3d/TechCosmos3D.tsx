import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Cpu, Terminal, RefreshCw } from 'lucide-react';

interface TechNode {
  name: string;
  category: 'AI & LLM' | 'Automation' | 'Backend' | 'Frontend' | 'Databases';
  color: string;
  desc: string;
}

const TECH_ITEMS: TechNode[] = [
  { name: 'LangGraph', category: 'AI & LLM', color: '#6366f1', desc: 'Cyclic multi-agent state machines, human-in-the-loop, & supervisor swarms' },
  { name: 'LangChain', category: 'AI & LLM', color: '#818cf8', desc: 'LLM tool chaining, prompt management, and document loaders' },
  { name: 'RAG Systems', category: 'AI & LLM', color: '#06b6d4', desc: 'Self-correcting, semantic chunking, and multi-modal vector search' },
  { name: 'ChromaDB', category: 'AI & LLM', color: '#22d3ee', desc: 'High-speed embeddings persistence and hybrid dense retrieval' },
  { name: 'Ollama & Mistral', category: 'AI & LLM', color: '#a855f7', desc: 'Local open-weights inference and privacy-preserving LLM backends' },
  { name: 'n8n', category: 'Automation', color: '#ec4899', desc: 'Self-hosted business workflow pipelines, webhooks, and AI agent nodes' },
  { name: 'GoHighLevel', category: 'Automation', color: '#f43f5e', desc: 'End-to-end CRM lead generation, calendar sync, and phone AI bots' },
  { name: 'FastAPI', category: 'Backend', color: '#10b981', desc: 'Asynchronous Python microservices, Pydantic validation, and WebSockets' },
  { name: 'Python', category: 'Backend', color: '#34d399', desc: 'Core language for AI algorithms, data pipelines, and automation scripts' },
  { name: 'Node.js', category: 'Backend', color: '#84cc16', desc: 'Event-driven server runtime, REST APIs, and JWT authentication' },
  { name: 'React & Next.js', category: 'Frontend', color: '#38bdf8', desc: 'Modern reactive component architecture, SSR/SSG, and responsive UI' },
  { name: 'Flutter', category: 'Frontend', color: '#0284c7', desc: 'Cross-platform mobile applications published on Google Play' },
  { name: 'TypeScript', category: 'Frontend', color: '#60a5fa', desc: 'Strict static type safety across modern enterprise full-stack apps' },
  { name: 'Docker', category: 'Databases', color: '#2563eb', desc: 'Containerized deployment for LLM engines, APIs, and microservices' },
  { name: 'PostgreSQL & SQLite', category: 'Databases', color: '#d946ef', desc: 'Relational data stores, ACID compliance, and offline-first clinic storage' },
  { name: 'Web Speech API', category: 'AI & LLM', color: '#f59e0b', desc: 'Real-time duplex voice agents for receptionists and call centers' }
];

export const TechCosmos3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedTech, setSelectedTech] = useState<TechNode>(TECH_ITEMS[0]);
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cosmosGroupRef = useRef<THREE.Group | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animFrameId = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);

  const isDragging = useRef(false);
  const prevMouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 5.2;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    mount.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const cosmosGroup = new THREE.Group();
    scene.add(cosmosGroup);
    cosmosGroupRef.current = cosmosGroup;

    // Distribute nodes evenly on sphere using Fibonacci Spiral algorithm
    const nodesCount = TECH_ITEMS.length;
    const radius = 2.0;
    const sphereGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const nodeMeshes: THREE.Mesh[] = [];

    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden ratio angle

    for (let i = 0; i < nodesCount; i++) {
      const y = 1 - (i / (nodesCount - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      const tech = TECH_ITEMS[i];
      const mat = new THREE.MeshStandardMaterial({
        color: tech.color,
        emissive: tech.color,
        emissiveIntensity: 0.6,
        roughness: 0.2
      });

      const mesh = new THREE.Mesh(sphereGeo, mat);
      mesh.position.set(x * radius, y * radius, z * radius);
      mesh.userData = { techIndex: i };
      cosmosGroup.add(mesh);
      nodeMeshes.push(mesh);
    }

    // Connect nodes with subtle lines
    const linePositions: number[] = [];
    for (let i = 0; i < nodesCount; i++) {
      for (let j = i + 1; j < nodesCount; j++) {
        const p1 = nodeMeshes[i].position;
        const p2 = nodeMeshes[j].position;
        const dist = p1.distanceTo(p2);
        if (dist < 1.6) {
          linePositions.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
        }
      }
    }

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.22
    });
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    cosmosGroup.add(lines);

    // Orbit Animation
    let clock = new THREE.Clock();

    const animate = () => {
      animFrameId.current = requestAnimationFrame(animate);
      if (!isVisibleRef.current) return;

      const delta = clock.getDelta();
      if (!isDragging.current && cosmosGroupRef.current) {
        cosmosGroupRef.current.rotation.y += delta * 0.25;
        cosmosGroupRef.current.rotation.x += delta * 0.08;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Raycasting for interactive node click
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerDown = (e: PointerEvent) => {
      isDragging.current = true;
      prevMouse.current = { x: e.clientX, y: e.clientY };

      const rect = mount.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodeMeshes);
      if (intersects.length > 0) {
        const techIdx = intersects[0].object.userData.techIndex;
        if (techIdx !== undefined && TECH_ITEMS[techIdx]) {
          setSelectedTech(TECH_ITEMS[techIdx]);
        }
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      const deltaX = e.clientX - prevMouse.current.x;
      const deltaY = e.clientY - prevMouse.current.y;

      if (cosmosGroupRef.current) {
        cosmosGroupRef.current.rotation.y += deltaX * 0.008;
        cosmosGroupRef.current.rotation.x += deltaY * 0.008;
      }

      prevMouse.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = () => {
      isDragging.current = false;
    };

    const handleResize = () => {
      if (!mount) return;
      const newWidth = mount.clientWidth;
      const newHeight = mount.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    mount.addEventListener('pointerdown', handlePointerDown);
    mount.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('resize', handleResize);

    const observer = new IntersectionObserver(([entry]) => {
      isVisibleRef.current = entry.isIntersecting;
    }, { threshold: 0.1 });
    observer.observe(mount);

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      observer.disconnect();
      mount.removeEventListener('pointerdown', handlePointerDown);
      mount.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('resize', handleResize);

      sphereGeo.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      renderer.dispose();
      if (renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  const categories = ['All', 'AI & LLM', 'Automation', 'Backend', 'Frontend', 'Databases'];
  const filteredTech = filterCategory === 'All' 
    ? TECH_ITEMS 
    : TECH_ITEMS.filter(t => t.category === filterCategory);

  return (
    <div className="glass-panel" style={{ padding: '24px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '20px' }}>
        <div>
          <span className="section-eyebrow">Interactive 3D Skill Cosmos</span>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)' }}>Technology Constellation</h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 450, marginTop: '4px' }}>
            Click any node or drag to rotate the 3D tech cosmos
          </p>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {categories.map((cat) => {
            const isSelected = filterCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`badge ${isSelected ? 'badge-primary' : ''}`}
                style={{
                  cursor: 'pointer',
                  padding: '6px 14px',
                  fontSize: '0.78rem',
                  fontWeight: isSelected ? 700 : 600,
                  border: '1px solid var(--border-default)',
                  backgroundColor: isSelected ? 'var(--accent-muted)' : 'var(--surface-1)',
                  color: isSelected ? 'var(--accent)' : 'var(--text-primary)'
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', alignItems: 'center' }}>
        {/* Three.js Cosmos Canvas */}
        <div 
          ref={mountRef} 
          style={{ 
            width: '100%', 
            height: '340px', 
            borderRadius: 'var(--radius-md)', 
            cursor: 'grab', 
            touchAction: 'none',
            background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.08) 0%, transparent 70%)'
          }} 
          aria-label="3D Technology spherical graph"
        />

        {/* Selected Technology Inspector Card */}
        <div 
          className="glass-card" 
          style={{ 
            padding: '24px', 
            borderRadius: 'var(--radius-lg)', 
            border: `1px solid ${selectedTech.color}40`,
            background: 'var(--bg-glass-card)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <span 
              className="badge" 
              style={{ 
                backgroundColor: `${selectedTech.color}20`, 
                color: selectedTech.color,
                borderColor: `${selectedTech.color}50`,
                fontWeight: 700
              }}
            >
              {selectedTech.category}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: selectedTech.color }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Interactive Node</span>
            </div>
          </div>

          <h4 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
            {selectedTech.name}
          </h4>

          <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', fontWeight: 450, lineHeight: 1.65, marginBottom: '20px' }}>
            {selectedTech.desc}
          </p>

          {/* Quick Skill Selector Grid */}
          <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '14px' }}>
            <p style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
              DIRECT SELECTOR:
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', maxHeight: '110px', overflowY: 'auto' }}>
              {filteredTech.map((t) => (
                <button
                  key={t.name}
                  onClick={() => setSelectedTech(t)}
                  style={{
                    padding: '5px 11px',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: selectedTech.name === t.name ? 700 : 600,
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: selectedTech.name === t.name ? t.color : 'var(--surface-2)',
                    color: selectedTech.name === t.name ? '#ffffff' : 'var(--text-primary)',
                    border: '1px solid var(--border-default)',
                    cursor: 'pointer'
                  }}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
