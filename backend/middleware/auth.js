//importation de jsonwebtokan
const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
  try {
      const token = req.headers.authorization.split(' ')[1];  //recuperation dans le headers.authorization le bearer et le split pour faire un tableau
      const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // recuperation du bearer et le comparer avec la clé secrete 
      const userId = decodedToken.userId; //extraction du l'id utilisateur de notre token
    if (req.body.userId && req.body.userId !== userId) { //si le userid du corps de la requete et celui ci est different de userId de la base de donnée
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};