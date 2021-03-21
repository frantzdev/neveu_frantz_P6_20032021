//importation express
const express = require('express');
//création du router utilisateur            
const router = express.Router();
//importation des controllers       
const userController = require('../controllers/user');

//création des routes pour l'inscription et la connection
router.post('/signup', userController.signup);
router.post('/login', userController.login);

//exportation du router
module.exports = router;