//importation de express        
const express = require('express');
//appel de la methode express
const app = express();
//utilisation de la methode use pour configurer une reponse au format JSON
app.use((req, res, next) =>{
    res.json({message: "reponse du serveur !"})
});

module.exports = app;