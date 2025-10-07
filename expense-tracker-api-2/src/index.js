import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { expensesRouter } from './routes/expenses.js';
import { auth } from './middleware/auth.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => res.json({ ok: true, service: 'expense-tracker-api' }));

app.post('/auth/login', (req, res) => {
  const { email = 'demo@example.com' } = req.body || {};
  const token = jwt.sign({ sub: email }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
  res.json({ token });
});

app.use('/expenses', auth, expensesRouter);

const port = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => console.log(`API listening on http://localhost:${port}`));
}

export default app;
