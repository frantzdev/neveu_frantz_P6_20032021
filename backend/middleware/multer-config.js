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
  filename: (req, file, callback) => {                   //générer le nouveau nom du fichier
    const name = file.originalname.split(' ').join('_'); //remplace les espaces par des underscores
    const extension = MINE_TYPES[file.mimetype];         //element du dictionnaire qui correspond au mineType du fichier envoyé par le frontend
    callback(null, name + Date.now() + '.' + extension); //création du nom de fichier entier
  }
});

module.exports = multer({storage: storage}).single('image');