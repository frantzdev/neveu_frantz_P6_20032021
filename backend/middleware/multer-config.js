//importation de multer
const multer = require('multer');
//création d'un dictionnaire pour les extentions de fichier sous forme d'objet
const MINE_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
    'image/png': 'png'
}; 
//objet de configuration avec 2 elements(destination et filename)
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images'); //appel de la callback, null pour pas d'erreur et envoi dans le dossier images
  },
  filename: (req, file, callback) => { //générer le nouveau nom du fichier
    const name = file.originalname.split(' ').join('_');
    const extension = MINE_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image');