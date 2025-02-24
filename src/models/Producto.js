const db = require('../config/config');

class Producto {
    static getAll(callback) {
        db.query('SELECT * FROM productos', callback);
    }

    static getById(id, callback) {
        db.query('SELECT * FROM productos WHERE id = ?', [id], callback);
    }

    static create(data, callback) {
        db.query('INSERT INTO productos SET ?', data, callback);
    }

    static update(id, data, callback) {
        db.query('UPDATE productos SET ? WHERE id = ?', [data, id], callback);
    }

    static delete(id, callback) {
        db.query('DELETE FROM productos WHERE id = ?', [id], callback);
    }
}

module.exports = Producto;
