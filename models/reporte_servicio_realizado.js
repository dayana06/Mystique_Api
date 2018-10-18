//---- dependencias ------
const Bookshelf = require('../db');
const Servicio_solicitado = require('./servicio_solicitado');

const Reporte_servicio_realizado = Bookshelf.Model.extend({
  tableName: 'servicio',
  servicios_solicitados: function(){
  	return this.hasMany(Servicio_solicitado,"id_servicio")
  }
});

module.exports = Reporte_servicio_realizado;