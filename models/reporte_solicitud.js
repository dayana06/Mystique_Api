const Bookshelf = require('../db');
const Vista_servicio_solicitado = require('./vista_servicio_solicitado');
const Vista_respuesta_solicitud = require('./vista_respuesta_solicitud');
const Vista_solicitud_presupuesto = require('./vista_solicitud_presupuesto');

const Reporte_solicitud = Bookshelf.Model.extend({
  tableName: 'vista_solicitudes',
  servicios_solicitados: function(){
  	return this.hasMany(Vista_servicio_solicitado,"solicitud")
  },
  respuesta_solicitud: function() {
    return this.hasOne(Vista_respuesta_solicitud, 'id_solicitud', 'id');
  },
  presupuesto: function() {
    return this.hasOne(Vista_solicitud_presupuesto, 'id_solicitud', 'id');
  },

});

module.exports = Reporte_solicitud