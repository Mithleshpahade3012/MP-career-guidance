# Career Guidance Frontend (Vite + React + Tailwind + Framer Motion + GSAP)

This is a ready-to-run frontend built to connect to your FastAPI backend at:
`POST http://127.0.0.1:8000/chat`

## Quick start

1. Unzip this folder
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run dev server:
   ```bash
   npm run dev
   ```
4. Open http://localhost:5173

## Notes

- The app uses absolute backend URL `http://127.0.0.1:8000/chat`. Ensure your FastAPI server is running.
- If you prefer to use a proxy, edit `vite.config.js` and replace API calls to `/api/chat` or change the proxy.
- Included libraries: Tailwind, Framer Motion, GSAP, Axios, React Router.

