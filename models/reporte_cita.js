//---- dependencias ------
const Bookshelf = require('../db');

const Reporte_cita = Bookshelf.Model.extend({
  tableName: 'cita',
});

module.exports = Reporte_cita;