import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Shield, Clock, Globe, Zap, Activity, ChevronDown } from 'lucide-react'
import './HomePage.css'

const STATS = [
    { value: '92%+', label: 'AUC Accuracy', sublabel: 'NIH Validation Set' },
    { value: '<3s', label: 'Inference Time', sublabel: 'GPU-accelerated' },
    { value: '10K+', label: 'Scans/Day', sublabel: 'Scalable capacity' },
    { value: '99.5%', label: 'Uptime SLA', sublabel: 'Production grade' },
]

const FEATURES = [
    {
        icon: <Zap size={24} />,
        title: 'Instant AI Diagnosis',
        desc: 'Upload a chest X-ray and receive AI-powered pneumonia detection in under 3 seconds, with confidence scoring and clinical recommendations.',
        color: '#388bfd',
    },
    {
        icon: <Activity size={24} />,
        title: 'Grad-CAM Heatmaps',
        desc: 'Visual explainability that shows exactly which regions of the scan influenced the AI diagnosis — critical for trust in clinical settings.',
        color: '#39d0e8',
    },
    {
        icon: <Shield size={24} />,
        title: 'HIPAA-Aligned Security',
        desc: 'Zero persistent image storage, AES-256 encryption, and TLS 1.3. Your patient data is purged from memory immediately after analysis.',
        color: '#3fb950',
    },
    {
        icon: <Clock size={24} />,
        title: '4-Tier Urgency Scoring',
        desc: 'Every result is mapped to Low, Moderate, High, or Critical urgency — giving frontline workers clear, actionable triage guidance.',
        color: '#d29922',
    },
    {
        icon: <Globe size={24} />,
        title: 'Last-Mile Accessibility',
        desc: 'Progressive Web App with planned offline inference via TF Lite WASM, designed for rural clinics and intermittent connectivity.',
        color: '#f0883e',
    },
    {
        icon: <ArrowRight size={24} />,
        title: 'Plain-Language Reports',
        desc: 'AI findings are explained in 2-4 sentences, in language readable by nurses and health workers — not just radiologists.',
        color: '#a371f7',
    },
]

const URGENCY_TIERS = [
    { label: 'Low', range: '< 40%', color: '#3fb950', action: 'Routine follow-up', width: '20' },
    { label: 'Moderate', range: '40–65%', color: '#d29922', action: 'Schedule appointment soon', width: '50' },
    { label: 'High', range: '65–85%', color: '#f0883e', action: 'Urgent specialist referral', width: '75' },
    { label: 'Critical', range: '> 85%', color: '#f85149', action: 'Immediate intervention required', width: '95' },
]

const PROBLEM_STATS = [
    { value: '2/3', label: 'of the global population lacks access to diagnostic imaging interpretation' },
    { value: '3–14', label: 'days average radiology wait time in rural India' },
    { value: '1:100K', label: 'radiologist-to-patient ratio in rural India' },
    { value: '$800B+', label: 'annual global cost of medical misdiagnosis' },
]

