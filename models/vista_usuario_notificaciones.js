const Bookshelf = require('../db');
const Vista_notificacion = require('./vista_notificacion');

const Vista_usuario_notificaciones = Bookshelf.Model.extend({
  tableName: 'usuario',
  notificaciones: function(){
  	return this.hasMany(Vista_notificacion,"id_usuario")
  }
});

module.exports = Vista_usuario_notificaciones