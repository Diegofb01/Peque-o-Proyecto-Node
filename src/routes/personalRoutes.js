const express = require('express');
const { body, param, validationResult } = require('express-validator');
const personalController = require('../controllers/personalController');

const router = express.Router();

const validatePersonalId = [
    param('id').isInt().withMessage('El ID del empleado debe ser un número entero'),
];

const validatePersonalData = [
    body('nombre').trim().notEmpty().withMessage('El nombre es obligatorio'),
    body('apellido').trim().notEmpty().withMessage('El apellido es obligatorio'),
    body('email').isEmail().withMessage('Debe ser un email válido'),
    body('telefono').optional().isMobilePhone().withMessage('Debe ser un número de teléfono válido'),
    body('puesto').trim().notEmpty().withMessage('El puesto es obligatorio'),
];

router.get('/', personalController.list);

router.get('/create', personalController.createView);

router.post('/create', validatePersonalData, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    personalController.create(req, res);
});

router.get('/edit/:id', validatePersonalId, personalController.editView);

router.post('/edit/:id', [...validatePersonalId, ...validatePersonalData], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    personalController.update(req, res);
});

router.get('/delete/:id', validatePersonalId, personalController.delete);

module.exports = router;
