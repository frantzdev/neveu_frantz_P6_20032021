exports.getAllSauce = (req, res, next) => {
    const sauces = [
    {
      userId: "sgqsg1s6qg4q3s51g4684g",
      name: "",
      manufacturer: "",
      description: "",
      mainPepper: "",
      imageUrl: "",
      heat: "",
      like: "",
      dislikes : "",
      usersLiked: ['userId'],
      usersDisliked: ['userId']
    }
      ];
    res.status(200).json(sauces);
  };

exports.getOneSauce = (req, res, next) => {
    console.log("getOneSauce dans la console depuis le test sur POSTMAN");
    res.status(201).json({
      message: 'la requete Get/:id  !'
    });
  };  

exports.createSauce = (req, res, next) => {
    console.log("createSauce dans la console depuis le test sur POSTMAN");
    res.status(201).json({
      message: 'la requete POST !'
    });
  };

  exports.modifySauce = (req, res, next) => {
    console.log("modifySauce dans la console depuis le test sur POSTMAN");
    res.status(201).json({
      message: 'la requete PUT/:id  !'
    });
  };  

  exports.deleteSauce = (req, res, next) => {
    console.log("deleteSauce dans la console depuis le test sur POSTMAN");
    res.status(201).json({
      message: 'la requete delete/:id  !'
    });
  };  