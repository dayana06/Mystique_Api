//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Vista_orden_cita = require('../models/vista_orden_cita');

exports.findDocuments = (req,res) => {
  
  Vista_orden_cita.forge().fetchAll({ withRelated: ['citas.horario_empleado','empleados_asignados','servicios_solicitados.insumos_asociados'] })
  .then(function(data){

      var arr = []

      //ordenar descendente
      arr = data.toJSON().sort(function (a, b) {
        if (a.citas[0].horario_empleado.dia < b.citas[0].horario_empleado.dia) {
          return 1;
        }
        if (a.citas[0].horario_empleado.dia > b.citas[0].horario_empleado.dia) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });

    res.status(200).json({ error : false, data : arr });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Vista_orden_cita.forge(conditions).fetch({ withRelated: ['citas.horario_empleado','empleados_asignados','servicios_solicitados.insumos_asociados'] })
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'vista_orden_cita no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}