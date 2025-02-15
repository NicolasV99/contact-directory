const express = require('express');
const router = express.Router();

const { companyValidationRules, validate} = require('../middleware/validator.js');

const companiesController = require('../controllers/companies');

//const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', companiesController.getAll);
router.get('/:id', companiesController.getSingle);
router.get('/type/:type/', companiesController.findByType);
router.post('/', companyValidationRules(), validate, companiesController.createCompany);
router.put('/:id', companyValidationRules(), validate, companiesController.updateCompany);
router.delete('/:id', companiesController.deleteCompany);


module.exports = router;


