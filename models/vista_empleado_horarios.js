const Bookshelf = require('../db');
const Vista_horario_empleado = require('./vista_horario_empleado');

const Empleado = Bookshelf.Model.extend({
  tableName: 'empleado',
  horarios: function(){
  	return this.hasMany(Vista_horario_empleado,"id_empleado")
  }
});

module.exports = Empleado