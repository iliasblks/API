const express = require('express');
const bcrypt = require('bcrypt');
const studentModel = require('../model/student');
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
        let student = await studentModel.find()
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
        let student = await studentModel.findById(id); 
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
        let student = await studentModel.findByIdAndRemove(id);
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
        let student = await studentModel.findByIdAndUpdate(id,
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
//CREER UN COMPTE
router.post('/register', async (request, reponse) =>{
    
    const {email, email_cfg, password, password_cfg, firstname, lastname} = request.body;

    if (typeof email === 'undefined' || email.trim() === "" || typeof password === 'undefined' || password.trim() === "") {
        return reponse.status(500).json({
            msg: "Il faut remplir tous les champs !"
        });
    }

    if (email !== email_cfg || password !== password_cfg) {
        return reponse.status(500).json({
            msg : "Les confirmations ne sont pas exactes !"
        });
    }

    try{
        let exists = await studentModel.findOne({email})
        
        if (exists){
            return reponse.status(500).json({
                msg : "Le compte existe déjà !"
            })
        }

        let student = await studentModel.create({
            email: email.trim(),
            password: await bcrypt.hash(password.trim(), 10),
            firstname: typeof firstname !== 'undefined' ? firstname.trim() : "",
            lastname: typeof lastname !== 'undefined' ? lastname.trim() : ""
        });
    
        return reponse.status(200).json(student);
    } catch(error) {
        console.log(error);
        return reponse.status(500).json({
            msg: "Erreur lors de la création du compte !"
        })
    }
    
}),
//SE CONNECTER
router.post('/login', async (request, reponse) =>{
    
    const {email, password} = request.body;

    if (typeof email === 'undefined' || email.trim() === "" || typeof password === 'undefined' || password.trim() === "") {
        return reponse.status(500).json({
            msg: "Il faut remplir tous les champs !"
        });
    }

    try{
        let student = await studentModel.findOne({email})
        
        if (!student){
            return reponse.status(500).json({
                msg : "Email ou mot de passe incorrect !"
            })
        }

        let compare = bcrypt.compareSync(password, student.password);

        if (!compare){
            return reponse.status(500).json({
                msg: "Email ou mot de passe incorrect !"
            });
        }

        return reponse.status(200).json(student);

    } catch(error) {
        console.log(error);
        return reponse.status(500).json({
            msg: "Erreur !"
        })
    }
    
}),

module.exports = router;