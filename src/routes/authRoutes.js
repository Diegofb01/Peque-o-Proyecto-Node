const express = require('express');
const { body, validationResult } = require('express-validator');
const authController = require('../controllers/authController');

const router = express.Router();

const validate = (validations) => {
    return async (req, res, next) => {
        await Promise.all(validations.map(validation => validation.run(req)));
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    };
};

router.get('/login', authController.loginView);
router.get('/register', authController.registerView);

router.post('/login', validate([
    body('email').isEmail().withMessage('Debe ser un email válido'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
]), authController.login);

router.post('/register', validate([
    body('email').isEmail().withMessage('Debe ser un email válido'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('name').trim().notEmpty().withMessage('El nombre es obligatorio')
]), authController.register);

router.get('/logout', authController.logout);

module.exports = router;
