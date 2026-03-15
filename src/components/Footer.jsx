import { Link } from 'react-router-dom'
import { Activity, Github, Twitter, Linkedin, Heart } from 'lucide-react'
import './Footer.css'

export default function Footer() {
    return (
        <footer className="footer">
            <div className="divider" />
            <div className="container footer__inner">
                <div className="footer__brand">
                    <Link to="/" className="footer__logo-link">
                        <div className="navbar__logo" style={{ width: 32, height: 32 }}>
                            <Activity size={17} />
                        </div>
                        <span className="footer__brand-name">MediScan AI</span>
                    </Link>
                    <p className="footer__tagline">
                        "Bridging the diagnostic gap — one scan at a time"
                    </p>
                    <p className="footer__team">Team Drop2Life · ABES Engineering College · Leader: Anmol Verma</p>
                    <div className="footer__socials">
                        <a href="#" className="footer__social-btn" aria-label="GitHub"><Github size={18} /></a>
                        <a href="#" className="footer__social-btn" aria-label="Twitter"><Twitter size={18} /></a>
                        <a href="#" className="footer__social-btn" aria-label="LinkedIn"><Linkedin size={18} /></a>
                    </div>
                </div>

                <div className="footer__links-grid">
                    <div className="footer__links-col">
                        <h4 className="footer__links-title">Product</h4>
                        <ul>
                            <li><Link to="/diagnose">Live Demo</Link></li>
                            <li><Link to="/how-it-works">How It Works</Link></li>
                            <li><Link to="/architecture">Architecture</Link></li>
                            <li><a href="#">API Docs</a></li>
                        </ul>
                    </div>
                    <div className="footer__links-col">
                        <h4 className="footer__links-title">Technology</h4>
                        <ul>
                            <li><a href="#">EfficientNet-B4</a></li>
                            <li><a href="#">Grad-CAM</a></li>
                            <li><a href="#">TF Lite WASM</a></li>
                            <li><a href="#">NIH Dataset</a></li>
                        </ul>
                    </div>
                    <div className="footer__links-col">
                        <h4 className="footer__links-title">Security</h4>
                        <ul>
                            <li><a href="#">HIPAA Aligned</a></li>
                            <li><a href="#">Zero Storage Policy</a></li>
                            <li><a href="#">AES-256 Encrypted</a></li>
                            <li><a href="#">TLS 1.3</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="footer__bottom">
                    <p>© 2026 MediScan AI · Drop2Life. All rights reserved.</p>
                    <p className="footer__made-with">Made with <Heart size={13} fill="currentColor" /> for frontline health workers worldwide.</p>
                </div>
            </div>
        </footer>
    )
}
