// routes/productRoutes.js
import express from 'express';
const router = express.Router();
import * as productController from '../controllers/productController.js';

router.post('/', productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

export default router;




// const express = require('express');
// const router = express.Router();
// const {
//   createProduct,
//   getAllProducts,
//   getProductById,
//   updateProduct,
//   deleteProduct
// } = require('../controllers/productController');

// router.post('/', createProduct);
// router.get('/', getAllProducts);
// router.get('/:id', getProductById);
// router.put('/:id', updateProduct);
// router.delete('/:id', deleteProduct);

// module.exports = router;
