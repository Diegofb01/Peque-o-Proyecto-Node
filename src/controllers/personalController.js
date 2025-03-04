const db = require('../config/config');

exports.list = (req, res) => {
    db.query('SELECT * FROM personal', (err, results) => {
        if (err) throw err;
        res.render('personal/list', { personal: results });
    });
};

exports.createView = (req, res) => {
    res.render('personal/create');
};

exports.create = (req, res) => {
    const { nombre, puesto } = req.body;
    db.query('INSERT INTO personal (nombre, puesto) VALUES (?, ?)', [nombre, puesto], (err) => {
        if (err) throw err;
        res.redirect('/personal');
    });
};

exports.editView = (req, res) => {
    db.query('SELECT * FROM personal WHERE id = ?', [req.params.id], (err, results) => {
        if (err || results.length === 0) {
            return res.status(404).send('Personal no encontrado');
        }
        res.render('personal/edit', { personal: results[0] });
    });
};


exports.update = (req, res) => {
    const { nombre, puesto } = req.body;
    const id = req.params.id;

    console.log('Actualizando personal:', { id, nombre, puesto });

    db.query('UPDATE personal SET nombre = ?, puesto = ? WHERE id = ?', [nombre, puesto, id], (err, result) => {
        if (err) {
            console.error('Error al actualizar:', err);
            return res.status(500).send('Error interno');
        }
        
        if (result.affectedRows === 0) {
            return res.status(404).send('Personal no encontrado');
        }

        res.redirect('/personal');
    });
};


exports.delete = (req, res) => {
    db.query('DELETE FROM personal WHERE id = ?', [req.params.id], (err) => {
        if (err) throw err;
        res.redirect('/personal');
    });
};
