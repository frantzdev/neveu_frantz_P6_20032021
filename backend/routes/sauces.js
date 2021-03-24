const express = require('express');

const router = express.Router();
const auth = require('../middleware/auth');
const controllersSauce = require('../controllers/sauces');
const multer = require('../middleware/multer-config');

router.get('/',  controllersSauce.getAllSauce);
router.get('/:id', controllersSauce.getOneSauce);
router.post('/', multer, controllersSauce.createSauce);
router.put('/:id', multer, controllersSauce.modifySauce);
router.delete('/:id', controllersSauce.deleteSauce);

module.exports = router;