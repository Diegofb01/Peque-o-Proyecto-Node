const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/config');

exports.loginView = (req, res) => {
    res.render('auth/login');
};

exports.registerView = (req, res) => {
    res.render('auth/register');
};

exports.register = async (req, res) => {
    try {
        const { email, name, password } = req.body;

        db.query('SELECT * FROM personal WHERE email = ?', [email], async (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error al verificar usuario');
            }
            if (results.length > 0) {
                return res.status(400).send('El usuario ya está registrado');
            }

            const hashedPassword = await bcrypt.hash(password, 12);

            db.query('INSERT INTO personal (email, nombre, contraseña) VALUES (?, ?, ?)', [email, name, hashedPassword], (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Error en el registro');
                }
                res.redirect('/auth/login');
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en el servidor');
    }
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM personal WHERE email = ?', [email], async (err, results) => {
        if (err || results.length === 0) {
            return res.status(400).send('Usuario no encontrado');
        }

        const user = results[0];
        const match = await bcrypt.compare(password, user.contraseña);

        if (!match) {
            return res.status(400).send('Contraseña incorrecta');
        }

        const token = jwt.sign({ id: user.id, email: user.email, name: user.nombre }, process.env.JWT_SECRET, { expiresIn: '2h' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });

        res.redirect('/');
    });
};

exports.logout = (req, res) => {
    res.clearCookie('token');
    res.redirect('/auth/login');
};

exports.authenticateToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).send('Acceso denegado');

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).send('Token inválido');
        req.user = user;
        next();
    });
};
