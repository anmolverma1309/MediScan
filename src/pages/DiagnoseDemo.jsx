import { useState, useCallback, useRef, useEffect } from 'react'
import { Upload, X, Zap, Activity, AlertTriangle, CheckCircle, Info, Download, RefreshCw } from 'lucide-react'
import './DiagnoseDemo.css'

const URGENCY_MAP = {
    low: { label: 'Low', color: '#3fb950', bg: 'rgba(63,185,80,0.12)', border: 'rgba(63,185,80,0.3)', action: 'Routine follow-up recommended' },
    moderate: { label: 'Moderate', color: '#d29922', bg: 'rgba(210,153,34,0.12)', border: 'rgba(210,153,34,0.3)', action: 'Schedule appointment soon' },
    high: { label: 'High', color: '#f0883e', bg: 'rgba(240,136,62,0.12)', border: 'rgba(240,136,62,0.3)', action: 'Urgent specialist referral required' },
    critical: { label: 'Critical', color: '#f85149', bg: 'rgba(248,81,73,0.12)', border: 'rgba(248,81,73,0.3)', action: 'Immediate intervention required' },
}

const MOCK_RESULTS = [
    {
        diagnosis: 'Pneumonia',
        confidence: 0.87,
        urgency: 'critical',
        explanation: 'The AI detected signs consistent with bacterial pneumonia in the lower right lobe. Increased opacity and consolidation patterns were identified. Immediate medical evaluation is strongly recommended.',
        model_version: 'efficientnet-b4-v1.2',
        processing_time_ms: 1840,
    },
    {
        diagnosis: 'Normal',
        confidence: 0.93,
        urgency: 'low',
        explanation: 'The AI analysis found no significant abnormalities in this chest X-ray. Lung fields appear clear and cardiac silhouette is within normal limits. Routine follow-up recommended.',
        model_version: 'efficientnet-b4-v1.2',
        processing_time_ms: 1620,
    },
    {
        diagnosis: 'Unclear / Consult Specialist',
        confidence: 0.55,
        urgency: 'high',
        explanation: 'The AI could not form a highly confident diagnosis. Some atypical patterns are present. Please consult a qualified radiologist for definitive interpretation.',
        model_version: 'efficientnet-b4-v1.2',
        processing_time_ms: 1705,
    },
]

