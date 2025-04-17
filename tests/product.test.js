// /* eslint-env jest */
import { describe, it, expect, afterAll } from '@jest/globals';
const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('../routes/productRoutes');
const mongoose = require('mongoose');
const Product = require('../models/product');

const app = express();
app.use(bodyParser.json());
app.use('/api/products', productRoutes);

// Setup a test DB connection
beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/products_test');
  await Product.deleteMany(); // Clean up
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Product API Endpoints', () => {
  let createdId;

  it('should create a new product', async () => {
    const res = await request(app).post('/api/products').send({
      name: 'Test Product',
      price: 100,
      quantity: 5
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Test Product');
    createdId = res.body._id;
  });

  it('should not create product with missing name', async () => {
    const res = await request(app)
      .post('/api/products')
      .send({ price: 20 });
    expect(res.statusCode).toBe(400); // or whatever your validation returns
    expect(res.body.error).toBeDefined();
  });

  it('should fetch all products', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should get product by ID', async () => {
    const res = await request(app).get(`/api/products/${createdId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(createdId);
  });

  it('should update a product', async () => {
    const res = await request(app)
      .put(`/api/products/${createdId}`)
      .send({ price: 150 });
    expect(res.statusCode).toBe(200);
    expect(res.body.price).toBe(150);
  });

  it('should delete a product', async () => {
    const res = await request(app).delete(`/api/products/${createdId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Product deleted');
  });
});
