//importation de express        
const express = require('express');
//importation de mongoose
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
//appel de la methode express
const app = express();

//connection à la base de donnée mongoDB avec la fonction connect de mongoose
mongoose.connect('mongodb+srv://frantzdev:projet6@cluster0.p4m9f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//ajout du middleware CORS pour ajouter des headers à nos objets reponse
//methode use pour appliquer le middleware à toute nos routes
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next(); //next pour passer au middleware suivant
  });


app.use(express.json());

//importation des routes utilisateurs
app.use('/api/auth', userRoutes);

module.exports = app;