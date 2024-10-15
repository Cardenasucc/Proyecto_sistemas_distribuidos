/**
 * @author deivid & santiago
 * @version 1.0.0
 * 
 * Membership Routes
 * This file defines membership routes
 */

const { Router } = require('express');
const router = Router();

/**
 * Importing methods or controllers
 */
const {
    showMemberships,
    addMembership,
    showMembership,
    editMembership,
    deleteMembership
} = require('../controllers/memberships.controllers');

/**
 * Routes
 */
router.get('/', showMemberships);
router.get('/:id', showMembership);
router.post('/', addMembership);
router.put('/:id', editMembership);
router.delete('/:id', deleteMembership);

module.exports = router;
