const express = require('express');

const router = express.Router();
const auth = require('../middleware/auth');
const controllersSauce = require('../controllers/sauces');

router.get('/', auth, controllersSauce.getAllSauce);
router.get('/:id', auth, controllersSauce.getOneSauce);
router.post('/', auth, controllersSauce.createSauce);
router.put('/:id', auth, controllersSauce.modifySauce);
router.delete('/:id', auth, controllersSauce.deleteSauce);

module.exports = router;