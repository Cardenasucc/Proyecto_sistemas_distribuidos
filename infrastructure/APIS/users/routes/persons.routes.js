/**
 * @author Deivid & Santiago
 * @version 1.0.0
 * 
 * People Routes
 * This file defines people routes
 */

const { Router } = require('express');
const router = Router();

/**
 * Importing methods or controllers
 */
const { addPerson, deletePerson, editPerson, showPerson, showPeople } = require('../controllers/people.controllers');

/**
 * Routes
 */
router.get('/', showPeople);    
router.post('/', addPerson);    
router.delete('/:id', deletePerson); 
router.put('/:id', editPerson);  
router.get('/:id', showPerson);  

module.exports = router;
