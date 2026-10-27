import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, CheckCircle2, ArrowRight, Bot, Database, Workflow, ShieldCheck, Zap } from 'lucide-react';

interface Scenario {
  id: string;
  title: string;
  description: string;
  steps: {
    node: string;
    label: string;
    icon: string;
    log: string;
  }[];
}

const SCENARIOS: Scenario[] = [
  {
    id: 'rag',
    title: 'Self-Correcting Agentic RAG',
    description: 'LangGraph StateGraph evaluates document relevance and rewrites queries upon hallucination detection.',
    steps: [
      { node: 'input', label: 'User Query', icon: 'zap', log: 'Input parsed: "Compare Q3 clinic expenses against budget"' },
      { node: 'supervisor', label: 'Supervisor Router', icon: 'bot', log: 'Routing to ChromaDB vector store + local SQLite schema' },
      { node: 'retrieval', label: 'Hybrid Retrieval', icon: 'db', log: 'Retrieved 8 chunks from ChromaDB with 0.94 similarity' },
      { node: 'evaluator', label: 'Self-Correction Loop', icon: 'shield', log: 'Graded relevance: PASS (0.97 confidence score, zero hallucination)' },
      { node: 'output', label: 'Synthesized Report', icon: 'check', log: 'Generated structured markdown response + downloadable PDF summary' }
    ]
  },
  {
    id: 'lead-automation',
    title: 'n8n + GoHighLevel Lead Engine',
    description: 'Autonomous business lead qualification, calendar booking, and AI voice confirmation.',
    steps: [
      { node: 'input', label: 'Incoming Lead Webhook', icon: 'zap', log: 'Webhook received from Facebook Ads / Webform' },
      { node: 'supervisor', label: 'n8n Router Node', icon: 'workflow', log: 'Enriching lead data via Clearbit and verifying email deliverability' },
      { node: 'retrieval', label: 'GHL CRM Pipeline', icon: 'db', log: 'Updated GoHighLevel stage: "Qualified Prospect" & scheduled calendar slot' },
      { node: 'evaluator', label: 'AI Voice Receptionist', icon: 'bot', log: 'Dispatched automated Retell AI call for instant booking confirmation' },
      { node: 'output', label: 'Synced & Closed', icon: 'check', log: 'Notification pushed to Slack & Telegram channel @Maazinex' }
    ]
  },
  {
    id: 'swarm',
    title: 'Multi-Agent Researcher / Writer',
    description: 'Autonomous swarm with supervisor coordinator, web researcher, and technical reviewer.',
    steps: [
      { node: 'input', label: 'Research Objective', icon: 'zap', log: 'Task initiated: "Deep analysis of local LLM quantization speeds"' },
      { node: 'supervisor', label: 'Swarm Supervisor', icon: 'bot', log: 'Allocated sub-tasks to Researcher Agent and Benchmarking Tool' },
      { node: 'retrieval', label: 'Ollama Stream Engine', icon: 'db', log: 'Ran 4-bit vs 8-bit inference benchmarks on Mistral-7B' },
      { node: 'evaluator', label: 'Peer Reviewer Agent', icon: 'shield', log: 'Checked methodology against standard benchmarks: Approved' },
      { node: 'output', label: 'Published Technical Case', icon: 'check', log: 'Draft saved to repository & posted to YouTube / Telegram' }
    ]
  }
];

