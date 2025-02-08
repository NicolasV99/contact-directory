//{ application } = require('express');
const mongodb = require('../data/database');
const ObjetcId = require('mongodb').ObjectId;


// Functions for Contacts
const getAll = async (req, res) => {
    //#swagger.tags=['Contacts']
    try {
        const result = await mongodb.getDatabase().db().collection('contacts').find();
        result.toArray().then((contacts) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(contacts);        
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Some error occurred while retrieving the contacts' });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Contacts']
    try {
        const userId = new ObjetcId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('contacts').find({ _id: userId});
        result.toArray().then((contacts) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(contacts[0]);        
        });
    } catch (error) {
        console.error(error.message); 
        res.status(500).json({ message: 'Some error occurred while retrieving the contact' }); 
    }  
};

const insertContact = async (contactData) => {
    try {
        const response = await mongodb.getDatabase().db().collection('contacts').insertOne(contactData);
        if (!response.acknowledged) {
            throw new Error('Some error occurred while creating the contact');
        }
    } catch (error) {
        console.error('Error in insertContact:', error.message);
        throw error; // Re-throw the error to handle it in the calling function
    }
};

const createContact = async (req, res) => {
    //#swagger.tags=['Contacts']
    try {
        const contact = {
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            type: req.body.type,
        };
        await insertContact(contact);
        res.status(204).send();
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Some error occurred while creating the contact' });
    }
};

const updateContact = async (req, res) => {
    //#swagger.tags=['Contacts']
    try {
        const userId = new ObjetcId(req.params.id);
        const contact = {
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            type: req.body.type,
        };
        const response = await mongodb.getDatabase().db().collection('contacts').replaceOne({ _id: userId}, contact);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error ocurred while updating the user');
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Some error occurred while updating the contact' });
    }
};

const deleteContact = async(req, res) => {
    //#swagger.tags=['Contacts']
    try {
        const userId = new ObjetcId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('contacts').deleteOne({ _id: userId});
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error ocurred while updating the user');
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Some error occurred while deleting the contact' });
    }
};

const findByType = async (req, res) => {
    //#swagger.tags=['Contacts']
    try {
        const type = req.params.type;
        const query = { type: type }; // Create a query object based on type field being a string
        const result = await mongodb.getDatabase().db().collection('contacts').find(query).toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Some error occurred while retrieving the contacts' });
    }
};

module.exports = {
    getAll,
    getSingle,
    createContact,
    insertContact,
    updateContact,
    deleteContact,
    findByType
};