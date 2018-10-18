//---- dependencias ------
const Bookshelf = require('../db');

const Vista_horario_empleado = Bookshelf.Model.extend({
  tableName: 'vista_horario_empleado',
});

module.exports = Vista_horario_empleado;