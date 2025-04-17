// const Product = require('../models/product');

// // Create
// exports.createProduct = async (req, res) => {
//   try {
//     const product = await Product.create(req.body);
//     res.status(201).json(product);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// // Read All
// exports.getAllProducts = async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Read One
// exports.getProductById = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) return res.status(404).json({ error: "Product not found" });
//     res.json(product);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Update
// exports.updateProduct = async (req, res) => {
//   try {
//     const product = await Product.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true, runValidators: true }
//     );
//     if (!product) return res.status(404).json({ error: "Product not found" });
//     res.json(product);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// // Delete
// exports.deleteProduct = async (req, res) => {
//   try {
//     const product = await Product.findByIdAndDelete(req.params.id);
//     if (!product) return res.status(404).json({ error: "Product not found" });
//     res.json({ message: "Product deleted" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };




// const Product = require('../models/product');
// const logger = require('../config/logger');

// // Create
// exports.createProduct = async (req, res) => {
//   try {
//     const product = await Product.create(req.body);
//     // logger.info({ product }, 'Product created');
//     logger.info({ productId: product._id }, 'Product created');
//     res.status(201).json(product);
//   } catch (err) {
//     logger.error({ err }, 'Error creating product');
//     res.status(400).json({ error: err.message });
//   }
// };

// // Read All
// exports.getAllProducts = async (req, res) => {
//   try {
//     const products = await Product.find();
//     logger.info(`Fetched ${products.length} products`);
//     res.json(products);
//   } catch (err) {
//     logger.error({ err }, 'Error fetching products');
//     res.status(500).json({ error: err.message });
//   }
// };

// // Read One
// exports.getProductById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const product = await Product.findById(id);
//     if (!product) {
//       logger.warn({ id }, 'Product not found');
//       return res.status(404).json({ error: 'Product not found' });
//     }
//     logger.info({ product }, 'Fetched product by ID');
//     res.json(product);
//   } catch (err) {
//     logger.error({ err, id: req.params.id }, 'Error fetching product');
//     res.status(500).json({ error: err.message });
//   }
// };

// // Update
// exports.updateProduct = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const product = await Product.findByIdAndUpdate(id, req.body, {
//       new: true,
//       runValidators: true,
//     });
//     if (!product) {
//       logger.warn({ id }, 'Product not found for update');
//       return res.status(404).json({ error: 'Product not found' });
//     }
//     logger.info({ product }, 'Product updated');
//     res.json(product);
//   } catch (err) {
//     logger.error({ err, id: req.params.id }, 'Error updating product');
//     res.status(400).json({ error: err.message });
//   }
// };

// // Delete
// exports.deleteProduct = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const product = await Product.findByIdAndDelete(id);
//     if (!product) {
//       logger.warn({ id }, 'Product not found for deletion');
//       return res.status(404).json({ error: 'Product not found' });
//     }
//     logger.info({ id }, 'Product deleted');
//     res.json({ message: 'Product deleted' });
//   } catch (err) {
//     logger.error({ err, id: req.params.id }, 'Error deleting product');
//     res.status(500).json({ error: err.message });
//   }
// };



const Product = require('../models/product');
const logger = require('../config/logger');

// Create
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    logger.info({
      msg: 'Product created',
      method: req.method,
      url: req.originalUrl,
      body: req.body,
      productId: product._id,
      statusCode: 201,
      timestamp: new Date().toISOString(),
    });
    res.status(201).json(product);
  } catch (err) {
    logger.error({
      msg: 'Error creating product',
      method: req.method,
      url: req.originalUrl,
      body: req.body,
      error: err.message,
      statusCode: 400,
      timestamp: new Date().toISOString(),
    });
    res.status(400).json({ error: err.message });
  }
};

// Read All
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    logger.info({
      msg: 'Fetched all products',
      method: req.method,
      url: req.originalUrl,
      count: products.length,
      statusCode: 200,
      timestamp: new Date().toISOString(),
    });
    res.json(products);
  } catch (err) {
    logger.error({
      msg: 'Error fetching products',
      method: req.method,
      url: req.originalUrl,
      error: err.message,
      statusCode: 500,
      timestamp: new Date().toISOString(),
    });
    res.status(500).json({ error: err.message });
  }
};

// Read One
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      logger.warn({
        msg: 'Product not found',
        method: req.method,
        url: req.originalUrl,
        productId: id,
        statusCode: 404,
        timestamp: new Date().toISOString(),
      });
      return res.status(404).json({ error: 'Product not found' });
    }
    logger.info({
      msg: 'Fetched product by ID',
      method: req.method,
      url: req.originalUrl,
      productId: product._id,
      statusCode: 200,
      timestamp: new Date().toISOString(),
    });
    res.json(product);
  } catch (err) {
    logger.error({
      msg: 'Error fetching product',
      method: req.method,
      url: req.originalUrl,
      productId: req.params.id,
      error: err.message,
      statusCode: 500,
      timestamp: new Date().toISOString(),
    });
    res.status(500).json({ error: err.message });
  }
};

// Update
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      logger.warn({
        msg: 'Product not found for update',
        method: req.method,
        url: req.originalUrl,
        productId: id,
        body: req.body,
        statusCode: 404,
        timestamp: new Date().toISOString(),
      });
      return res.status(404).json({ error: 'Product not found' });
    }
    logger.info({
      msg: 'Product updated',
      method: req.method,
      url: req.originalUrl,
      productId: product._id,
      body: req.body,
      statusCode: 200,
      timestamp: new Date().toISOString(),
    });
    res.json(product);
  } catch (err) {
    logger.error({
      msg: 'Error updating product',
      method: req.method,
      url: req.originalUrl,
      productId: req.params.id,
      body: req.body,
      error: err.message,
      statusCode: 400,
      timestamp: new Date().toISOString(),
    });
    res.status(400).json({ error: err.message });
  }
};

// Delete
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      logger.warn({
        msg: 'Product not found for deletion',
        method: req.method,
        url: req.originalUrl,
        productId: id,
        statusCode: 404,
        timestamp: new Date().toISOString(),
      });
      return res.status(404).json({ error: 'Product not found' });
    }
    logger.info({
      msg: 'Product deleted',
      method: req.method,
      url: req.originalUrl,
      productId: id,
      statusCode: 200,
      timestamp: new Date().toISOString(),
    });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    logger.error({
      msg: 'Error deleting product',
      method: req.method,
      url: req.originalUrl,
      productId: req.params.id,
      error: err.message,
      statusCode: 500,
      timestamp: new Date().toISOString(),
    });
    res.status(500).json({ error: err.message });
  }
};