//---- dependencias ------
const Bookshelf = require('../db');
const Detalle_servicio = require('./detalle_servicio');

const Servicio_solicitado = Bookshelf.Model.extend({
  tableName: 'servicio_solicitado',
  servicio_realizado: function() {
    return this.hasOne(Detalle_servicio, 'id_servicio_solicitado', 'id');
  },
});

module.exports = Servicio_solicitado;