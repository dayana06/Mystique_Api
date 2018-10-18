const Bookshelf = require('../db');

const Vista_empleado_asignado = Bookshelf.Model.extend({
  tableName: 'vista_empleado_asignado',
});

module.exports = Vista_empleado_asignado