/**
 * @author deivid & santiago
 * @version 1.0.0
 * 
 * Order Routes
 * This file defines order routes
 */

const { Router } = require('express');
const router = Router();

/**
 * Importing methods or controllers
 */
const {
    showOrders,
    addOrder,
    showOrder,
    editOrder,
    deleteOrder
} = require('../controllers/orders.controllers');

/**
 * Routes
 */
router.get('/', showOrders);
router.get('/:id', showOrder);
router.post('/', addOrder);
router.put('/:id', editOrder);
router.delete('/:id', deleteOrder);

module.exports = router;
