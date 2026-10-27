import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { 
  Bot, 
  Workflow, 
  Zap, 
  Terminal, 
  Database, 
  Sparkles, 
  Layers, 
  Cpu, 
  CheckCircle2, 
  Rotate3d,
  ArrowRight,
  Maximize2
} from 'lucide-react';

export type TechClusterId = 'all' | 'ai' | 'n8n' | 'ghl' | 'backend';

export interface TechTool {
  id: string;
  name: string;
  shortName: string;
  clusterId: 'ai' | 'n8n' | 'ghl' | 'backend';
  role: string;
  productionUseCase: string;
  offset: [number, number, number];
  connectedTo: string[];
}

export interface ClusterInfo {
  id: 'ai' | 'n8n' | 'ghl' | 'backend';
  name: string;
  hubName: string;
  color: string;
  secondaryColor: string;
  center: [number, number, number];
  summary: string;
  productionImpact: string;
}

export const CLUSTERS: Record<'ai' | 'n8n' | 'ghl' | 'backend', ClusterInfo> = {
  ai: {
    id: 'ai',
    name: 'Agentic AI & Swarms',
    hubName: 'LangGraph Multi-Agent Core',
    color: '#B3A0C9',
    secondaryColor: '#CBBCE0',
    center: [-2.9, 1.4, 0.3],
    summary: 'Cyclic stateful graphs, autonomous supervisor swarms, and self-correcting RAG systems.',
    productionImpact: 'Orchestrating autonomous code reviews, research pipelines, and enterprise knowledge agents.'
  },
  n8n: {
    id: 'n8n',
    name: 'n8n Automations',
    hubName: 'n8n Orchestration Core',
    color: '#B58D68',
    secondaryColor: '#CCA582',
    center: [2.9, 1.4, -0.3],
    summary: 'Mission-critical webhook pipelines, multi-branch routing, and AI tool integrations.',
    productionImpact: 'Powering automated client onboarding, Telegram swarms, and multi-channel marketing engines.'
  },
  ghl: {
    id: 'ghl',
    name: 'GoHighLevel (GHL)',
    hubName: 'GHL CRM Architecture',
    color: '#C49A45',
    secondaryColor: '#D8B062',
    center: [2.7, -1.8, 0.3],
    summary: 'Full-funnel client acquisition, two-way conversational AI bots, and automated pipeline ops.',
    productionImpact: 'Running complete dental clinic patient funnels, instant Twilio call routing, and automated calendar sync.'
  },
  backend: {
    id: 'backend',
    name: 'Full-Stack & Backend',
    hubName: 'FastAPI Cloud Platform',
    color: '#7A9A8B',
    secondaryColor: '#96B2A5',
    center: [-2.7, -1.8, -0.3],
    summary: 'High-throughput async Python microservices, TypeScript frontends, and containerized scale.',
    productionImpact: 'Serving sub-50ms vector embeddings, real-time WebSockets, and HIPAA-ready multi-tenant databases.'
  }
};

