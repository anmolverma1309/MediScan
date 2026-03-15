import { useEffect } from 'react'
import './Architecture.css'

const LAYERS = [
    {
        title: 'Client Layer',
        color: '#388bfd',
        items: [
            { name: 'React.js PWA', detail: 'v18 — Functional components + hooks' },
            { name: 'Service Worker', detail: 'Workbox — offline caching + model cache' },
            { name: 'TF Lite WASM', detail: 'In-browser offline inference (Phase 2)' },
        ],
    },
    {
        title: 'Gateway Layer',
        color: '#39d0e8',
        items: [
            { name: 'AWS CloudFront CDN', detail: 'Global edge network, HTTPS enforced' },
            { name: 'AWS ALB', detail: 'Path-based Layer 7 routing' },
            { name: 'Node.js / Express', detail: 'v20 LTS — Rate limiting, auth, routing' },
        ],
    },
    {
        title: 'Application Layer',
        color: '#a371f7',
        items: [
            { name: 'Python Flask', detail: 'v3 — REST API, preprocessing pipeline' },
            { name: 'Redis', detail: 'v7 — Job queue + result cache (TTL: 1hr)' },
            { name: 'API Versioning', detail: '/api/v1/ — non-breaking upgrade path' },
        ],
    },
    {
        title: 'AI Inference Layer',
        color: '#f0883e',
        items: [
            { name: 'EfficientNet-B4', detail: 'Fine-tuned on NIH + ISIC datasets' },
            { name: 'Grad-CAM Module', detail: 'Gradient-weighted Class Activation Maps' },
            { name: 'CLAHE Preprocessing', detail: 'Contrast enhancement for low-quality scans' },
        ],
    },
    {
        title: 'Data Layer',
        color: '#3fb950',
        items: [
            { name: 'PostgreSQL (RDS)', detail: 'Anonymized telemetry — db.t3.medium' },
            { name: 'S3 Bucket', detail: 'Versioned model weights — immutable' },
            { name: 'IndexedDB (Client)', detail: 'Offline analysis results — user-controlled' },
        ],
    },
]

const INFRA = [
    { component: 'CDN', service: 'AWS CloudFront', spec: 'Global edge, 1yr static cache' },
    { component: 'Load Balancer', service: 'Application Load Balancer', spec: 'L7, path-based routing' },
    { component: 'Node.js API', service: 'EC2 / EKS pod', spec: 't3.medium, 2 replicas min' },
    { component: 'Flask Inference', service: 'EC2 GPU / EKS pod', spec: 'g4dn.xlarge (T4 GPU), HPA 1–20 pods' },
    { component: 'Redis', service: 'ElastiCache', spec: 'r6g.large, Multi-AZ' },
    { component: 'Model Storage', service: 'S3', spec: 'Versioned, lifecycle policy' },
    { component: 'Analytics DB', service: 'RDS PostgreSQL', spec: 'db.t3.medium, encrypted at rest' },
]

const CI_STEPS = [
    { step: 'Lint', detail: 'ESLint (React) + flake8 (Python) on every PR' },
    { step: 'Build', detail: 'Vite frontend bundle + Docker image build' },
    { step: 'Register', detail: 'Push Docker image tagged with commit SHA to AWS ECR' },
    { step: 'Deploy', detail: 'Helm upgrade → rolling pod restart in EKS (zero downtime)' },
]

