/**
 * @author deivid & santiago
 * @version 1.0.0
 * 
 * Product routes
 * This file defines product routes
 */

const { Router } = require('express');
const router = Router();

/**
 * Importing methods or controllers
 */
const {
    showProducts, 
    showProduct, 
    addProduct, 
    deleteProduct, 
    editProduct
} = require('../controllers/products.controllers');

/**
 * Routes
 */
router.get('/', showProducts);
router.get('/:id', showProduct);
router.post('/', addProduct);
router.delete('/:id', deleteProduct);
router.put('/:id', editProduct);   

module.exports = router;
