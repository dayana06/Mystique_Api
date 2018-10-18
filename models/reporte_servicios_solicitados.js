//---- dependencias ------
const Bookshelf = require('../db');

const Reporte_servicios_solicitados = Bookshelf.Model.extend({
  tableName: 'vista_servicio_solicitado',
});

module.exports = Reporte_servicios_solicitados;