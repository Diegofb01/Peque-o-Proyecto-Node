const express = require('express');
const { body, param, validationResult } = require('express-validator');
const mesasController = require('../controllers/mesasController');

const router = express.Router();

router.get('/', mesasController.list);

router.get('/create', mesasController.createView);
router.post('/create', [
    body('numero').isInt({ min: 1 }).withMessage('El número de mesa debe ser un entero positivo'),
    body('capacidad').isInt({ min: 1 }).withMessage('La capacidad debe ser un número positivo')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    mesasController.create(req, res);
});

router.get('/edit/:id', [
    param('id').isInt().withMessage('ID inválido')
], mesasController.editView);

router.post('/edit/:id', [
    param('id').isInt().withMessage('ID inválido'),
    body('numero').isInt({ min: 1 }).withMessage('El número de mesa debe ser un entero positivo'),
    body('capacidad').isInt({ min: 1 }).withMessage('La capacidad debe ser un número positivo')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    mesasController.update(req, res);
});

router.get('/delete/:id', [
    param('id').isInt().withMessage('ID inválido')
], mesasController.delete);

module.exports = router;
