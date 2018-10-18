//---- dependencias ------
const Bookshelf = require('../db');
const Vista_respuesta_comentario = require('./vista_respuesta_comentario')

const Reporte_comentario = Bookshelf.Model.extend({
  tableName: 'v_comentarios',
  respuesta_comentario: function() {
    return this.hasOne(Vista_respuesta_comentario, 'id_comentario', 'id');
  }
});

module.exports = Reporte_comentario;

//model.hasOne(Target, [foreignKey], [foreignKeyTarget])