export default function HomePage() {
    const heroRef = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('in-view')),
            { threshold: 0.1 }
        )
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
        return () => observer.disconnect()
    }, [])

    const scrollToFeatures = () => {
        document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <main className="homepage">
            {/* ---- HERO ---- */}
            <section className="hero" ref={heroRef}>
                <div className="hero__bg-grid" />
                <div className="hero__glow hero__glow--1" />
                <div className="hero__glow hero__glow--2" />

                <div className="container hero__content">
                    <div className="hero__badge-row reveal">
                        <span className="badge badge-blue">
                            <span className="hero__pulse-dot" />
                            MVP · Chest X-Ray Analysis
                        </span>
                        <span className="badge badge-green">HIPAA Aligned</span>
                    </div>

                    <h1 className="hero__title reveal">
                        AI-Powered Diagnostics
                        <span className="hero__title-gradient"> for Every Clinic</span>
                    </h1>

                    <p className="hero__subtitle reveal">
                        MediScan AI gives frontline health workers instant, explainable medical image analysis.
                        No radiologist required. No specialty hardware needed. Just upload and diagnose.
                    </p>

                    <div className="hero__actions reveal">
                        <Link to="/diagnose" className="btn btn-primary" id="hero-try-demo">
                            <Zap size={18} />
                            Try Live Demo
                        </Link>
                        <Link to="/how-it-works" className="btn btn-outline" id="hero-how-it-works">
                            How It Works
                            <ArrowRight size={16} />
                        </Link>
                    </div>

                    <div className="hero__stats reveal">
                        {STATS.map((s, i) => (
                            <div key={i} className="hero__stat">
                                <span className="hero__stat-value">{s.value}</span>
                                <span className="hero__stat-label">{s.label}</span>
                                <span className="hero__stat-sub">{s.sublabel}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="hero__scan-demo reveal">
                    <div className="container">
                        <ScanDemo />
                    </div>
                </div>

                <button className="hero__scroll-hint" onClick={scrollToFeatures} aria-label="Scroll down">
                    <ChevronDown size={22} />
                </button>
            </section>

            {/* ---- PROBLEM SECTION ---- */}
            <section className="section problem-section">
                <div className="container">
                    <div className="problem__header reveal">
                        <span className="section-label">The Problem</span>
                        <h2 className="section-title">A Global Diagnostic Crisis</h2>
                        <p className="section-subtitle">
                            Billions of people lack access to basic medical imaging interpretation. MediScan AI bridges this gap.
                        </p>
                    </div>
                    <div className="grid-4 reveal">
                        {PROBLEM_STATS.map((s, i) => (
                            <div key={i} className="problem-stat-card">
                                <div className="problem-stat__value">{s.value}</div>
                                <div className="problem-stat__label">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ---- FEATURES ---- */}
            <section className="section" id="features">
                <div className="container">
                    <div className="reveal">
                        <span className="section-label">Capabilities</span>
                        <h2 className="section-title">Everything You Need to Diagnose</h2>
                        <p className="section-subtitle">Engineered for real-world clinical environments where speed and accuracy are life-critical.</p>
                    </div>
                    <div className="grid-3 features-grid reveal">
                        {FEATURES.map((f, i) => (
                            <div key={i} className="feature-card">
                                <div className="feature-card__icon" style={{ color: f.color, background: `${f.color}18` }}>
                                    {f.icon}
                                </div>
                                <h3 className="feature-card__title">{f.title}</h3>
                                <p className="feature-card__desc">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ---- URGENCY ENGINE ---- */}
            <section className="section urgency-section">
                <div className="container">
                    <div className="urgency__inner">
                        <div className="urgency__left reveal">
                            <span className="section-label">Scoring Engine</span>
                            <h2 className="section-title">4-Tier Urgency Classification</h2>
                            <p className="section-subtitle">
                                Our proprietary scoring engine maps AI confidence directly to clinically calibrated urgency tiers with clear recommended actions.
                            </p>
                            <Link to="/diagnose" className="btn btn-primary" style={{ marginTop: 28 }} id="urgency-try-btn">
                                <Zap size={16} /> Try the Engine
                            </Link>
                        </div>
                        <div className="urgency__right reveal">
                            {URGENCY_TIERS.map((t, i) => (
                                <div key={i} className="urgency-tier-card">
                                    <div className="urgency-tier-card__top">
                                        <span className={`badge urgency-${t.label.toLowerCase()}`}>{t.label}</span>
                                        <span className="urgency-tier-card__range">{t.range} confidence</span>
                                    </div>
                                    <div className="progress-bar-track" style={{ marginTop: 12 }}>
                                        <div
                                            className="progress-bar-fill"
                                            style={{ width: `${t.width}%`, background: t.color }}
                                        />
                                    </div>
                                    <p className="urgency-tier-card__action">{t.action}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ---- TECH STACK ---- */}
            <section className="section tech-section">
                <div className="container">
                    <div className="reveal" style={{ textAlign: 'center', marginBottom: 60 }}>
                        <span className="section-label">Technology</span>
                        <h2 className="section-title">Built on Proven Foundations</h2>
                    </div>
                    <div className="tech-grid reveal">
                        {[
                            { name: 'EfficientNet-B4', detail: 'Google Brain (2019)', tag: 'AI Model' },
                            { name: 'React 18 PWA', detail: 'Hooks + ServiceWorker', tag: 'Frontend' },
                            { name: 'Python Flask', detail: 'REST API + Pipeline', tag: 'Backend' },
                            { name: 'Grad-CAM', detail: 'Class Activation Maps', tag: 'Explainability' },
                            { name: 'NIH Dataset', detail: '112,120 X-ray images', tag: 'Training Data' },
                            { name: 'Kubernetes', detail: 'AWS EKS / GKE HPA', tag: 'Infrastructure' },
                            { name: 'Redis', detail: 'Queue + Session Cache', tag: 'Caching' },
                            { name: 'TF Lite WASM', detail: 'In-browser inference', tag: 'Offline (PWA)' },
                        ].map((t, i) => (
                            <div key={i} className="tech-chip">
                                <span className="tech-chip__tag">{t.tag}</span>
                                <span className="tech-chip__name">{t.name}</span>
                                <span className="tech-chip__detail">{t.detail}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ---- CTA ---- */}
            <section className="section cta-section">
                <div className="container">
                    <div className="cta-card reveal">
                        <div className="cta-card__glow" />
                        <span className="section-label">Get Started</span>
                        <h2 className="cta-card__title">Ready to scan your first X-ray?</h2>
                        <p className="cta-card__sub">Try MediScan AI in our interactive demo. No signup required. No data stored.</p>
                        <div className="cta-card__actions">
                            <Link to="/diagnose" className="btn btn-primary" id="cta-demo-btn">
                                <Zap size={18} />
                                Launch Free Demo
                            </Link>
                            <Link to="/architecture" className="btn btn-outline" id="cta-arch-btn">
                                View Architecture
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

/* ---- Internal Scan Demo Component ---- */
function ScanDemo() {
    return (
        <div className="scan-demo">
            <div className="scan-demo__xray">
                <div className="scan-demo__scan-line" />
                <svg className="scan-demo__xray-svg" viewBox="0 0 200 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Stylized chest X-ray outline */}
                    <rect x="10" y="10" width="180" height="220" rx="12" fill="#0a1628" stroke="#388bfd22" strokeWidth="1" />
                    <ellipse cx="100" cy="120" rx="70" ry="85" fill="none" stroke="#88aacc22" strokeWidth="1.5" />
                    {/* Ribs */}
                    {[0, 1, 2, 3, 4, 5].map(i => (
                        <ellipse key={i} cx="100" cy={60 + i * 22} rx={55 - i * 1} ry={10 + i * 2} fill="none" stroke={`rgba(100,160,220,${0.15 - i * 0.01})`} strokeWidth="1" />
                    ))}
                    {/* Spine */}
                    <rect x="95" y="30" width="10" height="180" rx="5" fill="rgba(140,180,220,0.1)" />
                    {/* Heart */}
                    <ellipse cx="85" cy="125" rx="25" ry="30" fill="rgba(248,81,73,0.15)" stroke="rgba(248,81,73,0.3)" strokeWidth="1" />
                    {/* Lungs */}
                    <ellipse cx="65" cy="115" rx="28" ry="38" fill="rgba(56,139,253,0.08)" stroke="rgba(56,139,253,0.2)" strokeWidth="1" />
                    <ellipse cx="135" cy="115" rx="28" ry="38" fill="rgba(56,139,253,0.08)" stroke="rgba(56,139,253,0.2)" strokeWidth="1" />
                    {/* Heatmap blob — represents Grad-CAM */}
                    <ellipse cx="140" cy="130" rx="18" ry="22" fill="rgba(248,81,73,0.25)" />
                    <ellipse cx="140" cy="130" rx="10" ry="12" fill="rgba(248,81,73,0.45)" />
                </svg>
                <div className="scan-demo__label">Chest X-Ray · Grad-CAM Active</div>
            </div>
            <div className="scan-demo__result">
                <div className="scan-demo__result-header">
                    <Activity size={16} style={{ color: '#388bfd' }} />
                    <span>Analysis Result</span>
                    <span className="scan-demo__live">● LIVE</span>
                </div>
                <div className="scan-demo__diagnosis">
                    <span className="scan-demo__dx-label">Diagnosis</span>
                    <span className="scan-demo__dx-value">Pneumonia</span>
                </div>
                <div className="scan-demo__confidence">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Confidence</span>
                        <span style={{ fontSize: '0.78rem', color: '#388bfd', fontWeight: 700 }}>87%</span>
                    </div>
                    <div className="progress-bar-track" style={{ marginTop: 6 }}>
                        <div className="progress-bar-fill" style={{ width: '87%', background: 'linear-gradient(90deg, #388bfd, #f85149)' }} />
                    </div>
                </div>
                <div className="scan-demo__urgency urgency-critical">
                    🔴 CRITICAL — Immediate Intervention Required
                </div>
                <p className="scan-demo__explanation">
                    The AI detected signs consistent with bacterial pneumonia in the lower right lobe. Immediate medical evaluation is strongly recommended.
                </p>
                <div className="scan-demo__meta">
                    <span>⚡ 1,840ms</span>
                    <span>EfficientNet-B4 v1.2</span>
                </div>
            </div>
        </div>
    )
}
