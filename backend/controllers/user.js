//importation de bcrypt
const bcrypt = require('bcrypt');
//importation de jsonwebtoken
const jwt = require('jsonwebtoken')
//importation du model User
const User = require('../models/User');

//mise en place de la logique pour l'inscription utilisateur
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10) //sal le mot de passe 10 fois
      .then(hash => {  // hash pour crypter le mot de passe
        const user = new User({  //création d'un nouvel utilisateur 
          email: req.body.email, // récupération du mail dans le corps de la requete
          password: hash //mise en place du hash sur le mdp
        });
        user.save()  // sauvegarde de l'utilisateur sur la base de donnée
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };


exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email }) //findOne pour rechercher un utilisateur par son ID sur la base de donnée
      .then(user => {
        if (!user) {  // si l(utilisateur n'existe pas, retourne une erreur)
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)// compare le hash du mot de passe saisi avec le hash de la base de donnée
          .then(valid => {
            if (!valid) { 
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user._id,
              token: jwt.sign(  //fonction sign pour encoder un nouveau token
                { userId: user._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h'}
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };