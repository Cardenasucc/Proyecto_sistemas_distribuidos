/**
 * @author deivid & santiago
 * @version 1.0.0
 * 
 * Product routes
 * This file defines product routes
 */

const {Router} = require('express');

const router = Router(); 

/**
 * Importing methods or controllers
 */

const {
    ShowProducts, 
    ShowProduct, 
    AddProducts, 
    DeleteProducts, 
    EditProducts
} = require ('../controllers/products.controllers');

/**
 * Routes
 */

router.get('/', ShowProducts);
router.get('/:id', ShowProduct);
router.post('/', AddProducts);
router.delete('/', DeleteProducts);
router.put('/', EditProducts);

module.exports = router;