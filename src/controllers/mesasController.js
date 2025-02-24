const db = require('../config/config');

exports.list = (req, res) => {
    db.query('SELECT * FROM mesas', (err, results) => {
        if (err) throw err;
        res.render('mesas/list', { mesas: results });
    });
};

exports.createView = (req, res) => {
    res.render('mesas/create');
};

exports.create = (req, res) => {
    const { numero, capacidad } = req.body;
    db.query('INSERT INTO mesas (numero, capacidad) VALUES (?, ?)', [numero, capacidad], (err) => {
        if (err) throw err;
        res.redirect('/mesas');
    });
};

exports.editView = (req, res) => {
    db.query('SELECT * FROM mesas WHERE id = ?', [req.params.id], (err, results) => {
        if (err) throw err;
        res.render('mesas/edit', { mesa: results[0] });
    });
};

exports.update = (req, res) => {
    const { numero, capacidad } = req.body;
    db.query('UPDATE mesas SET numero = ?, capacidad = ? WHERE id = ?', [numero, capacidad, req.params.id], (err) => {
        if (err) throw err;
        res.redirect('/mesas');
    });
};

exports.delete = (req, res) => {
    db.query('DELETE FROM mesas WHERE id = ?', [req.params.id], (err) => {
        if (err) throw err;
        res.redirect('/mesas');
    });
};

exports.getById = (req, res) => {
    db.query('SELECT * FROM mesas WHERE id = ?', [req.params.id], (err, results) => {
        if (err || results.length === 0) {
            return res.status(404).send('Mesa no encontrada');
        }
        res.render('mesas/edit', { mesa: results[0] });
    });
};