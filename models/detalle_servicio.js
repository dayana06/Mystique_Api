//---- dependencias ------
const Bookshelf = require('../db');
const Reclamo = require('./reclamo');
const Incidencia_servicio = require('./incidencia_servicio');
const Calificacion_servicio = require('./calificacion_servicio');

const Detalle_servicio = Bookshelf.Model.extend({
  tableName: 'detalle_servicio',
  reclamos: function() {
    return this.hasOne(Reclamo, 'id_detalle_servicio', 'id');
  },
  incidencias: function() {
    return this.hasOne(Incidencia_servicio, 'id_detalle_servicio', 'id');
  },
  calificacion_servicio: function() {
    return this.hasOne(Calificacion_servicio, 'id_detalle_servicio', 'id');
  },
});

module.exports = Detalle_servicio;