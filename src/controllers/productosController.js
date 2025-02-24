const db = require('../config/config');

exports.list = (req, res) => {
    db.query('SELECT * FROM productos', (err, results) => {
        if (err) throw err;
        res.render('productos/list', { productos: results });
    });
};

exports.createView = (req, res) => {
    res.render('productos/create');
};

exports.create = (req, res) => {
    const { nombre, precio } = req.body;
    db.query('INSERT INTO productos (nombre, precio) VALUES (?, ?)', [nombre, precio], (err) => {
        if (err) throw err;
        res.redirect('/productos');
    });
};

exports.editView = (req, res) => {
    db.query('SELECT * FROM productos WHERE id = ?', [req.params.id], (err, results) => {
        if (err) throw err;
        res.render('productos/edit', { producto: results[0] });
    });
};

exports.update = (req, res) => {
    const { nombre, precio } = req.body;
    db.query('UPDATE productos SET nombre = ?, precio = ? WHERE id = ?', [nombre, precio, req.params.id], (err) => {
        if (err) throw err;
        res.redirect('/productos');
    });
};

exports.delete = (req, res) => {
    db.query('DELETE FROM productos WHERE id = ?', [req.params.id], (err) => {
        if (err) throw err;
        res.redirect('/productos');
    });
};

exports.getById = (req, res) => {
    Producto.getById(req.params.id, (err, results) => {
        if (err || results.length === 0) {
            return res.status(404).send('Producto no encontrado');
        }
        res.render('productos/edit', { producto: results[0] });
    });
};

