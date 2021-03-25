//importation du model sauce
const Sauce = require('../models/Sauce');
const fs = require('fs');

/*----------------verb GET ---------------*/
exports.getAllSauce = (req, res, next) => { 
    Sauce.find()
      .then(sauces => res.status(200).json(sauces))
      .catch(error => res.status(400).json({ error }));
  };
 
/*----------------verb GET ---------------*/
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => res.status(200).json(sauce))
      .catch(error => res.status(404).json({ error }));
  };  

/*----------------verb POST ---------------*/
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce); //parse le nouvel objet 
  delete sauceObject._id;
    const sauce = new Sauce({ //nouvelle sauce construite avec le nouvel objet dans le corps de la requete
      ...sauceObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` //modifier l'URL de l'image
    });
    sauce.save()
      .then(() => res.status(201).json({ message: "Votre sauce est ajoutée !"}))
      .catch( error => res.status(400).json({ error }));
  };

/*----------------verb PUT ---------------*/
  exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ? //si il y a une nouvelle image on a un req.file
      {                           
        ...JSON.parse(req.body.sauce),  // donc on traite l'image pour modifier son url
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } : { ...req.body }; // sinon sans image on recupere notre corps de requete

    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'La sauce est modifiée !'}))
      .catch(error => res.status(400).json({ error }));
  }; 

/*----------------verb DELETE ---------------*/
  exports.deleteSauce = (req, res, next) => {  
    Sauce.findOne({ _id: req.params.id }) //on recupere la sauce avec son id present dans le parametre de la requete
      .then(sauce => { //puis on split l'image pour obtenir son nom de fichier
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {  //suppression de l'image 
          Sauce.deleteOne({ _id: req.params.id }) // et dans la callback de fs.unlink, suppression de la sauce
            .then(() => res.status(200).json({ message: 'La sauce est supprimée !'}))
            .catch(error => res.status(400).json({ error }));
        });
      })
      .catch(error => res.status(500).json({ error }));
  };  

/*----------------verb Post ---------------*/
  exports.likeSauce = (req, res, next) => {
    countLike = 0;
  console.log(req.body.like)
  console.log(req.body.userId)
  console.log(req.params.id)
//faire un update de la ressource like quand on selectionne jaime ou j'aime pas
//puis ajouter l'userId dans le tableau correspondant au choix j'aime ou j'aime pas
  } 