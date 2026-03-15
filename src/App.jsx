import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import DiagnoseDemo from './pages/DiagnoseDemo'
import HowItWorks from './pages/HowItWorks'
import Architecture from './pages/Architecture'
import Footer from './components/Footer'
import './App.css'

function App() {
    return (
        <div className="App">
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/diagnose" element={<DiagnoseDemo />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/architecture" element={<Architecture />} />
            </Routes>
            <Footer />
        </div>
    )
}

export default App
