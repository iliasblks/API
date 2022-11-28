const { json } = require('body-parser');
const express = require('express');
const studentModel = require('../model/student');
const { response } = require('express');
const { request } = require('http');
const classeStudent = require('../model/student');
let router = express.Router();
router.post('/', async(req, res) =>{
    const {firstname, lastname} = req.body;

    if (typeof firstname === 'undefined' || typeof lastname === 'undefined'){
        return res.status(500).json({
            "msg": "Vous devez entrer un nom et un prénom !"
        })
    }
    try {
        let student = await studentModel.create({
            firstname,
            lastname
        });
        return res.status(200).json(student);
    }catch (error){
        return res.status(500).json({
            "msg": "Il y a eu une erreur: " + erreur
        })
    }
})

//LIRE 
router.get('/', async (req, res) => {
    try {
        let student = await classeStudent.find()
        return res.status(200).json(student);
    } catch(error){
        return res.status(500).json({
            msg: error
        })
    }
}),
//LIRE MAIS AVEC UN ID PRECIS
router.get('/:id', async (req, res) => {
    const {id} = req.params;

    try{
        let student = await classeStudent.findById(id); 
        return res.status(200).json(student);
    } catch(error){
        return res.status(500).json({
            msg: error
        })
    }
}),
//SUPPRIMER UN ID
router.delete('/:id', async (req,res) => {
    const {id} = req.params;
    try{
        let student = await classeStudent.findByIdAndRemove(id);
        return res.status(200).json(student);
    } catch(error){
        return res.status(500).json({
            msg: error
        })
    }
    
}),
//MODIFIER UN NOM DANS UN ID
router.put('/:id', async (req,res) =>{
    const {id} = req.params;
    const {name} = req.body;
    try {
        let student = await classeStudent.findByIdAndUpdate(id,
            {
                name
            },{
                new: true
            })
        return res.status(200).json({
            student,
            msg: "Classe bien modifiée !"
        })
    }catch (error) {
        return res.status(500).json(error)
    }
    
})
module.exports = router;