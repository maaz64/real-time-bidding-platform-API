const request = require('supertest');
const app = require('../index');


describe('User API Tests', () => {
  let token;

  beforeAll(async () => {
  
  });

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/users/register')
      .send({
        username: 'testuser',
        password: 'password123',
        email: 'testuser@example.com'
      });
    expect(res.statusCode).toEqual(201);
  });

  it('should login a user', async () => {
    const res = await request(app)
      .post('/users/login')
      .send({
        username: 'testuser',
        password: 'password123'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token; // Save the token for future tests
  });

  it('should get user profile', async () => {
    const res = await request(app)
      .get('/users/profile')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('username', 'testuser');
  });
});
