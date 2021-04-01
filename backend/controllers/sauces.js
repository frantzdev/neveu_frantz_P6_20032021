//importation du model sauce
const Sauce = require('../models/Sauce');
const fs = require('fs');

/*----------------verb GET ---------------*/
exports.getAllSauce = (req, res, next) => { 
    Sauce.find()  //recherche de la collection
      .then(sauces => res.status(200).json(sauces))
      .catch(error => res.status(400).json({ error }));
  };
 
/*----------------verb GET ---------------*/
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })  //recherche d'une sauce dans la collection
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
    console.log(sauce.name)
    sauce.save()
      .then(() => res.status(201).json({ message: "Votre sauce est ajoutée !"}))
      .catch( error => res.status(400).json({ error }));
  };

/*----------------verb PUT ---------------*/
  exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?      //si il y a une nouvelle image on a un req.file
      {                           
        ...JSON.parse(req.body.sauce),  // donc on traite l'image pour modifier son url
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } : { ...req.body };              // sinon sans image on recupere notre corps de requete

    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'La sauce est modifiée !'}))
      .catch(error => res.status(400).json({ error }));
  }; 

/*----------------verb DELETE ---------------*/
  exports.deleteSauce = (req, res, next) => {  
    Sauce.findOne({ _id: req.params.id })          //on recupere la sauce avec son id present dans le parametre de la requete
      .then(sauce => {                             //puis on split l'image pour obtenir son nom de fichier
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {    //suppression de l'image 
          Sauce.deleteOne({ _id: req.params.id })  // et dans la callback de fs.unlink, suppression de la sauce
            .then(() => res.status(200).json({ message: 'La sauce est supprimée !'}))
            .catch(error => res.status(400).json({ error }));
        });
      })
      .catch(error => res.status(500).json({ error }));
  };  

/*----------------verb Post ---------------*/
  exports.likeSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id})        //on recupere la sauce avec son id present dans le parametre de la requete
    .then((sauce) => {                          //puis pour cette sauce
      //si le corps de la requete est like 1
      let isLiked = false;
      if(req.body.like === 1) {                 
        sauce.usersLiked.forEach(element => {   //boucle du tableau usersLiked
          if(element == req.body.userId) {      //si le userId du corps de la requete est dans le tableau
            isLiked = true; 
          }
        });

        if(isLiked == false) {                   //si le userId du corps de la requete n'est pas dans le tableau, ajout au tableau et au compteur des likes
          Sauce.updateOne({ _id: sauce._id }, {likes: sauce.likes +1,  $addToSet: {usersLiked: req.body.userId}})
          .then(res.status(200).json(console.log("C'est un likes !")))  
          .catch( error => res.status(400).json({ error }));
        }
      }
      
      //si le corps de la requete est like -1
      let isDisliked = false;
      if(req.body.like === -1) {                  
        sauce.usersDisliked.forEach(element => {
          if(element == req.body.userId) {
            isDisliked = true;
          }
          console.log(element)
          console.log(req.body.userId)
        });
        if(isDisliked == false) {
          Sauce.updateOne({ _id: sauce._id }, {dislikes: sauce.dislikes +1, $addToSet: {usersDisliked: req.body.userId}})
          .then(res.status(200).json(console.log("C'est un dislikes !")))  
          .catch( error => res.status(400).json({ error }));
        }        
      }

      //si le corps de la requete est like 0
      if(req.body.like === 0) {
        if(sauce.usersDisliked.includes(req.body.userId)) {
          Sauce.updateOne({ _id: sauce._id }, {dislikes: sauce.dislikes -1, $pull: {usersDisliked: req.body.userId}})
          .then(res.status(200).json(console.log("Le dislikes est annulé !")))  
          .catch( error => res.status(400).json({ error }));
        }
        if(sauce.usersLiked.includes(req.body.userId)) {
          Sauce.updateOne({ _id: sauce._id }, {likes: sauce.likes -1, $pull: {usersLiked: req.body.userId}})
          .then(res.status(200).json(console.log("Le likes est annulé !")))  
          .catch( error => res.status(400).json({ error }));
        }
      }
    })
    .catch(error => res.status(400).json({ error }));  
  };
   
//si j'aime la sauce, faire un update de la sauce en ajoutant userid dans le tableau userliked et ajouter 1 à likes
//si j'aime pas la sauce, faire un update de la sauce en ajoutant userid dans le tableau userdisliked et ajouter 1 à dislikes
//si j'annule mon choix, like ===0  (il faut cliquer sur le like ou dislike pour l'annuler)
//donc si likes est annulé, je recupere le id de la sauce et supprime userId du tableau userLiked , et il faut enlever 1 à likes 
//donc si disLikes est annulé, je recupere le id de la sauce et supprime userId du tableau userdisliked, et il faut enlever 1 à dislikes
