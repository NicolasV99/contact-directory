const express = require('express');
const router = express.Router();

const employeesController = require('../controllers/employees');

//const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', employeesController.getAll);
router.get('/:id', employeesController.getSingle);
router.get('/department/:department', employeesController.findByDepartment)
router.post('/', employeesController.createEmployee);
router.put('/:id', employeesController.updateEmployee);
router.put('/department/:id', employeesController.updateEmployeeDepartment);
router.delete('/:id', employeesController.deleteEmployee);


module.exports = router;


