import { app } from '../index.js';
import request from 'supertest';
import Product from '../models/product.js';
import mongoose from 'mongoose';
import logger from '../config/logger.js';

describe('Product API Endpoints', () => {
  const testProduct = {
    name: 'Jest Test Product',
    price: 99.99,
    quantity: 10,
    category: 'Tests'
  };

  // Database connection setup
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    logger.info('Connected to test database');
  });

  // Clean database before each test
  beforeEach(async () => {
    await Product.deleteMany({});
  });

  // Database disconnection
  afterAll(async () => {
    await mongoose.disconnect();
    logger.info('Disconnected from test database');
  });

  it('should create a new product with valid data', async () => {
    const response = await request(app)
      .post('/api/products')
      .send(testProduct);

    expect(response.statusCode).toBe(201);
    expect(response.body).toMatchObject({
      name: testProduct.name,
      price: testProduct.price,
      quantity: testProduct.quantity
    });
  });

  it('should return 400 when creating product with invalid data', async () => {
    const response = await request(app)
      .post('/api/products')
      .send({ invalidField: 'bad-data' });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  it('should retrieve all products', async () => {
    // Create test data
    await Product.create(testProduct);

    const response = await request(app)
      .get('/api/products');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: testProduct.name
        })
      ])
    );
  });

  it('should get a product by ID', async () => {
    const createdProduct = await Product.create(testProduct);
    
    const response = await request(app)
      .get(`/api/products/${createdProduct._id}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject({
      _id: createdProduct._id.toString(),
      name: testProduct.name
    });
  });

  it('should update a product successfully', async () => {
    const createdProduct = await Product.create(testProduct);
    
    const updateData = { price: 149.99, quantity: 15 };
    const response = await request(app)
      .put(`/api/products/${createdProduct._id}`)
      .send(updateData);

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject(updateData);
  });

  it('should delete a product', async () => {
    const createdProduct = await Product.create(testProduct);
    
    const response = await request(app)
      .delete(`/api/products/${createdProduct._id}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      message: 'Product deleted'
    });

    // Verify deletion
    const verifyResponse = await request(app)
      .get(`/api/products/${createdProduct._id}`);
    expect(verifyResponse.statusCode).toBe(404);
  });

  it('should return 404 for non-existent product', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const response = await request(app)
      .get(`/api/products/${fakeId}`);

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('error');
  });
});