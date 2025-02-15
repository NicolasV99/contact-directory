const express = require('express');
const router = express.Router();
const { validationRules, validate} = require('../middleware/validator.js');

const employeesController = require('../controllers/employees');

//const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', employeesController.getAll);
router.get('/:id', employeesController.getSingle);
router.get('/department/:department', employeesController.findByDepartment)
router.post('/', validationRules(), validate, employeesController.createEmployee);
router.put('/:id', validationRules(), validate, employeesController.updateEmployee);
router.put('/department/:id', employeesController.updateEmployeeDepartment);
router.delete('/:id', employeesController.deleteEmployee);


module.exports = router;


