const request = require('supertest');
const app = require('../index');

describe('Item API Tests', () => {
  let token;

  beforeAll(async () => {
    

    const res = await request(app)
      .post('/users/login')
      .send({
        username: 'testuser',
        password: 'password123'
      });
    token = res.body.token;
    console.log("Token" , token)
  });

  

  it('should create a new item', async () => {
    const res = await request(app)
      .post('/items')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Test Item',
        description: 'A test item for bidding',
        startingPrice: 100,
        endTime: '2024-12-31T23:59:59Z'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should get all items', async () => {
    const res = await request(app).get('/items');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should get an item by ID', async () => {
    const res = await request(app).get('/items/1'); // Adjust ID as needed
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
  });

  it('should update an item by ID', async () => {
    const res = await request(app)
      .put('/items/1') 
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Updated Item',
        description: 'An updated description',
        currentPrice: 150
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('name', 'Updated Item');
  });

  it('should delete an item by ID', async () => {
    const res = await request(app)
      .delete('/items/1') // Adjust ID as needed
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(204);
  });
});
