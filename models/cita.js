//---- dependencias ------
const Bookshelf = require('../db');
const Vista_horario_empleado = require('./vista_horario_empleado');

const Cita = Bookshelf.Model.extend({
  tableName: 'cita',
  horario_empleado: function() {
    return this.hasOne(Vista_horario_empleado, 'id_cita', 'id');
  },
});

module.exports = Cita;