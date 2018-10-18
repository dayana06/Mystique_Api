const Bookshelf = require('../db');

const Vista_solicitud_presupuesto = Bookshelf.Model.extend({
  tableName: 'vista_solicitud_presupuesto',
});

module.exports = Vista_solicitud_presupuesto