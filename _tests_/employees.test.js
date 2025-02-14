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

// getAllEmployees Test
describe('GET /employees', () => {
  it('should return all employees', async () => {
    const response = await request(app).get('/employees');
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

// getSingleEmployee Test
describe('GET /employees/:id', () => {
  it('should return one employee with an id that matches parameter', async () => {
    const response = await request(app).get('/employees/67af899d9ab988bc3c1699c1');
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toHaveProperty('_id', '67af899d9ab988bc3c1699c1');
  });
});

// Close database connection after all tests
afterAll(async () => {
  await closeDb();
});