export const TECH_TOOLS: TechTool[] = [
  // 1. Agentic AI & Swarms
  {
    id: 'langgraph-graphs',
    name: 'LangGraph Stateful Graphs',
    shortName: 'LangGraph Graphs',
    clusterId: 'ai',
    role: 'Cyclic multi-agent workflows with state persistence, checkpointing, and human-in-the-loop validation.',
    productionUseCase: 'Autonomous multi-agent research swarms with self-reflection and execution rollback capabilities.',
    offset: [1.3, 0.45, 0.1],
    connectedTo: ['Multi-Agent Supervisors', 'ChromaDB Dense Search', 'Claude / OpenAI / Ollama']
  },
  {
    id: 'chromadb-search',
    name: 'ChromaDB Dense Vector Search',
    shortName: 'ChromaDB Vector RAG',
    clusterId: 'ai',
    role: 'High-speed persistent embeddings storage with semantic chunking and hybrid dense retrieval.',
    productionUseCase: 'Sub-50ms retrieval across 50,000+ medical and technical documents with source citations.',
    offset: [0.55, 1.35, -0.2],
    connectedTo: ['LangGraph Stateful Graphs', 'Claude / OpenAI / Ollama']
  },
  {
    id: 'multi-agent-supervisors',
    name: 'Multi-Agent Supervisors',
    shortName: 'Supervisor Swarms',
    clusterId: 'ai',
    role: 'Hierarchical task routing, consensus voting, and specialized agent delegation.',
    productionUseCase: 'Coordinating specialized Researcher, Coder, and QA Reviewer agents to generate verified deliverables.',
    offset: [-0.95, 1.15, 0.25],
    connectedTo: ['LangGraph Stateful Graphs', 'Automated Validation & Fallbacks']
  },
  {
    id: 'llm-foundation-apis',
    name: 'Ollama / Claude / OpenAI APIs',
    shortName: 'LLM Foundation APIs',
    clusterId: 'ai',
    role: 'Hybrid multi-model routing balancing privacy-preserving local weights with frontier reasoning models.',
    productionUseCase: 'Offline local inference using Ollama & Mistral with dynamic cloud fallback to Claude 3.5 Sonnet.',
    offset: [-1.35, -0.4, -0.15],
    connectedTo: ['ChromaDB Dense Vector Search', 'LangGraph Stateful Graphs']
  },
  {
    id: 'automated-validation',
    name: 'Automated Validation & Fallbacks',
    shortName: 'Self-Correcting RAG',
    clusterId: 'ai',
    role: 'Hallucination scoring, self-correcting validation loops, and automated query rewriting.',
    productionUseCase: '98% extraction accuracy on unformatted PDF patient intake records with zero human intervention.',
    offset: [0.1, -1.35, 0.2],
    connectedTo: ['Multi-Agent Supervisors', 'FastAPI Async Microservices']
  },

  // 2. n8n Automations
  {
    id: 'n8n-multibranch',
    name: 'Complex Multi-Branch Workflows',
    shortName: 'Branching Pipelines',
    clusterId: 'n8n',
    role: 'Conditional logic routing, parallel execution branches, and robust error interceptors.',
    productionUseCase: 'Enterprise lead dispatching across 5 marketing channels with automatic duplicate deduplication.',
    offset: [-1.25, 0.5, 0.2],
    connectedTo: ['API Webhooks & Real-time Triggers', 'Custom Python/JS Code Nodes']
  },
  {
    id: 'n8n-webhooks',
    name: 'API Webhooks & Real-time Triggers',
    shortName: 'Webhooks & Triggers',
    clusterId: 'n8n',
    role: 'Event-driven ingestion from Typeform, Stripe, GitHub, and custom webhooks with sub-second firing.',
    productionUseCase: 'Instant client account provisioning, billing webhook processing, and digital invoice generation.',
    offset: [-0.55, 1.35, -0.2],
    connectedTo: ['Lead Ingestion & Webhooks (GHL)', 'Telegram & Slack Swarm Alerts']
  },
  {
    id: 'n8n-code-nodes',
    name: 'Custom Python & JS Code Nodes',
    shortName: 'Python & JS Nodes',
    clusterId: 'n8n',
    role: 'In-memory data transformations, regex parsing, cryptographic hashing, and custom schema validation.',
    productionUseCase: 'Normalizing heterogeneous JSON payloads from 3 legacy CRMs into unified relational schema.',
    offset: [0.9, 1.15, 0.15],
    connectedTo: ['Complex Multi-Branch Workflows', 'LangChain & LLM Connectors']
  },
  {
    id: 'n8n-ai-connectors',
    name: 'LangChain & LLM Connectors',
    shortName: 'n8n AI Agents',
    clusterId: 'n8n',
    role: 'Autonomous AI agent nodes embedded directly inside visual workflow canvases.',
    productionUseCase: 'Automated customer ticket triage with AI sentiment analysis and auto-drafted personalized replies.',
    offset: [1.35, -0.4, -0.25],
    connectedTo: ['LangGraph Stateful Graphs', 'Telegram & Slack Swarm Alerts']
  },
  {
    id: 'n8n-telegram-slack',
    name: 'Telegram & Slack Swarm Alerts',
    shortName: 'Swarm Bot Alerts',
    clusterId: 'n8n',
    role: 'Interactive notification bots with inline approval buttons for human-in-the-loop authorization.',
    productionUseCase: 'Executive Slack approval requests before dispatching high-budget outbound marketing campaigns.',
    offset: [0.2, -1.35, 0.25],
    connectedTo: ['Complex Multi-Branch Workflows', 'Postman & REST Polling']
  },
  {
    id: 'n8n-rest-polling',
    name: 'Postman & REST Polling',
    shortName: 'REST Polling Sync',
    clusterId: 'n8n',
    role: 'Scheduled delta synchronization, rate-limited polling, and automated API health verification.',
    productionUseCase: 'Nightly incremental sync between client PostgreSQL databases and Google Cloud BigQuery.',
    offset: [-0.95, -1.05, -0.15],
    connectedTo: ['FastAPI Async Microservices', 'Custom Python & JS Code Nodes']
  },

  // 3. GoHighLevel (GHL) Ecosystem
  {
    id: 'ghl-lead-ingestion',
    name: 'Lead Ingestion & Webhooks',
    shortName: 'GHL Lead Ingestion',
    clusterId: 'ghl',
    role: 'Multi-source capture from Facebook Lead Ads, Webhook forms, landing pages, and native surveys.',
    productionUseCase: 'Multi-channel attribution tracking and instantaneous lead routing to sales representatives.',
    offset: [-1.25, 0.45, -0.2],
    connectedTo: ['Pipeline Automations', 'Twilio SMS & Calling']
  },
  {
    id: 'ghl-pipeline-automations',
    name: 'Opportunity Pipeline Automations',
    shortName: 'Pipeline Automations',
    clusterId: 'ghl',
    role: 'Multi-stage pipeline movements, automated task assignments, dynamic client tagging, and lead scoring.',
    productionUseCase: 'Dental clinic patient booking journey: automated intake, reminder sequences, and post-care follow-up.',
    offset: [-0.6, 1.35, 0.2],
    connectedTo: ['Lead Ingestion & Webhooks', 'Calendar Booking Engines']
  },
  {
    id: 'ghl-ai-voice-chat',
    name: 'AI Voice & Duplex Chat Agents',
    shortName: 'AI Voice & Chat',
    clusterId: 'ghl',
    role: '24/7 conversational receptionists for inbound phone calls and website duplex chat widgets.',
    productionUseCase: 'Real-time appointment scheduling over conversational phone calls with instant calendar booking.',
    offset: [0.85, 1.15, -0.15],
    connectedTo: ['Twilio SMS & Calling', 'Calendar Booking Engines']
  },
  {
    id: 'ghl-twilio-telephony',
    name: 'Twilio SMS & Call Tracking',
    shortName: 'Twilio Telephony',
    clusterId: 'ghl',
    role: 'A2P 10DLC verified messaging, call recording, dynamic number pools, and missed-call text-backs.',
    productionUseCase: 'Sub-60-second automated response to incoming leads, increasing consultation conversions by 40%.',
    offset: [1.35, -0.4, 0.2],
    connectedTo: ['AI Voice & Duplex Chat Agents', 'CRM Custom Workflows']
  },
  {
    id: 'ghl-crm-workflows',
    name: 'CRM Custom Workflows',
    shortName: 'Custom Workflows',
    clusterId: 'ghl',
    role: 'Custom fields, trigger links, multi-conditional if/else branches, and automated review campaigns.',
    productionUseCase: 'Automated 5-star Google Review generation pipeline for healthcare practices post-treatment.',
    offset: [0.2, -1.35, -0.25],
    connectedTo: ['Opportunity Pipeline Automations', 'Calendar Booking Engines']
  },
  {
    id: 'ghl-calendar-sync',
    name: 'Calendar Booking Engines',
    shortName: 'Calendar Sync',
    clusterId: 'ghl',
    role: 'Two-way Google/Outlook calendar synchronization, round-robin team assignment, and timezone auto-adjust.',
    productionUseCase: 'Zero double-booking guarantee for multi-practitioner clinics with automated SMS/email reminders.',
    offset: [-0.9, -1.05, 0.15],
    connectedTo: ['Opportunity Pipeline Automations', 'Lead Ingestion & Webhooks']
  },

  // 4. Full-Stack & Backend
  {
    id: 'backend-fastapi',
    name: 'FastAPI Async Microservices',
    shortName: 'FastAPI Microservices',
    clusterId: 'backend',
    role: 'High-throughput asynchronous Python endpoints with Pydantic type safety, OpenAPI specs, and WebSockets.',
    productionUseCase: 'Serving low-latency RAG vector embeddings and streaming LLM token generation to client frontends.',
    offset: [1.25, 0.45, 0.2],
    connectedTo: ['Python Core & Algorithms', 'Supabase & PostgreSQL']
  },
  {
    id: 'backend-python-core',
    name: 'Python Core & Algorithms',
    shortName: 'Python Core',
    clusterId: 'backend',
    role: 'Asyncio concurrency, custom data structures, vector math operations, and automated daemons.',
    productionUseCase: 'High-performance batch processing pipelines handling multi-gigabyte log parsing and vector indexing.',
    offset: [0.65, 1.35, -0.2],
    connectedTo: ['FastAPI Async Microservices', 'Docker Containerization']
  },
  {
    id: 'backend-react-next',
    name: 'React, Next.js & TypeScript',
    shortName: 'React & TypeScript',
    clusterId: 'backend',
    role: 'Type-safe reactive component architectures, server-side rendering, and responsive modern glass interfaces.',
    productionUseCase: 'Production web applications, interactive 3D WebGL dashboards, and enterprise client portals.',
    offset: [-0.75, 1.2, 0.25],
    connectedTo: ['FastAPI Async Microservices', 'Supabase & PostgreSQL']
  },
  {
    id: 'backend-postgres-supabase',
    name: 'Supabase & PostgreSQL',
    shortName: 'Postgres & Supabase',
    clusterId: 'backend',
    role: 'Relational databases, row-level security (RLS), ACID transactions, and pgvector extension queries.',
    productionUseCase: 'Multi-tenant healthcare databases with encrypted patient storage and real-time live subscriptions.',
    offset: [-1.3, -0.4, -0.15],
    connectedTo: ['FastAPI Async Microservices', 'Docker Containerization']
  },
  {
    id: 'backend-docker-cloud',
    name: 'Docker Containerization',
    shortName: 'Docker & Cloud',
    clusterId: 'backend',
    role: 'Multi-stage Docker container builds, docker-compose swarms, and reproducible cloud deployments.',
    productionUseCase: 'One-command production deployment of self-hosted LLM inference engines, n8n, and FastAPI backends.',
    offset: [-0.1, -1.35, 0.2],
    connectedTo: ['FastAPI Async Microservices', 'Supabase & PostgreSQL']
  }
];

