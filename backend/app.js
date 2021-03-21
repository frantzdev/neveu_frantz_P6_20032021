//importation de express        
const express = require('express');
//appel de la methode express
const app = express();

//ajout du middleware CORS pour ajouter des headers à nos objets reponse
//methode use pour appliquer le middleware à toute nos routes
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next(); //next pour passer au middleware suivant
  });

//utilisation de la methode use pour configurer une reponse au format JSON
app.use((req, res, next) =>{
    res.json({message: "reponse du serveur !"})
});

module.exports = app;