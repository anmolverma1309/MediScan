import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Activity, Menu, X, Zap } from 'lucide-react'
import './Navbar.css'

const NAV_LINKS = [
    { to: '/', label: 'Home' },
    { to: '/diagnose', label: 'Diagnose' },
    { to: '/how-it-works', label: 'How It Works' },
    { to: '/architecture', label: 'Architecture' },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const location = useLocation()

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        setMobileOpen(false)
    }, [location])

    return (
        <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
            <div className="container navbar__inner">
                <Link to="/" className="navbar__brand">
                    <div className="navbar__logo">
                        <Activity size={20} strokeWidth={2.5} />
                    </div>
                    <div className="navbar__brand-text">
                        <span className="navbar__brand-name">MediScan</span>
                        <span className="navbar__brand-badge">AI</span>
                    </div>
                </Link>

                <ul className={`navbar__links ${mobileOpen ? 'navbar__links--open' : ''}`}>
                    {NAV_LINKS.map(link => (
                        <li key={link.to}>
                            <Link
                                to={link.to}
                                className={`navbar__link ${location.pathname === link.to ? 'navbar__link--active' : ''}`}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="navbar__actions">
                    <Link to="/diagnose" className="btn btn-primary" id="nav-cta-btn">
                        <Zap size={16} />
                        Try Demo
                    </Link>
                    <button
                        className="navbar__mobile-toggle"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                        id="navbar-mobile-toggle"
                    >
                        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>
        </nav>
    )
}
