const express = require('express');

const router = express.Router();
const auth = require('../middleware/auth');
const controllersSauce = require('../controllers/sauces');
const multer = require('../middleware/multer-config');

router.get('/', controllersSauce.getAllSauce);
router.get('/:id', controllersSauce.getOneSauce);
router.post('/', auth, multer, controllersSauce.createSauce);
router.put('/:id', auth, multer, controllersSauce.modifySauce);
router.delete('/:id', auth, controllersSauce.deleteSauce);
router.post('/:id/like', auth, controllersSauce.likeSauce);

module.exports = router;