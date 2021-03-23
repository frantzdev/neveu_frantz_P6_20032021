const express = require('express');

const router = express.Router();
const auth = require('../middleware/auth');
const controllersSauce = require('../controllers/sauces');

router.get('/', controllersSauce.getAllSauce);
router.get('/:id', controllersSauce.getOneSauce);
router.post('/', controllersSauce.createSauce);
router.put('/:id', controllersSauce.modifySauce);
router.delete('/:id', controllersSauce.deleteSauce);

module.exports = router;