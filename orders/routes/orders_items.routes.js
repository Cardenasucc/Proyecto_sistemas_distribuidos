/**
 * @author deivid & santiago
 * @version 1.0.0
 * 
 * Order Item Routes
 * This file defines order item routes
 */

const { Router } = require('express');
const router = Router();

/**
 * Importing methods or controllers
 */
const {
    showOrderItems,
    addOrderItem,
    showOrderItem,
    editOrderItem,
    deleteOrderItem
} = require('../controllers/order_items.controllers');

/**
 * Routes
 */
router.get('/', showOrderItems);
router.get('/:id', showOrderItem);
router.post('/', addOrderItem);
router.put('/:id', editOrderItem);
router.delete('/:id', deleteOrderItem);

module.exports = router;
