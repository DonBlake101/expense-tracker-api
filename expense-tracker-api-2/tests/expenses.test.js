import request from 'supertest';
import app from '../src/index.js';

let token;

beforeAll(async () => {
  const res = await request(app).post('/auth/login').send({ email: 'test@example.com' });
  token = res.body.token;
});

test('GET / should be healthy', async () => {
  const res = await request(app).get('/');
  expect(res.status).toBe(200);
  expect(res.body.ok).toBe(true);
});

test('GET /expenses requires auth', async () => {
  const res = await request(app).get('/expenses');
  expect(res.status).toBe(401);
});

test('GET /expenses works with token', async () => {
  const res = await request(app).get('/expenses').set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
});

test('POST /expenses validates input', async () => {
  const res = await request(app).post('/expenses').set('Authorization', `Bearer ${token}`).send({ title: 'Tea' });
  expect(res.status).toBe(400);
});

test('POST /expenses creates expense', async () => {
  const res = await request(app).post('/expenses').set('Authorization', `Bearer ${token}`).send({ title: 'Tea', amount: 2.2, category: 'Food', date: '2025-02-02' });
  expect(res.status).toBe(201);
  expect(res.body.title).toBe('Tea');
});
