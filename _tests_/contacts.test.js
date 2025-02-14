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

// getAllContacts Test
describe('GET /contacts', () => {
  it('should return all contacts', async () => {
    const response = await request(app).get('/contacts');
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

// getSingleContact Test
describe('GET /contacts/:id', () => {
  it('should return one contact with an id that matches parameter', async () => {
    const response = await request(app).get('/contacts/67a2b90e6ff6bd57e66e34ff');
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toHaveProperty('_id', '67a2b90e6ff6bd57e66e34ff');
  });
});

// Close database connection after all tests
afterAll(async () => {
  await closeDb();
});

