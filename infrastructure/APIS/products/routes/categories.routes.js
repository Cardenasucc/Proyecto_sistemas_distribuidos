/**
 * @author deivid & santiago
 * @version 1.0.0
 * 
 * Category Routes
 * This file defines category routes
 */

const { Router } = require('express');
const router = Router();

/**
 * Importing methods or controllers
 */
const {
    showCategories,
    addCategory,
    showCategory,
    editCategory,
    deleteCategory
} = require('../controllers/categories.controllers');

/**
 * Routes
 */
router.get('/', showCategories);
router.get('/:id', showCategory);
router.post('/', addCategory);
router.put('/:id', editCategory);
router.delete('/:id', deleteCategory);

module.exports = router;
