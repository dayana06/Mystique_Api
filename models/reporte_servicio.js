//---- dependencias ------
const Bookshelf = require('../db');

const Reporte_servicio = Bookshelf.Model.extend({
  tableName: 'vista_servicios_categoria',
});

module.exports = Reporte_servicio;