const Bookshelf = require('../db');

const Vista_servicio_parametro = Bookshelf.Model.extend({
    tableName: 'v_servicio_parametro',
});

module.exports = Vista_servicio_parametro