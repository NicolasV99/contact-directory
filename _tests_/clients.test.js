const request = require('supertest');
const app = require('../server');
const { initDb, closeDb } = require('../data/database');

beforeAll((done) => {
  initDb((err) => {
    if (err) {
      done.fail(new Error('Failed to initialize database'));
    } else {
      done();
    }
  });
});

// getAllClients Test
describe('GET /clients', () => {
  it('should return all clients', async () => {
    const response = await request(app).get('/clients');
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

// getSingleClient Test
describe('GET /clients/:id', () => {
  it('should return one client with an id that matches parameter', async () => {
    const response = await request(app).get('/clients/67af87b89ab988bc3c1699bc');
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toHaveProperty('_id', '67af87b89ab988bc3c1699bc');
  });
});

// Close database connection after all tests
afterAll(async () => {
  await closeDb();
});