export default function Architecture() {
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in-view') }),
            { threshold: 0.1 }
        )
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
        return () => observer.disconnect()
    }, [])

    return (
        <main className="arch-page">
            {/* Hero */}
            <div className="arch-page__hero">
                <div className="container">
                    <div className="reveal">
                        <span className="section-label">Technical Deep-Dive</span>
                        <h1 className="arch-page__title">System Architecture</h1>
                        <p className="arch-page__subtitle">
                            A five-layer distributed system designed for &lt;3s latency, 10,000+ analyses/day, and HIPAA-aligned zero-storage policy.
                        </p>
                    </div>
                </div>
            </div>

            {/* Logical Map */}
            <section className="section">
                <div className="container">
                    <div className="reveal" style={{ marginBottom: 48 }}>
                        <span className="section-label">Layered View</span>
                        <h2 className="section-title">Architecture Layers</h2>
                        <p className="section-subtitle">Each layer is independently deployable, scalable, and follows a clear single responsibility.</p>
                    </div>
                    <div className="arch-layers reveal">
                        {LAYERS.map((layer, i) => (
                            <div key={i} className="arch-layer" style={{ borderLeftColor: layer.color }}>
                                <div className="arch-layer__title" style={{ color: layer.color }}>{layer.title}</div>
                                <div className="arch-layer__items">
                                    {layer.items.map((item, j) => (
                                        <div key={j} className="arch-layer__item">
                                            <span className="arch-layer__item-name">{item.name}</span>
                                            <span className="arch-layer__item-detail">{item.detail}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* AWS Infrastructure */}
            <section className="section arch-infra-section">
                <div className="container">
                    <div className="reveal" style={{ marginBottom: 40 }}>
                        <span className="section-label">Infrastructure</span>
                        <h2 className="section-title">AWS Infrastructure Layout</h2>
                    </div>
                    <div className="infra-table reveal">
                        <div className="infra-table__header">
                            <span>Component</span><span>AWS Service</span><span>Specification</span>
                        </div>
                        {INFRA.map((row, i) => (
                            <div key={i} className="infra-table__row">
                                <span className="infra-table__component">{row.component}</span>
                                <span>{row.service}</span>
                                <span className="infra-table__spec">{row.spec}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Docker Compose */}
            <section className="section">
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
                        <div className="reveal">
                            <span className="section-label">Local Development</span>
                            <h2 className="section-title" style={{ fontSize: '1.6rem' }}>Docker Compose</h2>
                            <p className="section-subtitle">Full stack runnable locally with a single command. GPU pass-through configured for the Python inference container.</p>
                            <div className="docker-ports">
                                {[
                                    { service: 'frontend', port: '3000', color: '#388bfd' },
                                    { service: 'api-gateway', port: '4000', color: '#39d0e8' },
                                    { service: 'inference', port: '5000', color: '#f0883e' },
                                    { service: 'redis', port: '6379', color: '#a371f7' },
                                ].map((s, i) => (
                                    <div key={i} className="docker-port">
                                        <span className="docker-port__dot" style={{ background: s.color }} />
                                        <span className="docker-port__name">{s.service}</span>
                                        <span className="docker-port__port">:{s.port}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="reveal">
                            <span className="section-label">CI/CD Pipeline</span>
                            <h2 className="section-title" style={{ fontSize: '1.6rem' }}>GitHub Actions</h2>
                            <div className="ci-steps">
                                {CI_STEPS.map((step, i) => (
                                    <div key={i} className="ci-step">
                                        <div className="ci-step__num">{i + 1}</div>
                                        <div>
                                            <div className="ci-step__name">{step.step}</div>
                                            <div className="ci-step__detail">{step.detail}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Scalability */}
            <section className="section arch-scale-section">
                <div className="container">
                    <div className="reveal" style={{ marginBottom: 48 }}>
                        <span className="section-label">Scalability</span>
                        <h2 className="section-title">Built to Scale</h2>
                    </div>
                    <div className="grid-3 reveal">
                        {[
                            { metric: '10K+', label: 'Analyses/day', detail: 'Base infrastructure target', color: '#388bfd' },
                            { metric: '1–20', label: 'Flask Pods (HPA)', detail: 'Auto-scales on CPU/GPU utilization', color: '#3fb950' },
                            { metric: '99.5%', label: 'Uptime SLA', detail: 'Monitored by UptimeRobot / Pingdom', color: '#d29922' },
                            { metric: '< 3s', label: 'P95 Latency', detail: 'CloudWatch alerts if P95 > 5s', color: '#39d0e8' },
                            { metric: '< 1%', label: 'Max Error Rate', detail: 'Sentry → PagerDuty if exceeded', color: '#a371f7' },
                            { metric: '75%', label: 'Confidence Floor', detail: 'Below → Consult Specialist fallback', color: '#f0883e' },
                        ].map((m, i) => (
                            <div key={i} className="scale-metric-card">
                                <div className="scale-metric__value" style={{ color: m.color }}>{m.metric}</div>
                                <div className="scale-metric__label">{m.label}</div>
                                <div className="scale-metric__detail">{m.detail}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Monorepo */}
            <section className="section">
                <div className="container">
                    <div className="reveal" style={{ marginBottom: 40 }}>
                        <span className="section-label">Repository Structure</span>
                        <h2 className="section-title">Monorepo Layout</h2>
                    </div>
                    <div className="monorepo-tree reveal">
                        <pre className="tree-code">{`mediscan-monorepo/
├── frontend/          # React PWA (Vite)
│   └── src/
│       ├── components/   # UploadZone, HeatmapOverlay, UrgencyBadge
│       └── pages/        # HomePage, DiagnoseDemo, HowItWorks
│
├── gateway/           # Node.js API Gateway
│   └── src/
│       ├── routes/       # Express endpoints /api/v1/*
│       └── middleware/    # Rate limiter, FormData parser
│
├── inference/         # Python Flask Worker
│   └── src/core/
│       ├── model.py      # EfficientNet-B4 setup
│       ├── gradcam.py    # Heatmap generation
│       └── preprocessing.py
│
├── infrastructure/    # DevOps configs
│   ├── kubernetes/    # Helm charts for EKS/GKE
│   └── docker-compose.yml
│
└── docs/              # All 16 documentation files`}</pre>
                    </div>
                </div>
            </section>
        </main>
    )
}
