import { useEffect } from 'react'
import { Upload, Cpu, Eye, BarChart2, FileText, ShieldCheck, Wifi, ArrowRight } from 'lucide-react'
import './HowItWorks.css'

const PIPELINE_STEPS = [
    {
        icon: <Upload size={26} />,
        step: '01',
        title: 'Upload & Validate',
        desc: 'The user uploads a JPEG or PNG chest X-ray (max 10 MB) via drag-and-drop or file picker. Client-side MIME validation is enforced instantly.',
        detail: 'MIME check · Size limit · Preview thumbnail displayed < 1s',
        color: '#388bfd',
    },
    {
        icon: <Cpu size={26} />,
        step: '02',
        title: 'Preprocessing Pipeline',
        desc: 'The image is securely transmitted to the Flask inference worker. It undergoes resizing to 380×380, RGB conversion, pixel normalization, and CLAHE contrast enhancement.',
        detail: 'CLAHE → Resize → Normalize → Tensor → Batch dimension',
        color: '#39d0e8',
    },
    {
        icon: <Eye size={26} />,
        step: '03',
        title: 'EfficientNet-B4 Inference',
        desc: 'The preprocessed tensor is passed through our fine-tuned EfficientNet-B4 model. A forward pass computes class logits; softmax converts them to probabilities.',
        detail: 'NIH Chest X-ray Dataset · 112,120 images · > 92% AUC',
        color: '#a371f7',
    },
    {
        icon: <Eye size={26} />,
        step: '04',
        title: 'Grad-CAM Heatmap Generation',
        desc: 'Gradient-Weighted Class Activation Mapping (Grad-CAM) extracts gradients from the final convolutional layer, generating a visual heatmap of the regions that influenced the diagnosis.',
        detail: 'Upsampled activation map → Jet colormap → Base64 PNG overlay',
        color: '#f0883e',
    },
    {
        icon: <BarChart2 size={26} />,
        step: '05',
        title: 'Urgency Scoring',
        desc: 'Confidence probability is mapped to one of four urgency tiers using a predefined clinical thresholds table: Low, Moderate, High, or Critical.',
        detail: '< 40% → Low · 40–65% → Moderate · 65–85% → High · > 85% → Critical',
        color: '#d29922',
    },
    {
        icon: <FileText size={26} />,
        step: '06',
        title: 'Response Assembly & Delivery',
        desc: 'The analysis JSON is assembled: diagnosis label, confidence %, urgency tier, plain-language explanation, and the Base64 heatmap. Returned to the client in < 3 seconds.',
        detail: 'JSON response · Image data purged immediately from server RAM',
        color: '#3fb950',
    },
]

const SAFETY_FEATURES = [
    { icon: <ShieldCheck size={22} />, title: 'Zero Storage Policy', desc: 'All medical images are immediately purged from server memory post-analysis. No image ever touches disk — fully HIPAA-aligned.' },
    { icon: <ShieldCheck size={22} />, title: 'Confidence Floor', desc: 'If AI confidence is below 75%, the system automatically returns "Consult a Specialist" — preventing false diagnoses in edge cases.' },
    { icon: <ShieldCheck size={22} />, title: 'AES-256 Encryption', desc: 'All data in-transit uses TLS 1.3. Processing pipeline memory is encrypted at-rest with AES-256.' },
    { icon: <Wifi size={22} />, title: 'Offline Capability (Phase 2)', desc: 'A TF Lite WASM model will enable full in-browser offline inference via Service Worker for zero-connectivity rural clinics.' },
]

export default function HowItWorks() {
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in-view') }),
            { threshold: 0.1 }
        )
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
        return () => observer.disconnect()
    }, [])

    return (
        <main className="how-page">
            <div className="how-page__hero">
                <div className="container">
                    <div className="reveal">
                        <span className="section-label">Pipeline</span>
                        <h1 className="how-page__title">How MediScan AI Works</h1>
                        <p className="how-page__subtitle">
                            From raw X-ray pixel data to clinical urgency classifications — a transparent look at the full AI inference pipeline.
                        </p>
                    </div>
                </div>
            </div>

            {/* Pipeline Timeline */}
            <section className="section">
                <div className="container">
                    <div className="pipeline-timeline">
                        {PIPELINE_STEPS.map((step, i) => (
                            <div key={i} className="pipeline-step reveal">
                                <div className="pipeline-step__connector">
                                    <div className="pipeline-step__icon" style={{ background: `${step.color}1a`, color: step.color, boxShadow: `0 0 24px ${step.color}33` }}>
                                        {step.icon}
                                    </div>
                                    {i < PIPELINE_STEPS.length - 1 && <div className="pipeline-step__line" />}
                                </div>
                                <div className="pipeline-step__content">
                                    <div className="pipeline-step__num" style={{ color: step.color }}>Step {step.step}</div>
                                    <h3 className="pipeline-step__title">{step.title}</h3>
                                    <p className="pipeline-step__desc">{step.desc}</p>
                                    <div className="pipeline-step__detail" style={{ borderColor: `${step.color}30`, color: step.color, background: `${step.color}0d` }}>
                                        {step.detail}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Data Flow Diagram */}
            <section className="section how-flow-section">
                <div className="container">
                    <div className="reveal" style={{ marginBottom: 48 }}>
                        <span className="section-label">Architecture</span>
                        <h2 className="section-title">System Data Flow</h2>
                    </div>
                    <div className="flow-diagram reveal">
                        {[
                            { label: 'React PWA', sublabel: 'Client / UI Layer', color: '#388bfd' },
                            { label: 'Node.js Gateway', sublabel: 'Routing / Validation', color: '#39d0e8' },
                            { label: 'Redis Queue', sublabel: 'Job Management', color: '#a371f7' },
                            { label: 'Flask Inference', sublabel: 'AI Pipeline', color: '#d29922' },
                            { label: 'EfficientNet-B4', sublabel: 'Model Layer', color: '#3fb950' },
                        ].map((node, i, arr) => (
                            <div key={i} className="flow-diagram__item">
                                <div className="flow-node" style={{ border: `1px solid ${node.color}44`, background: `${node.color}0d` }}>
                                    <span className="flow-node__label" style={{ color: node.color }}>{node.label}</span>
                                    <span className="flow-node__sub">{node.sublabel}</span>
                                </div>
                                {i < arr.length - 1 && (
                                    <div className="flow-arrow">
                                        <ArrowRight size={18} style={{ color: 'var(--text-muted)' }} />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Security */}
            <section className="section">
                <div className="container">
                    <div className="reveal" style={{ marginBottom: 48 }}>
                        <span className="section-label">Security & Reliability</span>
                        <h2 className="section-title">Built for Patient Safety</h2>
                        <p className="section-subtitle">Security is a first-class engineering concern — not an afterthought.</p>
                    </div>
                    <div className="grid-2 reveal">
                        {SAFETY_FEATURES.map((f, i) => (
                            <div key={i} className="safety-card">
                                <div className="safety-card__icon" style={{ color: '#3fb950', background: 'rgba(63,185,80,0.12)' }}>{f.icon}</div>
                                <div>
                                    <h3 className="safety-card__title">{f.title}</h3>
                                    <p className="safety-card__desc">{f.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
}