interface TechCosmos3DProps {
  theme?: 'dark' | 'light';
}

interface NodeScreenPosition {
  x: number;
  y: number;
  z: number;
  visible: boolean;
  name: string;
  clusterColor: string;
  isHub?: boolean;
}

export const TechCosmos3D: React.FC<TechCosmos3DProps> = ({ theme = 'dark' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeCluster, setActiveCluster] = useState<TechClusterId>('all');
  const [selectedTool, setSelectedTool] = useState<TechTool>(TECH_TOOLS[0]);
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [screenNodes, setScreenNodes] = useState<Record<string, NodeScreenPosition>>({});

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animFrameId = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);

  // Smooth Camera Target Lerp
  const targetCamPos = useRef(new THREE.Vector3(0, 0.2, 8.4));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const currentCamPos = useRef(new THREE.Vector3(0, 0.2, 8.4));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  // Meshes & Materials refs for dynamic opacity/highlighting
  const hubMeshesRef = useRef<Record<string, { mesh: THREE.Mesh; ring: THREE.Mesh; mat: THREE.MeshStandardMaterial }>>({});
  const toolMeshesRef = useRef<Record<string, { mesh: THREE.Mesh; mat: THREE.MeshStandardMaterial; tool: TechTool }>>({});
  const intraLinesRef = useRef<Record<string, THREE.LineSegments>>({});
  const interLinesRef = useRef<THREE.LineSegments | null>(null);

  // Pointer drag controls
  const isDragging = useRef(false);
  const prevMouse = useRef({ x: 0, y: 0 });
  const orbitGroupRef = useRef<THREE.Group | null>(null);

  // Sync camera targets when activeCluster changes
  useEffect(() => {
    if (activeCluster === 'all') {
      targetCamPos.current.set(0, 0.2, 8.4);
      targetLookAt.current.set(0, 0, 0);
    } else {
      const c = CLUSTERS[activeCluster];
      targetLookAt.current.set(c.center[0], c.center[1], c.center[2]);
      // Zoom in directly to the cluster
      targetCamPos.current.set(c.center[0], c.center[1], 4.2);

      // Default selected tool to first tool in this cluster
      const firstInCluster = TECH_TOOLS.find(t => t.clusterId === activeCluster);
      if (firstInCluster) setSelectedTool(firstInCluster);
    }
  }, [activeCluster]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(46, width / height, 0.1, 100);
    camera.position.set(0, 0.2, 8.4);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true, 
      powerPreference: 'high-performance' 
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    rendererRef.current = renderer;

    mount.appendChild(renderer.domElement);

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, theme === 'dark' ? 1.0 : 1.25);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight1.position.set(5, 10, 7);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xb58d68, 1.2);
    dirLight2.position.set(-6, -4, 4);
    scene.add(dirLight2);

    // 3. Main World Group (holds clusters)
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);
    orbitGroupRef.current = worldGroup;

    // Shared Geometries
    const hubGeo = new THREE.SphereGeometry(0.26, 24, 24);
    const hubRingGeo = new THREE.RingGeometry(0.36, 0.39, 32);
    const toolGeo = new THREE.SphereGeometry(0.15, 20, 20);

    const hubMeshes: Record<string, { mesh: THREE.Mesh; ring: THREE.Mesh; mat: THREE.MeshStandardMaterial }> = {};
    const toolMeshes: Record<string, { mesh: THREE.Mesh; mat: THREE.MeshStandardMaterial; tool: TechTool }> = {};
    const intraLines: Record<string, THREE.LineSegments> = {};

    // 4. Build 4 Clusters with Hubs & Tools
    (Object.keys(CLUSTERS) as ('ai' | 'n8n' | 'ghl' | 'backend')[]).forEach((cId) => {
      const cluster = CLUSTERS[cId];
      const clusterGroup = new THREE.Group();
      clusterGroup.position.set(cluster.center[0], cluster.center[1], cluster.center[2]);
      worldGroup.add(clusterGroup);

      // (A) Central Cluster Hub Node
      const hubMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(cluster.color),
        emissive: new THREE.Color(cluster.color),
        emissiveIntensity: 1.1,
        roughness: 0.15,
        metalness: 0.7,
        transparent: true,
        opacity: 0.95
      });
      const hubMesh = new THREE.Mesh(hubGeo, hubMat);
      hubMesh.userData = { isHub: true, clusterId: cId, name: cluster.hubName };
      clusterGroup.add(hubMesh);

      // Orbiting decorative halo ring
      const ringMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(cluster.secondaryColor),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.45
      });
      const ringMesh = new THREE.Mesh(hubRingGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 3;
      clusterGroup.add(ringMesh);

      hubMeshes[cId] = { mesh: hubMesh, ring: ringMesh, mat: hubMat };

      // (B) Satellite Tool Nodes
      const clusterTools = TECH_TOOLS.filter((t) => t.clusterId === cId);
      const linePositions: number[] = [];

      clusterTools.forEach((tool) => {
        const toolMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(cluster.color),
          emissive: new THREE.Color(cluster.color),
          emissiveIntensity: 0.75,
          roughness: 0.2,
          metalness: 0.5,
          transparent: true,
          opacity: 0.95
        });
        const toolMesh = new THREE.Mesh(toolGeo, toolMat);
        toolMesh.position.set(tool.offset[0], tool.offset[1], tool.offset[2]);
        toolMesh.userData = { toolId: tool.id, isTool: true, name: tool.name };
        clusterGroup.add(toolMesh);

        toolMeshes[tool.id] = { mesh: toolMesh, mat: toolMat, tool };

        // Connect Hub (0,0,0) to Tool Node
        linePositions.push(0, 0, 0, tool.offset[0], tool.offset[1], tool.offset[2]);
      });

      // Intra-cluster lines
      const lineGeo = new THREE.BufferGeometry();
      lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
      const lineMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(cluster.color),
        transparent: true,
        opacity: 0.35
      });
      const lines = new THREE.LineSegments(lineGeo, lineMat);
      clusterGroup.add(lines);
      intraLines[cId] = lines;
    });

    hubMeshesRef.current = hubMeshes;
    toolMeshesRef.current = toolMeshes;
    intraLinesRef.current = intraLines;

    // 5. Inter-Cluster Production Architecture Lines (Bridges)
    const bridgePositions: number[] = [];
    // ai -> backend
    bridgePositions.push(...CLUSTERS.ai.center, ...CLUSTERS.backend.center);
    // ai -> n8n
    bridgePositions.push(...CLUSTERS.ai.center, ...CLUSTERS.n8n.center);
    // n8n -> ghl
    bridgePositions.push(...CLUSTERS.n8n.center, ...CLUSTERS.ghl.center);
    // ghl -> backend
    bridgePositions.push(...CLUSTERS.ghl.center, ...CLUSTERS.backend.center);

    const bridgeGeo = new THREE.BufferGeometry();
    bridgeGeo.setAttribute('position', new THREE.Float32BufferAttribute(bridgePositions, 3));
    const bridgeMat = new THREE.LineBasicMaterial({
      color: 0xb58d68,
      transparent: true,
      opacity: 0.25
    });
    const bridgeSegments = new THREE.LineSegments(bridgeGeo, bridgeMat);
    worldGroup.add(bridgeSegments);
    interLinesRef.current = bridgeSegments;

    // 6. Animation Loop
    const clock = new THREE.Clock();
    const tempVec = new THREE.Vector3();
    let lastUiUpdate = 0;

    const animate = () => {
      animFrameId.current = requestAnimationFrame(animate);

      if (!isVisibleRef.current) return;

      const elapsedTime = clock.getElapsedTime();

      // Smooth Camera Lerping to Focus Target
      currentCamPos.current.lerp(targetCamPos.current, 0.055);
      currentLookAt.current.lerp(targetLookAt.current, 0.055);
      camera.position.copy(currentCamPos.current);
      camera.lookAt(currentLookAt.current);

      // Subtle ambient orbital drift when idling
      if (isRotating && !isDragging.current && worldGroup) {
        if (activeCluster === 'all') {
          worldGroup.rotation.y = elapsedTime * 0.08;
          worldGroup.rotation.x = Math.sin(elapsedTime * 0.05) * 0.04;
        } else {
          // In focused cluster, gentle breathing movement
          worldGroup.rotation.y = Math.sin(elapsedTime * 0.2) * 0.06;
          worldGroup.rotation.x = Math.cos(elapsedTime * 0.18) * 0.04;
        }
      }

      // Rotate Hub Halo Rings
      Object.keys(hubMeshes).forEach((cId) => {
        const { ring, mesh } = hubMeshes[cId];
        ring.rotation.z = elapsedTime * 0.5;
        // Pulse hub scale
        const s = 1 + Math.sin(elapsedTime * 2.5 + (cId === 'ai' ? 0 : 1)) * 0.04;
        mesh.scale.set(s, s, s);
      });

      // Harmonic harmonic floating for tool nodes
      TECH_TOOLS.forEach((tool, i) => {
        const tm = toolMeshes[tool.id];
        if (tm) {
          const oscY = Math.sin(elapsedTime * 1.6 + i * 0.8) * 0.06;
          const oscX = Math.cos(elapsedTime * 1.3 + i * 0.7) * 0.05;
          tm.mesh.position.y = tool.offset[1] + oscY;
          tm.mesh.position.x = tool.offset[0] + oscX;
        }
      });

      // Dynamic Focus: Dim inactive clusters, highlight active cluster
      (Object.keys(CLUSTERS) as ('ai' | 'n8n' | 'ghl' | 'backend')[]).forEach((cId) => {
        const isClusterActive = activeCluster === 'all' || activeCluster === cId;
        const targetOpacity = isClusterActive ? 0.95 : 0.18;
        const targetEmissive = isClusterActive ? 1.0 : 0.2;

        const hub = hubMeshes[cId];
        if (hub) {
          hub.mat.opacity = THREE.MathUtils.lerp(hub.mat.opacity, targetOpacity, 0.08);
          hub.mat.emissiveIntensity = THREE.MathUtils.lerp(hub.mat.emissiveIntensity, targetEmissive, 0.08);
        }

        const lines = intraLines[cId];
        if (lines) {
          (lines.material as THREE.LineBasicMaterial).opacity = THREE.MathUtils.lerp(
            (lines.material as THREE.LineBasicMaterial).opacity,
            isClusterActive ? 0.45 : 0.1,
            0.08
          );
        }

        // Tools in this cluster
        TECH_TOOLS.filter((t) => t.clusterId === cId).forEach((tool) => {
          const tm = toolMeshes[tool.id];
          if (tm) {
            const isSelected = selectedTool.id === tool.id;
            const tOpacity = isClusterActive ? (isSelected ? 1.0 : 0.88) : 0.15;
            const tEmissive = isClusterActive ? (isSelected ? 1.6 : 0.75) : 0.15;
            tm.mat.opacity = THREE.MathUtils.lerp(tm.mat.opacity, tOpacity, 0.08);
            tm.mat.emissiveIntensity = THREE.MathUtils.lerp(tm.mat.emissiveIntensity, tEmissive, 0.08);

            // Scale pulse on selected tool
            if (isSelected) {
              const selScale = 1.25 + Math.sin(elapsedTime * 4) * 0.08;
              tm.mesh.scale.set(selScale, selScale, selScale);
            } else {
              tm.mesh.scale.set(1, 1, 1);
            }
          }
        });
      });

      // Update projected screen positions for active nodes (~30fps)
      if (mount && Date.now() - lastUiUpdate > 30) {
        lastUiUpdate = Date.now();
        const currentW = mount.clientWidth;
        const currentH = mount.clientHeight;
        const newScreenNodes: Record<string, NodeScreenPosition> = {};

        // If in 'all' overview, project 4 Hubs
        if (activeCluster === 'all') {
          (Object.keys(CLUSTERS) as ('ai' | 'n8n' | 'ghl' | 'backend')[]).forEach((cId) => {
            const hub = hubMeshes[cId];
            if (hub) {
              hub.mesh.getWorldPosition(tempVec);
              tempVec.project(camera);
              if (tempVec.z < 1.0) {
                newScreenNodes[`hub-${cId}`] = {
                  x: (tempVec.x * 0.5 + 0.5) * currentW,
                  y: (-(tempVec.y * 0.5) + 0.5) * currentH,
                  z: tempVec.z,
                  visible: true,
                  name: CLUSTERS[cId].name,
                  clusterColor: CLUSTERS[cId].color,
                  isHub: true
                };
              }
            }
          });
        } else {
          // In focused cluster: project all tools in that cluster + hub
          const activeTools = TECH_TOOLS.filter((t) => t.clusterId === activeCluster);
          activeTools.forEach((tool) => {
            const tm = toolMeshes[tool.id];
            if (tm) {
              tm.mesh.getWorldPosition(tempVec);
              tempVec.project(camera);
              if (tempVec.z < 1.0) {
                newScreenNodes[tool.id] = {
                  x: (tempVec.x * 0.5 + 0.5) * currentW,
                  y: (-(tempVec.y * 0.5) + 0.5) * currentH,
                  z: tempVec.z,
                  visible: true,
                  name: tool.shortName,
                  clusterColor: CLUSTERS[tool.clusterId].color,
                  isHub: false
                };
              }
            }
          });
        }

        setScreenNodes(newScreenNodes);
      }

      renderer.render(scene, camera);
    };

    animate();

    // 7. Raycasting for interactive click & hover
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerDown = (e: PointerEvent) => {
      isDragging.current = true;
      prevMouse.current = { x: e.clientX, y: e.clientY };

      const rect = mount.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      raycaster.setFromCamera(mouse, camera);

      // Collect all interactive meshes
      const interactiveMeshes: THREE.Mesh[] = [];
      Object.values(hubMeshes).forEach(h => interactiveMeshes.push(h.mesh));
      Object.values(toolMeshes).forEach(t => interactiveMeshes.push(t.mesh));

      const intersects = raycaster.intersectObjects(interactiveMeshes);
      if (intersects.length > 0) {
        const hit = intersects[0].object;
        if (hit.userData.isHub && hit.userData.clusterId) {
          setActiveCluster(hit.userData.clusterId as TechClusterId);
        } else if (hit.userData.isTool && hit.userData.toolId) {
          const clicked = TECH_TOOLS.find(t => t.id === hit.userData.toolId);
          if (clicked) {
            setSelectedTool(clicked);
            if (activeCluster !== clicked.clusterId && activeCluster !== 'all') {
              setActiveCluster(clicked.clusterId);
            }
          }
        }
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      const deltaX = e.clientX - prevMouse.current.x;
      const deltaY = e.clientY - prevMouse.current.y;

      if (worldGroup) {
        worldGroup.rotation.y += deltaX * 0.007;
        worldGroup.rotation.x += deltaY * 0.007;
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

      hubGeo.dispose();
      hubRingGeo.dispose();
      toolGeo.dispose();
      bridgeGeo.dispose();
      bridgeMat.dispose();
      renderer.dispose();

      if (renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [theme]);

  const activeClusterMeta = activeCluster === 'all' ? null : CLUSTERS[activeCluster];
  const displayedTools = useMemo(() => {
    if (activeCluster === 'all') return TECH_TOOLS;
    return TECH_TOOLS.filter(t => t.clusterId === activeCluster);
  }, [activeCluster]);

  const getClusterIcon = (cId: TechClusterId) => {
    switch (cId) {
      case 'ai': return <Bot size={14} />;
      case 'n8n': return <Workflow size={14} />;
      case 'ghl': return <Zap size={14} />;
      case 'backend': return <Terminal size={14} />;
      default: return <Layers size={14} />;
    }
  };

  return (
    <div 
      className="glass-panel" 
      style={{ 
        padding: '24px', 
        position: 'relative', 
        overflow: 'hidden',
        borderRadius: 'var(--radius-xl)'
      }}
    >
      {/* Top Header & Cluster Switcher Bar */}
      <div 
        style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          gap: '16px', 
          marginBottom: '20px' 
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="section-eyebrow">Interactive 3D Technology Architecture</span>
            <span 
              className="badge" 
              style={{ 
                fontSize: '0.7rem', 
                backgroundColor: 'rgba(16, 185, 129, 0.15)', 
                color: '#10b981', 
                borderColor: 'rgba(16, 185, 129, 0.3)' 
              }}
            >
              ● Live 3D Clusters
            </span>
          </div>
          <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Production Tech Architecture Graph
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 450, marginTop: '2px' }}>
            Click stacks below to dynamically re-center the 3D scene and reveal authentic tool nodes.
          </p>
        </div>

        {/* Dynamic Stack Selector Tabs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          <button
            onClick={() => setActiveCluster('all')}
            className={`badge ${activeCluster === 'all' ? 'badge-primary' : ''}`}
            style={{
              cursor: 'pointer',
              padding: '7px 14px',
              fontSize: '0.78rem',
              fontWeight: activeCluster === 'all' ? 700 : 600,
              border: activeCluster === 'all' ? '1px solid var(--accent)' : '1px solid var(--border-default)',
              backgroundColor: activeCluster === 'all' ? 'var(--accent)' : 'var(--surface-1)',
              color: activeCluster === 'all' ? '#ffffff' : 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
            aria-label="View All Systems Constellation"
          >
            <Layers size={13} />
            All Constellation
          </button>

          {(Object.keys(CLUSTERS) as ('ai' | 'n8n' | 'ghl' | 'backend')[]).map((cId) => {
            const c = CLUSTERS[cId];
            const isSelected = activeCluster === cId;
            return (
              <button
                key={cId}
                onClick={() => setActiveCluster(cId)}
                style={{
                  cursor: 'pointer',
                  padding: '7px 14px',
                  fontSize: '0.78rem',
                  fontWeight: isSelected ? 700 : 600,
                  borderRadius: 'var(--radius-full)',
                  border: `1.5px solid ${isSelected ? c.color : 'var(--border-default)'}`,
                  backgroundColor: isSelected 
                    ? (theme === 'dark' ? `${c.color}25` : `${c.color}15`) 
                    : 'var(--surface-1)',
                  color: isSelected ? c.color : 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: isSelected ? `0 0 12px ${c.color}40` : 'none',
                  transition: 'all 0.2s ease'
                }}
                aria-label={`Focus ${c.name} cluster`}
              >
                {getClusterIcon(cId)}
                <span>{c.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3D Scene Viewport + Right Inspector Panel */}
      <div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '20px', 
          alignItems: 'stretch' 
        }}
      >
        {/* Three.js Interactive Canvas Container with 2D Projected Badges */}
        <div 
          style={{ 
            position: 'relative', 
            width: '100%', 
            minHeight: '440px', 
            borderRadius: 'var(--radius-lg)', 
            overflow: 'hidden',
            border: '1px solid var(--border-default)',
            background: theme === 'dark' 
              ? 'radial-gradient(circle at center, rgba(179, 160, 201, 0.08) 0%, #111110 80%)' 
              : 'radial-gradient(circle at center, rgba(181, 141, 104, 0.08) 0%, #F5F1E9 80%)'
          }}
        >
          {/* Canvas */}
          <div 
            ref={mountRef} 
            style={{ 
              width: '100%', 
              height: '100%', 
              minHeight: '440px', 
              cursor: isDragging.current ? 'grabbing' : 'grab',
              touchAction: 'none'
            }} 
            aria-label="3D Technology Architecture Graph"
          />

          {/* 3D Projected Badges Directly Over Active Nodes */}
          {Object.entries(screenNodes).map(([nodeId, pos]) => {
            if (!pos.visible) return null;
            const isHoveredOrSelected = selectedTool.id === nodeId || (pos.isHub && activeCluster === nodeId.replace('hub-', ''));

            return (
              <div
                key={nodeId}
                onClick={(e) => {
                  e.stopPropagation();
                  if (pos.isHub) {
                    const cId = nodeId.replace('hub-', '') as TechClusterId;
                    setActiveCluster(cId);
                  } else {
                    const t = TECH_TOOLS.find(item => item.id === nodeId);
                    if (t) setSelectedTool(t);
                  }
                }}
                style={{
                  position: 'absolute',
                  left: `${pos.x}px`,
                  top: `${pos.y - 20}px`,
                  transform: 'translate(-50%, -100%)',
                  pointerEvents: 'auto',
                  cursor: 'pointer',
                  zIndex: isHoveredOrSelected ? 20 : 10,
                  transition: 'transform 0.08s ease, box-shadow 0.15s ease'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    padding: pos.isHub ? '5px 12px' : '3px 9px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: theme === 'dark' ? 'rgba(11, 15, 25, 0.94)' : 'rgba(255, 255, 255, 0.96)',
                    backdropFilter: 'blur(8px)',
                    border: `1.5px solid ${pos.clusterColor}`,
                    boxShadow: theme === 'dark'
                      ? `0 0 16px ${pos.clusterColor}66, 0 4px 12px rgba(0,0,0,0.4)`
                      : `0 4px 14px rgba(0,0,0,0.12), 0 0 10px ${pos.clusterColor}35`,
                    color: theme === 'dark' ? '#f8fafc' : '#0f172a',
                    fontSize: pos.isHub ? '0.78rem' : '0.72rem',
                    fontWeight: 700,
                    whiteSpace: 'nowrap'
                  }}
                >
                  <span 
                    style={{ 
                      width: '6px', 
                      height: '6px', 
                      borderRadius: '50%', 
                      backgroundColor: pos.clusterColor 
                    }} 
                  />
                  <span>{pos.name}</span>
                </div>
              </div>
            );
          })}

          {/* Floating Canvas Footer Controls */}
          <div
            style={{
              position: 'absolute',
              bottom: '12px',
              left: '12px',
              right: '12px',
              padding: '8px 14px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: theme === 'dark' ? 'rgba(27, 26, 24, 0.92)' : 'rgba(255, 252, 247, 0.94)',
              backdropFilter: 'blur(8px)',
              border: '1px solid var(--border-default)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '10px',
              zIndex: 25
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span 
                style={{ 
                  width: '7px', 
                  height: '7px', 
                  borderRadius: '50%', 
                  backgroundColor: activeClusterMeta ? activeClusterMeta.color : 'var(--accent)' 
                }} 
              />
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--text-primary)' }}>
                {activeClusterMeta 
                  ? `Focusing: ${activeClusterMeta.hubName}` 
                  : 'Architecture Constellation Overview (4 Clusters Connected)'}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {activeCluster !== 'all' && (
                <button
                  onClick={() => setActiveCluster('all')}
                  className="badge"
                  style={{ cursor: 'pointer', padding: '3px 8px', fontSize: '0.68rem' }}
                  title="Reset to all constellation"
                >
                  <Maximize2 size={11} />
                  Overview
                </button>
              )}

              <button
                onClick={() => setIsRotating(!isRotating)}
                className="badge"
                style={{ cursor: 'pointer', padding: '3px 8px', fontSize: '0.68rem' }}
                title="Toggle scene drift"
              >
                <Rotate3d size={11} />
                {isRotating ? 'Drift Active' : 'Drift Paused'}
              </button>
            </div>
          </div>
        </div>

        {/* Selected Technology Inspector Card */}
        <div 
          className="liquid-card" 
          style={{ 
            padding: '24px', 
            borderRadius: 'var(--radius-lg)', 
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            border: `1px solid ${CLUSTERS[selectedTool.clusterId].color}50`
          }}
        >
          <div>
            {/* Header / Active Cluster Badge */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span 
                  className="badge" 
                  style={{ 
                    backgroundColor: `${CLUSTERS[selectedTool.clusterId].color}20`, 
                    color: CLUSTERS[selectedTool.clusterId].color,
                    borderColor: `${CLUSTERS[selectedTool.clusterId].color}60`,
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                >
                  {getClusterIcon(selectedTool.clusterId)}
                  {CLUSTERS[selectedTool.clusterId].name}
                </span>
              </div>
              <span 
                style={{ 
                  fontSize: '0.7rem', 
                  fontFamily: 'var(--font-mono)', 
                  color: 'var(--text-tertiary)',
                  fontWeight: 600
                }}
              >
                SELECTED NODE
              </span>
            </div>

            {/* Tool Name */}
            <h4 
              style={{ 
                fontSize: '1.45rem', 
                fontWeight: 800, 
                color: 'var(--text-primary)', 
                marginBottom: '8px' 
              }}
            >
              {selectedTool.name}
            </h4>

            {/* Architectural Role */}
            <div style={{ marginBottom: '14px' }}>
              <p style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '3px' }}>
                Architecture &amp; Mechanism
              </p>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 450, lineHeight: 1.55 }}>
                {selectedTool.role}
              </p>
            </div>

            {/* Authentic Production Use-Case */}
            <div 
              style={{ 
                padding: '12px 14px', 
                borderRadius: 'var(--radius-md)', 
                backgroundColor: 'var(--surface-2)',
                border: '1px solid var(--border-subtle)',
                marginBottom: '16px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                <CheckCircle2 size={13} color={CLUSTERS[selectedTool.clusterId].color} />
                <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: CLUSTERS[selectedTool.clusterId].color }}>
                  PRODUCTION USE-CASE
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500, lineHeight: 1.5 }}>
                {selectedTool.productionUseCase}
              </p>
            </div>

            {/* Connected Tools Bridge */}
            {selectedTool.connectedTo && selectedTool.connectedTo.length > 0 && (
              <div style={{ marginBottom: '16px' }}>
                <p style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                  Connected Architecture Links:
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {selectedTool.connectedTo.map((link) => (
                    <span
                      key={link}
                      style={{
                        padding: '3px 8px',
                        fontSize: '0.72rem',
                        fontFamily: 'var(--font-mono)',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'var(--surface-2)',
                        color: 'var(--text-primary)',
                        border: '1px solid var(--border-subtle)'
                      }}
                    >
                      {link}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick Tool Switcher Buttons */}
          <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '14px', marginTop: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <p style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-primary)' }}>
                {activeCluster === 'all' ? 'ALL STACK TOOLS:' : `${CLUSTERS[activeCluster].name} TOOLS:`}
              </p>
              <span style={{ fontSize: '0.68rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
                {displayedTools.length} tools
              </span>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', maxHeight: '115px', overflowY: 'auto' }}>
              {displayedTools.map((t) => {
                const isSelected = selectedTool.id === t.id;
                const cColor = CLUSTERS[t.clusterId].color;

                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      setSelectedTool(t);
                      if (activeCluster !== t.clusterId && activeCluster !== 'all') {
                        setActiveCluster(t.clusterId);
                      }
                    }}
                    style={{
                      padding: '4px 10px',
                      fontSize: '0.73rem',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: isSelected ? 700 : 500,
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: isSelected ? cColor : 'var(--surface-2)',
                      color: isSelected ? '#ffffff' : 'var(--text-primary)',
                      border: `1px solid ${isSelected ? cColor : 'var(--border-default)'}`,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {t.shortName}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
