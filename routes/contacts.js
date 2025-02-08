const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts');

//const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', contactsController.getAll);
router.get('/:id', contactsController.getSingle);
router.get('/type/:type/', contactsController.findByType);
router.post('/', contactsController.createContact);
router.put('/:id', contactsController.updateContact);
router.delete('/:id', contactsController.deleteContact);


module.exports = router;


