//importation de express        
const express = require('express');

//importation de mongoose
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
//importation de package express-mongo-sanitize
const mongoSanitize = require('express-mongo-sanitize');
//importation du package helmet
const helmet = require("helmet");

const path = require('path');

//importation des routes utilisateur
const userRoutes = require('./routes/user');
const saucesRoutes = require('./routes/sauces');

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

app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Nettoyage des données contre l'injection de requêtes NoSQL
app.use(mongoSanitize());

//Utilisation de helmet pour la protection x-xss, active le filtre de script intersites(XSS) dans les navigateurs web
app.use(helmet());

//Cela indique à Express qu'il faut gérer la ressource images de manière statique 
app.use('/images', express.static(path.join(__dirname, 'images')));
//importation des routes utilisateurs
app.use('/api/auth', userRoutes);
app.use('/api/sauces', saucesRoutes);

module.exports = app;