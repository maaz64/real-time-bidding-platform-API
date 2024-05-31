const request = require('supertest');
const app = require('../index');

describe('Bid API Tests', () => {
  let token;

  beforeAll(async () => {
    const res = await request(app)
      .post('/users/login')
      .send({
        username: 'testuser',
        password: 'password123'
      });
    token = res.body.token;
  });

  it('should get all bids for an item', async () => {
    const res = await request(app).get('/items/1/bids'); // Adjust item ID as needed
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should place a new bid on an item', async () => {
    const res = await request(app)
      .post('/items/1/bids') // Adjust item ID as needed
      .set('Authorization', `Bearer ${token}`)
      .send({
        bidAmount: 200
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });
});
