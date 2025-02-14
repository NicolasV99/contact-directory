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

// getAllCompanies Test
describe('GET /companies', () => {
  it('should return all companies', async () => {
    const response = await request(app).get('/companies');
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

// getSingleCompany Test
describe('GET /companies/:id', () => {
  it('should return one client with an id that matches parameter', async () => {
    const response = await request(app).get('/companies/67af89469ab988bc3c1699be');
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toHaveProperty('_id', '67af89469ab988bc3c1699be');
  });
});

// Close database connection after all tests
afterAll(async () => {
  await closeDb();
});
