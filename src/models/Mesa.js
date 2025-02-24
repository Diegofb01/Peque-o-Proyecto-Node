const db = require('../config/config');

class Mesa {
    static getAll(callback) {
        db.query('SELECT * FROM mesas', callback);
    }

    static getById(id, callback) {
        db.query('SELECT * FROM mesas WHERE id = ?', [id], callback);
    }

    static create(data, callback) {
        db.query('INSERT INTO mesas SET ?', data, callback);
    }

    static update(id, data, callback) {
        db.query('UPDATE mesas SET ? WHERE id = ?', [data, id], callback);
    }

    static delete(id, callback) {
        db.query('DELETE FROM mesas WHERE id = ?', [id], callback);
    }
}

module.exports = Mesa;
