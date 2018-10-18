//---- dependencias ------
const Bookshelf = require('../db');
const Cita = require('./cita');
const Vista_empleado_asignado = require('./vista_empleado_asignado');
const Vista_servicio_solicitud = require('./vista_servicio_solicitud');

const Vista_orden_cita = Bookshelf.Model.extend({
  tableName: 'v_orden',
  citas: function(){
  	return this.hasMany(Cita,"id_orden_servicio")
  },
  empleados_asignados: function(){
  	return this.hasMany(Vista_empleado_asignado,"id_orden_servicio")
  },
  servicios_solicitados: function(){
  	return this.hasMany(Vista_servicio_solicitud,"id_solicitud", "solicitud")
  }
});

module.exports = Vista_orden_cita;