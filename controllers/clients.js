//const { application } = require('express');
const mongodb = require('../data/database');
const ObjetcId = require('mongodb').ObjectId;


// Functions for Clients
const getAll = async (req, res) => {
    //#swagger.tags=['Clients']
    try {
        const result = await mongodb.getDatabase().db().collection('clients').find();
        result.toArray().then((clients) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(clients);        
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Some error occurred while retrieving the clients' });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Clients']
    try {
        const userId = new ObjetcId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('clients').find({ _id: userId});
        result.toArray().then((clients) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(clients[0]);        
        });
    } catch (error) {
        console.error(error.message); 
        res.status(500).json({ message: 'Some error occurred while retrieving the client' }); 
    }  
};

const createClient = async (req, res) => {
    //#swagger.tags=['Clients']
    try {
        const client = {
            name: req.body.name,
            phone: req.body.phone,   
            email: req.body.email,    
            pastOrders: req.body.pastOrders,
        };
        const response = await mongodb.getDatabase().db().collection('clients').insertOne(client);
        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error ocurred while updating the client');
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Some error occurred while creating the client' });
    }
};

const updateClient = async (req, res) => {
    //#swagger.tags=['Clients']
    try {
        const userId = new ObjetcId(req.params.id);
        const client = {
            name: req.body.name,
            phone: req.body.phone,   
            email: req.body.email,    
            pastOrders: req.body.pastOrders
        };
        const response = await mongodb.getDatabase().db().collection('clients').replaceOne({ _id: userId}, client);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error ocurred while updating the client');
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Some error occurred while updating the client' });
    }
};

const deleteClient = async(req, res) => {
    //#swagger.tags=['Clients']
    try {
        const userId = new ObjetcId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('clients').deleteOne({ _id: userId});
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error ocurred while updating the client');
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Some error occurred while deleting the client' });
    }
};


module.exports = {
    getAll,
    getSingle,
    createClient,
    updateClient,
    deleteClient
};