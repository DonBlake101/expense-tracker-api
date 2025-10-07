# Expense Tracker API

Node.js + Express REST API for tracking expenses with JWT auth, Jest tests, and GitHub Actions CI (in-memory store).

## Endpoints
- `POST /auth/login` → returns a demo JWT (no DB)
- `GET /expenses` → list expenses (protected)
- `POST /expenses` → create an expense (protected)
- `DELETE /expenses/:id` → delete an expense (protected)

## Quickstart
```bash
npm install
cp .env.example .env
npm test
npm run dev
