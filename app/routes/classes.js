const express = require('express');
const mongoose = require('mongoose');
const classeModel = require("../model/classe");

let router = express.Router();

router.post('/', async (request, response) => {
    const {name} = request.body;

    try{
        let classe = await classeModel.create({
            name: name
        });

        return response.status(200).json(classe);
    } catch(error) {
        return response.status(500).json({
            msg: error
        });
    }

});

router.get('/', async (request, response) => {
    try{
        let classe = await classeModel.find();

        return response.status(200).json(classe);
    } catch(error) {
        return response.status(500).json({
            msg: error
        })
    }
    
    
});

router.get('/:id', async (request, response) => {
    const {id} = request.params;
    try{
        let classe = await classeModel.findById(id);
        
        response.status(200).json(classe);
    } catch(error) {
        return response.status(500).json({
            msg: error
        })
    }
    
});

router.delete('/:id', async (request, response) => {
    const {id} = request.params;
    try{
        let classe = await classeModel.findOneAndDelete({
            _id: id
        });
        
        response.status(200).json({
            msg : "Classe bien supprimée !"
        });
    } catch(error) {
        return response.status(500).json({
            msg: error
        })
    }
});

router.put('/:id', async (request, response) => {
    const {id} = request.params;
    const {name} = request.body;

    try{
        let classe = await classeModel.findOneAndUpdate({
            _id: id
        }, {
            name
        }, {
            new: true
        });
        
        response.status(200).json({
            msg : "Classe mise à jour !"
        });
    } catch(error) {
        return response.status(500).json({
            msg: error
        })
    }
})

module.exports = router;