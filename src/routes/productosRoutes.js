const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');

router.get('/', productosController.list);
router.get('/create', productosController.createView);
router.post('/create', productosController.create);
router.get('/edit/:id', productosController.editView);
router.post('/edit/:id', productosController.update);
router.get('/delete/:id', productosController.delete);

module.exports = router;
