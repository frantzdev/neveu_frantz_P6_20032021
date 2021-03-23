const Sauce = require('../models/Sauce');


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
    const sauce = new Sauce({
      ...req.body
    });
    sauce.save()
      .then(() => res.status(201).json({ message: "Votre sauce est ajoutée !"}))
      .catch( error => res.status(400).json({ error }));
  };
/*----------------verb PUT ---------------*/
  exports.modifySauce = (req, res, next) => {
      Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'La sauce est modifiée !'}))
        .catch(error => res.status(400).json({ error }));
  };  
/*----------------verb DELETE ---------------*/
  exports.deleteSauce = (req, res, next) => {  
      Sauce.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'La sauce est supprimée !'}))
        .catch(error => res.status(400).json({ error }));
  };  