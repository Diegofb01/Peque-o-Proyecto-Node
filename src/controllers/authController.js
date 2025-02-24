const bcrypt = require('bcryptjs');
const db = require('../config/config');

exports.loginView = (req, res) => {
    res.render('auth/login');
};

exports.registerView = (req, res) => {
    res.render('auth/register');
};

exports.register = async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    db.query('INSERT INTO personal (nombre, contraseña) VALUES (?, ?)', [username, hashedPassword], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error en el registro');
        }
        res.redirect('/auth/login');
    });
};

exports.login = (req, res) => {
    const { username, password } = req.body;
    
    db.query('SELECT * FROM personal WHERE nombre = ?', [username], async (err, results) => {
        if (err || results.length === 0) {
            return res.status(400).send('Usuario no encontrado');
        }
        
        const user = results[0];
        const match = await bcrypt.compare(password, user.contraseña);
        
        if (!match) {
            return res.status(400).send('Contraseña incorrecta');
        }
        
        req.session.user = user;
        res.redirect('/');
    });
};

exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/auth/login');
    });
};
