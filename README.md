# NHETIS Demo – Personal Career & Education Advisor (Free Tools)

A 1–2 day hackathon-ready demo implementing core features:
- Aptitude & interest-based course recommendations
- Course → skills → career mapping (dynamic charts)
- Location-based government college programs
- Admissions/Scholarship Alerts
- Simple RAG-style curated dataset (JSON) for trusted outputs

## Tech (Free)
- **Backend:** Node.js + Express (no DB required for demo; JSON files)
- **Frontend:** React + Vite + Bootstrap (Creative Tim-like layout), Recharts for charts
- **Auth:** (Optional later) Firebase/Clerk free tiers
- **LLM:** (Optional later) Groq/OpenRouter free tiers; fallback to rules engine

## Run locally
Terminal 1 (backend):
```bash
cd backend
npm i
npm run start
# http://localhost:5050
```

Terminal 2 (frontend):
```bash
cd frontend
npm i
npm run dev
# http://localhost:5173
```

## Configure
Frontend can point to backend via env:
- Create `frontend/.env` with `VITE_API_URL=http://localhost:5050`

## Deploy (free)
- Backend: Render.com free web service or Railway free tier
- Frontend: Vercel or Netlify

## Notes
- Data is sample. Replace JSONs in `backend/data` with verified government & accreditation sources when available.
- For multilingual, add i18n JSONs and toggle UI labels.
- Add PWA for offline (Workbox) if time permits.