export const WorkflowSimulator: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState<Scenario>(SCENARIOS[0]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(-1);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);

  const startSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);
    setCurrentStepIndex(0);
    setLogs([activeScenario.steps[0].log]);
  };

  const resetSimulation = () => {
    setIsRunning(false);
    setCurrentStepIndex(-1);
    setLogs([]);
  };

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isRunning && currentStepIndex >= 0 && currentStepIndex < activeScenario.steps.length - 1) {
      timer = setTimeout(() => {
        const nextIdx = currentStepIndex + 1;
        setCurrentStepIndex(nextIdx);
        setLogs(prev => [...prev, activeScenario.steps[nextIdx].log]);
      }, 1200);
    } else if (isRunning && currentStepIndex === activeScenario.steps.length - 1) {
      setIsRunning(false);
    }
    return () => clearTimeout(timer);
  }, [isRunning, currentStepIndex, activeScenario]);

  const selectScenario = (sc: Scenario) => {
    setActiveScenario(sc);
    resetSimulation();
  };

  return (
    <section id="workflow" style={{ padding: 'var(--section-spacing) 0', borderTop: '1px solid var(--border-subtle)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 40px auto' }}>
          <span className="section-eyebrow">Production Agentic Architecture</span>
          <h2 className="display-2" style={{ marginBottom: '12px' }}>
            LangGraph &amp; Automation Simulator
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', fontWeight: 450, lineHeight: 1.65 }}>
            Experience how Maaz Ali designs resilient, autonomous agent graphs with self-correction and enterprise webhook workflows.
          </p>

          {/* Scenario Tabs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', marginTop: '20px' }}>
            {SCENARIOS.map(sc => {
              const isActive = activeScenario.id === sc.id;
              return (
                <button
                  key={sc.id}
                  onClick={() => selectScenario(sc)}
                  className={`badge ${isActive ? 'badge-primary' : ''}`}
                  style={{
                    cursor: 'pointer',
                    padding: '8px 18px',
                    fontSize: '0.8125rem',
                    fontWeight: isActive ? 700 : 600,
                    border: '1px solid var(--border-default)',
                    backgroundColor: isActive ? 'var(--accent-muted)' : 'var(--surface-1)',
                    color: isActive ? 'var(--accent)' : 'var(--text-primary)'
                  }}
                >
                  {sc.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Pipeline Board */}
        <div className="glass-panel" style={{ padding: 'clamp(18px, 3.5vw, 32px)' }}>
          {/* Controls Bar */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '32px' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>{activeScenario.title}</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 450 }}>{activeScenario.description}</p>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={startSimulation}
                disabled={isRunning}
                className="btn btn-primary"
                style={{
                  padding: '8px 20px',
                  fontSize: '0.875rem',
                  opacity: isRunning ? 0.7 : 1,
                  cursor: isRunning ? 'not-allowed' : 'pointer'
                }}
              >
                <Play size={16} />
                {isRunning ? 'Executing Graph...' : 'Run Simulation'}
              </button>
              <button
                onClick={resetSimulation}
                className="btn btn-secondary"
                style={{ padding: '8px 16px', fontSize: '0.875rem' }}
                title="Reset simulation"
              >
                <RotateCcw size={16} />
                Reset
              </button>
            </div>
          </div>

          {/* Graph Nodes Visual Flow */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 150px), 1fr))', 
            gap: '16px',
            alignItems: 'center',
            marginBottom: '32px'
          }}>
            {activeScenario.steps.map((step, idx) => {
              const isPast = currentStepIndex > idx;
              const isCurrent = currentStepIndex === idx;

              let borderColor = 'var(--border-default)';
              let bg = 'var(--surface-1)';
              let iconColor = 'var(--text-secondary)';

              if (isCurrent) {
                borderColor = 'var(--accent)';
                bg = 'var(--accent-muted)';
                iconColor = 'var(--accent)';
              } else if (isPast) {
                borderColor = 'var(--success)';
                bg = 'var(--success-bg)';
                iconColor = 'var(--success-fg)';
              }

              return (
                <div
                  key={step.node}
                  className="glass-card"
                  style={{
                    padding: '20px 16px',
                    textAlign: 'center',
                    border: `2px solid ${borderColor}`,
                    backgroundColor: bg,
                    transform: isCurrent ? 'scale(1.05)' : 'none',
                    transition: 'all 0.3s ease',
                    boxShadow: isCurrent ? '0 0 20px var(--accent-glow)' : 'none'
                  }}
                >
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--surface-2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 12px auto',
                    border: `1px solid ${borderColor}`,
                    color: iconColor
                  }}>
                    {idx === 0 && <Zap size={20} />}
                    {idx === 1 && <Bot size={20} />}
                    {idx === 2 && <Database size={20} />}
                    {idx === 3 && <ShieldCheck size={20} />}
                    {idx === 4 && <CheckCircle2 size={20} />}
                  </div>

                  <span style={{ 
                    fontFamily: 'var(--font-mono)', 
                    fontSize: '0.72rem', 
                    color: 'var(--accent)',
                    fontWeight: 700,
                    textTransform: 'uppercase'
                  }}>
                    Step 0{idx + 1}
                  </span>
                  <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '4px' }}>
                    {step.label}
                  </h4>

                  <div style={{ marginTop: '10px' }}>
                    {isCurrent && (
                      <span className="badge badge-primary" style={{ fontSize: '0.68rem', fontWeight: 700 }}>
                        Active Node
                      </span>
                    )}
                    {isPast && (
                      <span className="badge badge-emerald" style={{ fontSize: '0.68rem', fontWeight: 700 }}>
                        Completed
                      </span>
                    )}
                    {!isCurrent && !isPast && (
                      <span className="badge" style={{ fontSize: '0.68rem', fontWeight: 600, color: 'var(--text-secondary)', backgroundColor: 'var(--surface-2)' }}>
                        Pending
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Execution Telemetry Terminal */}
          <div style={{
            backgroundColor: 'var(--surface-2)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-default)',
            padding: '16px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8125rem',
            color: 'var(--text-primary)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ef4444', display: 'inline-block' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#eab308', display: 'inline-block' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#22c55e', display: 'inline-block' }} />
                <span style={{ marginLeft: '8px', fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>langgraph_telemetry.log</span>
              </div>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>{logs.length} events logged</span>
            </div>

            <div style={{ minHeight: '80px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {logs.length === 0 ? (
                <span style={{ color: 'var(--text-secondary)' }}>
                  $ Ready. Click &quot;Run Simulation&quot; to inspect state graph traversal.
                </span>
              ) : (
                logs.map((log, i) => (
                  <div key={i} style={{ display: 'flex', gap: '10px' }}>
                    <span style={{ color: 'var(--accent)', fontWeight: 700 }}>&gt;</span>
                    <span style={{ color: 'var(--text-primary)' }}>{log}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
