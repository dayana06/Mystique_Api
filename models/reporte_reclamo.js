//---- dependencias ------
const Bookshelf = require('../db');

const Reporte_reclamo = Bookshelf.Model.extend({
  tableName: 'reclamo',
});

module.exports = Reporte_reclamo;