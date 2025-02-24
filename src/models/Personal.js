const db = require('../config/config');

class Personal {
    static getAll(callback) {
        db.query('SELECT * FROM personal', callback);
    }

    static getById(id, callback) {
        db.query('SELECT * FROM personal WHERE id = ?', [id], callback);
    }

    static create(data, callback) {
        db.query('INSERT INTO personal SET ?', data, callback);
    }

    static update(id, data, callback) {
        db.query('UPDATE personal SET ? WHERE id = ?', [data, id], callback);
    }

    static delete(id, callback) {
        db.query('DELETE FROM personal WHERE id = ?', [id], callback);
    }
}

module.exports = Personal;
