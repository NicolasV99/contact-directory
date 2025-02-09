//const { application } = require('express');
const mongodb = require('../data/database');
const { insertContact } = require('./contacts');
const ObjectId = require('mongodb').ObjectId;


// Functions for Employees
const getAll = async (req, res) => {
    //#swagger.tags=['Employees']
    try {
        const result = await mongodb.getDatabase().db().collection('employees').find();
        result.toArray().then((employees) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(employees);        
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Some error occurred while retrieving the Employees' });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Employees']
    try {
        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('employees').find({ _id: userId});
        result.toArray().then((employees) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(employees[0]);        
        });
    } catch (error) {
        console.error(error.message); 
        res.status(500).json({ message: 'Some error occurred while retrieving the employee' }); 
    }  
};

const findByDepartment = async (req, res) => {
    //#swagger.tags=['Employees']
    try {
        const department = req.params.department;
        const query = { department: department }; // Create a query object based on type field being a string
        console.log(query)
        const result = await mongodb.getDatabase().db().collection('employees').find(query).toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Some error occurred while retrieving the employees' });
    }
};

const createEmployee = async (req, res) => {
    //#swagger.tags=['Employees']
    try {
        const employee = {
            name: req.body.name,
            phone: req.body.phone,   
            email: req.body.email,    
            password: req.body.password,
            department: req.body.department,
        };
        const response = await mongodb.getDatabase().db().collection('employees').insertOne(employee);
        if (response.acknowledged) {
            const contact = {
                body: {
                    name: employee.name,
                    phone: employee.phone,
                    email: employee.email,
                    type: 'employee',
                }
            };
            await insertContact(contact);
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error ocurred while updating the employee');
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Some error occurred while creating the employee' });
    }
};

const updateEmployee = async (req, res) => {
    //#swagger.tags=['Employees']
    try {
        const userId = new ObjectId(req.params.id);
        const employee = {
            name: req.body.name,
            phone: req.body.phone,   
            email: req.body.email,    
            password: req.body.password,
            department: req.body.department,
        };
        const response = await mongodb.getDatabase().db().collection('employees').replaceOne({ _id: userId}, employee);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error ocurred while updating the employee');
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Some error occurred while updating the employee' });
    }
};

const updateEmployeeDepartment = async(req, res) => {
    //#swagger.tags=['Employees']
    try {
        const userId = new ObjectId(req.params.id);
        const update = {$set: { department: req.body.department }};
        const response = await mongodb.getDatabase().db().collection('employees').updateOne({ _id: userId }, update);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error ocurred while updating the employee');
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Some error occurred while updating the employee' });
    }
};

const deleteEmployee = async(req, res) => {
    //#swagger.tags=['Employees']
    try {
        const userId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('employees').deleteOne({ _id: userId});
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error ocurred while updating the employee');
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Some error occurred while deleting the employee' });
    }
};


module.exports = {
    getAll,
    getSingle,
    findByDepartment,
    createEmployee,
    updateEmployee,
    updateEmployeeDepartment,
    deleteEmployee
};