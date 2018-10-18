const Bookshelf = require('../db');

const Vista_respuesta_comentario = Bookshelf.Model.extend({
  tableName: 'vista_respuesta_comentario',
});

module.exports = Vista_respuesta_comentario