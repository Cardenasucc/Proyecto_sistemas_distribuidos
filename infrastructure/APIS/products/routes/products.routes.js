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

router.get('/', showProducts);             // Obtiene todos los productos
router.get('/:id', showProduct);           // Obtiene un producto por ID
router.post('/', addProduct);              // Agrega un nuevo producto
router.delete('/:id', deleteProduct);      // Elimina un producto por ID
router.put('/:id', editProduct);           // Edita un producto por ID

module.exports = router;
