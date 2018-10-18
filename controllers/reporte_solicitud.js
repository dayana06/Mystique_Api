//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Reporte_solicitud = require('../models/reporte_solicitud');

exports.reporte = (req,res) => {

  // http://localhost:3000/api/reporte_solicitud?tipo_respuesta_solicitud=&tipo_respuesta_presupuesto=&servicio=
  
  //arreglos
  var arr1 = [];
  var arr2 = [];
  var arr3 = [];

  //query
  var query = {};

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
  
  
  Reporte_solicitud.query( { where: query } ).query(function(qb) { qb.whereBetween('fecha_creacion', [fecha_inicio, fecha_fin+' 23:59']);}).fetchAll({ withRelated: ['servicios_solicitados','respuesta_solicitud','presupuesto'] })
  .then(function(data){
    
    //parametro tipo_respuesta_solicitud
    for (var i = 0; i < data.length; i++) {
      if(req.query.tipo_respuesta_solicitud){
        if(data.toJSON()[i].respuesta_solicitud.id_tipo_respuesta_solicitud == req.query.tipo_respuesta_solicitud) arr1.push(data.toJSON()[i]);
      }else{
        arr1.push(data.toJSON()[i]);
      }
    }

    //parametro tipo_respuesta_presupuesto
    for (var i = 0; i < arr1.length; i++) {
      if(req.query.tipo_respuesta_presupuesto){
        if(arr1[i].presupuesto.id_tipo_respuesta_presupuesto == req.query.tipo_respuesta_presupuesto) arr2.push(arr1[i]);
      }else{
        arr2.push(arr1[i]);
      }
    }

    //parametro sevicio
    for (var i = 0; i < arr2.length; i++) {
      if(req.query.servicio){

        for (var j = 0; j < arr2[i].servicios_solicitados.length; j++) {
          if(arr2[i].servicios_solicitados[j].id_servicio == req.query.servicio){
            arr3.push(arr2[i]);
            break;
          } 
        }

      }else{
        arr3.push(arr2[i]);
      }
    }


    res.status(200).json({ error : false, data : arr3 });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}
