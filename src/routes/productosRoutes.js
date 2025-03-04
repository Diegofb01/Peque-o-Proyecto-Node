const express = require('express');
const { body, param, validationResult } = require('express-validator');
const productosController = require('../controllers/productosController');

const router = express.Router();

// Validación de ID para rutas que lo requieran
const validateProductId = [
    param('id').isInt().withMessage('El ID del producto debe ser un número entero'),
];

// Validación de datos del producto
const validateProductData = [
    body('nombre').trim().notEmpty().withMessage('El nombre del producto es obligatorio'),
    body('descripcion').trim().notEmpty().withMessage('La descripción es obligatoria'),
    body('precio').isFloat({ min: 0.01 }).withMessage('El precio debe ser un número positivo'),
    body('stock').isInt({ min: 0 }).withMessage('El stock debe ser un número entero positivo'),
];

router.get('/', productosController.list);

router.get('/create', productosController.createView);

router.post('/create', validateProductData, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    productosController.create(req, res);
});

router.get('/edit/:id', validateProductId, productosController.editView);

router.post('/edit/:id', [...validateProductId, ...validateProductData], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    productosController.update(req, res);
});

router.get('/delete/:id', validateProductId, productosController.delete);

module.exports = router;