export default function DiagnoseDemo() {
    const [dragOver, setDragOver] = useState(false)
    const [imageFile, setImageFile] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)
    const [phase, setPhase] = useState('idle') // idle | uploading | processing | complete | error
    const [result, setResult] = useState(null)
    const [progress, setProgress] = useState(0)
    const [showHeatmap, setShowHeatmap] = useState(true)
    const fileInputRef = useRef(null)
    const resultRef = useRef(null)

    const handleFile = useCallback((file) => {
        if (!file) return
        const allowed = ['image/jpeg', 'image/png', 'image/jpg']
        if (!allowed.includes(file.type)) {
            alert('Please upload a JPEG or PNG image.')
            return
        }
        if (file.size > 10 * 1024 * 1024) {
            alert('File must be under 10 MB.')
            return
        }
        setImageFile(file)
        setPhase('uploading')
        const reader = new FileReader()
        reader.onload = e => {
            setImagePreview(e.target.result)
            runMockInference()
        }
        reader.readAsDataURL(file)
    }, [])

    const runMockInference = () => {
        setProgress(0)
        setPhase('processing')
        let prog = 0
        const interval = setInterval(() => {
            prog += Math.random() * 15 + 5
            if (prog >= 100) {
                prog = 100
                clearInterval(interval)
                const r = MOCK_RESULTS[Math.floor(Math.random() * MOCK_RESULTS.length)]
                setResult(r)
                setPhase('complete')
                setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 300)
            }
            setProgress(Math.min(prog, 100))
        }, 120)
    }

    const reset = () => {
        setImageFile(null); setImagePreview(null)
        setPhase('idle'); setResult(null); setProgress(0)
    }

    const onDrop = useCallback(e => {
        e.preventDefault(); setDragOver(false)
        handleFile(e.dataTransfer.files[0])
    }, [handleFile])

    const urgencyInfo = result ? URGENCY_MAP[result.urgency] : null

    return (
        <main className="diagnose-page">
            <div className="container">
                <div className="diagnose__header">
                    <span className="section-label">Live Demo</span>
                    <h1 className="diagnose__title">AI Diagnosis Engine</h1>
                    <p className="diagnose__subtitle">
                        Upload a chest X-ray to experience MediScan AI's inference pipeline. This is a demonstration using a pre-trained EfficientNet-B4 model.
                    </p>
                    <div className="diagnose__disclaimer">
                        <Info size={15} />
                        <span>This demo uses mock AI inference. Do not use for actual medical decisions.</span>
                    </div>
                </div>

                <div className="diagnose__workspace">
                    {/* Upload Panel */}
                    <div className="diagnose__upload-panel">
                        {phase === 'idle' && (
                            <div
                                id="upload-zone"
                                className={`upload-zone ${dragOver ? 'upload-zone--dragover' : ''}`}
                                onClick={() => fileInputRef.current?.click()}
                                onDragOver={e => { e.preventDefault(); setDragOver(true) }}
                                onDragLeave={() => setDragOver(false)}
                                onDrop={onDrop}
                                role="button"
                                tabIndex={0}
                            >
                                <div className="upload-zone__icon">
                                    <Upload size={32} />
                                </div>
                                <h3 className="upload-zone__title">Drop your X-ray here</h3>
                                <p className="upload-zone__sub">Drag & drop or click to browse</p>
                                <p className="upload-zone__meta">Supports JPEG, PNG · Max 10 MB</p>
                                <div className="btn btn-primary upload-zone__btn">
                                    <Upload size={16} /> Select Image
                                </div>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/jpeg,image/png"
                                    style={{ display: 'none' }}
                                    onChange={e => handleFile(e.target.files[0])}
                                    id="file-input"
                                />
                            </div>
                        )}

                        {(phase === 'uploading' || phase === 'processing') && (
                            <div className="processing-state">
                                <div className="processing-xray">
                                    {imagePreview && <img src={imagePreview} alt="Uploaded scan" className="processing-xray__img" />}
                                    <div className="processing-xray__scan-line" />
                                    <div className="processing-xray__overlay">
                                        <div className="processing-spinner" />
                                    </div>
                                </div>
                                <h3 className="processing-state__title">
                                    {phase === 'uploading' ? 'Uploading Scan...' : 'Running AI Inference...'}
                                </h3>
                                <div className="processing-steps">
                                    {['Validating image', 'Preprocessing (CLAHE, Resize to 380×380)', 'EfficientNet-B4 Forward Pass', 'Computing Grad-CAM heatmap', 'Applying urgency mapping'].map((step, i) => (
                                        <div key={i} className={`processing-step ${progress > i * 20 ? 'processing-step--done' : ''} ${Math.floor(progress / 20) === i ? 'processing-step--active' : ''}`}>
                                            <span className="processing-step__dot" />
                                            <span>{step}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="progress-bar-track" style={{ marginTop: 16 }}>
                                    <div className="progress-bar-fill" style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #388bfd, #39d0e8)' }} />
                                </div>
                                <p className="processing-state__pct">{Math.round(progress)}% complete</p>
                            </div>
                        )}

                        {phase === 'complete' && imagePreview && (
                            <div className="image-result-panel">
                                <div className="image-result-panel__top">
                                    <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Uploaded Scan</span>
                                    <div style={{ display: 'flex', gap: 8 }}>
                                        <button className="toggle-btn" onClick={() => setShowHeatmap(!showHeatmap)} id="toggle-heatmap-btn">
                                            {showHeatmap ? 'Hide' : 'Show'} Heatmap
                                        </button>
                                        <button className="icon-btn" onClick={reset} id="reset-scan-btn"><RefreshCw size={15} /></button>
                                    </div>
                                </div>
                                <div className="image-result-panel__img-wrap">
                                    <img src={imagePreview} alt="Analyzed scan" className="image-result-panel__img" />
                                    {showHeatmap && result?.urgency !== 'low' && (
                                        <div className="heatmap-overlay">
                                            <div className="heatmap-blob heatmap-blob--1" />
                                            <div className="heatmap-blob heatmap-blob--2" />
                                        </div>
                                    )}
                                    {showHeatmap && (
                                        <div className="heatmap-legend">
                                            <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Grad-CAM Activation</span>
                                            <div className="heatmap-legend__bar" />
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                                                <span>Low</span><span>High</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Result Panel */}
                    {phase === 'complete' && result && (
                        <div className="result-panel" ref={resultRef}>
                            <div className="result-panel__header">
                                <Activity size={17} style={{ color: '#388bfd' }} />
                                <span>Analysis Complete</span>
                                <span className="result-panel__ms">{result.processing_time_ms}ms</span>
                            </div>

                            <div className="result-diagnosis">
                                <div className="result-diagnosis__label">Diagnosis</div>
                                <div className="result-diagnosis__value">{result.diagnosis}</div>
                            </div>

                            <div className="result-confidence">
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                                    <span className="result__sublabel">Confidence Score</span>
                                    <span style={{ fontWeight: 700, color: '#388bfd' }}>{Math.round(result.confidence * 100)}%</span>
                                </div>
                                <div className="progress-bar-track">
                                    <div className="progress-bar-fill" style={{ width: `${result.confidence * 100}%`, background: urgencyInfo?.color }} />
                                </div>
                            </div>

                            <div className="result-urgency" style={{ background: urgencyInfo?.bg, border: `1px solid ${urgencyInfo?.border}` }}>
                                <div className="result-urgency__top">
                                    <span className="result__sublabel">Urgency Level</span>
                                    <span className="result-urgency__tier" style={{ color: urgencyInfo?.color }}>
                                        ● {urgencyInfo?.label}
                                    </span>
                                </div>
                                <p className="result-urgency__action" style={{ color: urgencyInfo?.color }}>{urgencyInfo?.action}</p>
                            </div>

                            <div className="result-explanation">
                                <div className="result__sublabel" style={{ marginBottom: 8 }}>AI Explanation</div>
                                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{result.explanation}</p>
                            </div>

                            <div className="result-meta">
                                <div className="result-meta__item">
                                    <span>Model</span>
                                    <span>{result.model_version}</span>
                                </div>
                                <div className="result-meta__item">
                                    <span>Latency</span>
                                    <span>{result.processing_time_ms}ms</span>
                                </div>
                                <div className="result-meta__item">
                                    <span>Storage</span>
                                    <span className="result-meta__secure"><CheckCircle size={12} /> Zero — HIPAA</span>
                                </div>
                            </div>

                            <div className="result-actions">
                                <button className="btn btn-primary" style={{ flex: 1 }} id="download-report-btn">
                                    <Download size={16} /> Download PDF Report
                                </button>
                                <button className="btn btn-outline" onClick={reset} id="new-scan-btn">
                                    <RefreshCw size={16} /> New Scan
                                </button>
                            </div>

                            <div className="result-safety-note">
                                <AlertTriangle size={13} style={{ color: 'var(--accent-amber)', flexShrink: 0 }} />
                                <span>This is an AI-assisted screening tool. Always validate results with a qualified radiologist before making clinical decisions.</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}
