//---- dependencias ------
const Bookshelf = require('../db');

const Vista_notificacion = Bookshelf.Model.extend({
  tableName: 'vista_notificacion',
});

module.exports = Vista_notificacion;