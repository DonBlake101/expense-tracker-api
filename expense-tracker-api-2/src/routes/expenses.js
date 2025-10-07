import { Router } from 'express';

export const expensesRouter = Router();

let expenses = [
  { id: '1', title: 'Coffee', amount: 3.50, category: 'Food', date: '2025-01-01' }
];

expensesRouter.get('/', (_req, res) => {
  res.json(expenses);
});

expensesRouter.post('/', (req, res) => {
  const { title, amount, category, date } = req.body;
  if (!title || typeof amount !== 'number') {
    return res.status(400).json({ error: 'Invalid payload' });
  }
  const expense = { id: String(Date.now()), title, amount, category, date };
  expenses.push(expense);
  res.status(201).json(expense);
});

expensesRouter.delete('/:id', (req, res) => {
  const { id } = req.params;
  const before = expenses.length;
  expenses = expenses.filter(e => e.id !== id);
  if (expenses.length === before) return res.status(404).json({ error: 'Not found' });
  res.status(204).send();
});
