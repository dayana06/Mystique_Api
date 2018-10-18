//---- dependencias ------
const Bookshelf = require('../db');
const Vista_servicio_solicitado = require('./vista_servicio_solicitado');

const Reporte_promocion = Bookshelf.Model.extend({
  tableName: 'vista_servicios_categoria',
  servicios_solicitados: function(){
  	return this.hasMany(Vista_servicio_solicitado,"id_servicio")
  }
});

module.exports = Reporte_promocion;