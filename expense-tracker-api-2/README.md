# Expense Tracker API

Node.js + Express REST API with JWT auth, Jest tests, and CI via GitHub Actions.

## Endpoints
- POST /auth/login — returns a demo JWT (no DB).
- GET /expenses — list expenses (protected).
- POST /expenses — create an expense (protected).
- DELETE /expenses/:id — delete an expense (protected).

## Quickstart
```bash
npm install
cp .env.example .env
npm test
npm run dev
```
Then use the token from `/auth/login` to call `/expenses`.
