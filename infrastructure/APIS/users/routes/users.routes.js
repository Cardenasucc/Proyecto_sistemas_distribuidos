/**
 * @author deivid & santiago
 * @version 1.0.0
 * 
 * Users routes
 * This file defines users routes
 */

const { Router } = require('express');
const router = Router();

/**
 * Importing methods or controllers
 */
const { 
    addUser, 
    showUsers, 
    deleteUser, 
    editUser, 
    showUser, 
    login 
} = require('../controllers/user.controllers');

/**
 * Routes
 */
router.get('/', showUsers); 
router.post('/', addUser);
router.delete('/:id', deleteUser); 
router.put('/:id', editUser); 
router.get('/:id', showUser); 
router.post('/login', login); 

module.exports = router;
