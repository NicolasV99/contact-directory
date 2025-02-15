const express = require('express');
const router = express.Router();

const { validationRules, validate} = require('../middleware/validator.js');

const clientsController = require('../controllers/clients');

//const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', clientsController.getAll);
router.get('/:id', clientsController.getSingle);
router.post('/', validationRules(), validate, clientsController.createClient);
router.put('/:id', validationRules(), validate, clientsController.updateClient);
router.put('/pastOrders/:id/', clientsController.updateClientOrder);
router.delete('/:id', clientsController.deleteClient);


module.exports = router;


