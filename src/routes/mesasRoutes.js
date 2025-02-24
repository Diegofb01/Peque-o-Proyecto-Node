const express = require('express');
const router = express.Router();
const mesasController = require('../controllers/mesasController');

router.get('/', mesasController.list);
router.get('/create', mesasController.createView);
router.post('/create', mesasController.create);
router.get('/edit/:id', mesasController.editView);
router.post('/edit/:id', mesasController.update);
router.get('/delete/:id', mesasController.delete);

module.exports = router;
