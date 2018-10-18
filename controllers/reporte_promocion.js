//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Reporte_promocion = require('../models/reporte_promocion');

exports.reporte = (req,res) => {

  //http://localhost:3000/api/reporte_promocion
  
  var respuesta = [];

  //parametro fechas
  if(req.query.fecha_inicio){
    var fecha_inicio = req.query.fecha_inicio;
  }else{
    var fecha_inicio = '01/01/0001';
  }

  if(req.query.fecha_fin){
    var fecha_fin = req.query.fecha_fin;
  }else{
    var fecha_fin = '31/12/9999';
  }
  
  Reporte_promocion.query(function(qb) { qb.whereBetween('fecha_creacion', [fecha_inicio, fecha_fin+' 23:59']);}).fetchAll({ withRelated: ['servicios_solicitados'] })
  .then(function(data){

    //parametro respuesta
    for (var i = 0; i < data.length; i++) {

      var contSol = 0;
      var contPro = 0;

      for (var j = 0; j < data.toJSON()[i].servicios_solicitados.length; j++){
        contSol++;
        if(data.toJSON()[i].servicios_solicitados[j].id_promocion) contPro++
      }

      var servicio = {
        id:                     data.toJSON()[i].id,          
        nombre:                 data.toJSON()[i].nombre,
        tipo_servicio:          data.toJSON()[i].tipo_servicio,
        categoria_servicio:     data.toJSON()[i].categoria_servicio,  
        solicitado:             contSol,
        promocion:              contPro,
      }

      respuesta.push(servicio)

    }

    res.status(200).json({ error : false, data : respuesta });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}
