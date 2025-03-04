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
    const { numero, capacidad, estado } = req.body;
    db.query('INSERT INTO mesas (numero, capacidad, estado) VALUES (?, ?, ?)', [numero, capacidad, estado], (err) => {
        if (err) throw err;
        res.redirect('/mesas');
    });
};

exports.editView = (req, res) => {
    db.query('SELECT * FROM mesas WHERE id = ?', [req.params.id], (err, results) => {
        if (err || results.length === 0) {
            return res.status(404).send('Mesa no encontrada');
        }
        res.render('mesas/edit', { mesa: results[0] });
    });
};

exports.update = (req, res) => {
    const { numero, capacidad, estado } = req.body;
    const id = req.params.id;

    console.log('Actualizando mesa:', { id, numero, capacidad, estado });

    db.query('UPDATE mesas SET numero = ?, capacidad = ?, estado = ? WHERE id = ?', [numero, capacidad, estado, id], (err, result) => {
        if (err) {
            console.error('Error al actualizar:', err);
            return res.status(500).send('Error interno');
        }
        
        if (result.affectedRows === 0) {
            return res.status(404).send('Mesa no encontrada');
        }

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
