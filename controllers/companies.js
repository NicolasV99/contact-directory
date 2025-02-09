//const { application } = require('express');
const mongodb = require('../data/database');
const { insertContact } = require('./contacts');
const ObjectId = require('mongodb').ObjectId;


// Functions for Companies
const getAll = async (req, res) => {
    //#swagger.tags=['Companies']
    try {
        const result = await mongodb.getDatabase().db().collection('companies').find();
        result.toArray().then((companies) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(companies);        
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Some error occurred while retrieving the Companies' });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Companies']
    try {
        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('companies').find({ _id: userId});
        result.toArray().then((companies) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(companies[0]);        
        });
    } catch (error) {
        console.error(error.message); 
        res.status(500).json({ message: 'Some error occurred while retrieving the company' }); 
    }  
};

const createCompany = async (req, res) => {
    //#swagger.tags=['Companies']
    try {
        const company = {
            name: req.body.name,
            phone: req.body.phone,   
            email: req.body.email,    
            address: req.body.address,
            type: req.body.type,
            website: req.body.website,
            owner: req.body.owner,
        };
        const response = await mongodb.getDatabase().db().collection('companies').insertOne(company);
        if (response.acknowledged) {
            const contact = {
                body: {
                    name: company.name,
                    phone: company.phone,
                    email: company.email,
                    type: 'company',
                }
            };
            await insertContact(contact);
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error ocurred while updating the company');
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Some error occurred while creating the company' });
    }
};

const updateCompany = async (req, res) => {
    //#swagger.tags=['Companies']
    try {
        const userId = new ObjectId(req.params.id);
        const company = {
            name: req.body.name,
            phone: req.body.phone,   
            email: req.body.email,    
            address: req.body.address,
            type: req.body.type,
            website: req.body.website,
            owner: req.body.owner,
        };
        const response = await mongodb.getDatabase().db().collection('companies').replaceOne({ _id: userId}, company);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error ocurred while updating the company');
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Some error occurred while updating the company' });
    }
};

const deleteCompany = async(req, res) => {
    //#swagger.tags=['Companies']
    try {
        const userId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('companies').deleteOne({ _id: userId});
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error ocurred while updating the company');
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Some error occurred while deleting the company' });
    }
};

const findByType = async (req, res) => {
    //#swagger.tags=['Companies']
    try {
        const type = req.params.type;
        const query = { type: type }; // Create a query object based on type field being a string
        const result = await mongodb.getDatabase().db().collection('companies').find(query).toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Some error occurred while retrieving the companies' });
    }
};


module.exports = {
    getAll,
    getSingle,
    createCompany,
    updateCompany,
    deleteCompany,
    findByType
};