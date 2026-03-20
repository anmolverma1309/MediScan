# 🏥 MediScan AI
### Early Disease Detection Powered by Artificial Intelligence
> *"Bridging the diagnostic gap — one scan at a time."*

---

## 📖 About
MediScan AI is a web-based AI diagnostic assistant that analyzes medical images — chest X-rays, skin photos, and retinal scans — and returns an instant diagnosis with a visual heatmap, urgency score, and plain-language explanation. Built for doctors and health workers in low-resource settings where radiologists are scarce.

---

## 🚨 The Problem
- 2/3 of the world lacks access to diagnostic imaging
- Rural India has just **1 radiologist per 100,000 patients**
- Average radiology wait time: **3–14 days**
- Diseases like TB, pneumonia, and melanoma go undetected until it's too late

---

## 💡 Key Features
- 📸 **Image Analysis** — Chest X-rays, skin photos, retinal scans
- 🔥 **Grad-CAM Heatmaps** — Visually highlights the suspicious region
- 🎯 **Credibility Score** — AI confidence score (0–100)
- 🚨 **Urgency Scoring** — Low / Moderate / High / Critical
- 🌐 **Multilingual** — Results in 10+ languages
- 📱 **Offline PWA** — Works on 2G/3G, no install needed
- 🔐 **HIPAA-Aligned** — Images deleted post-analysis

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, Tailwind CSS, PWA |
| Backend | Python Flask, Node.js |
| AI Model | EfficientNet-B4, Grad-CAM |
| Database | PostgreSQL, Redis |
| Deployment | Docker, AWS EC2 |

---

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/drop2life/mediscan-ai.git
cd mediscan-ai

# Frontend
cd frontend && npm install && npm start

# Backend
cd backend && pip install -r requirements.txt && python app.py
```

---

## 📁 Project Structure

```
mediscan-ai/
├── frontend/        # React.js UI
├── backend/         # Flask REST API
├── models/          # EfficientNet-B4 trained model
├── datasets/        # NIH + ISIC dataset references
└── docker-compose.yml
```

---

## ⚠️ Disclaimer
> MediScan AI provides AI-based analysis and **should not replace professional medical diagnosis**. Always consult a qualified healthcare professional.

---

## 👥 Team — Drop2Life
| | |
|---|---|
| **Team Leader** | Anmol Verma |
| **Email** | aanmolverma1309@gmail.com |
| **College** | ABES Engineering College |

---

*Built with ❤️ by Team Drop2Life*
