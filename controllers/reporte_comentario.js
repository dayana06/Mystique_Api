//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Reporte_comentario = require('../models/reporte_comentario');

exports.reporte = (req,res) => {

  // http://localhost:3000/api/reporte_comentario?tipo_comentario=&respuesta_comentario=&tipo_respuesta_comentario=&fecha_inicio=27-05-2018&fecha_fin=31-05-2018

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

  //parametro tipo comentario
  if(req.query.tipo_comentario) query.id_tipo_comentario = req.query.tipo_comentario;
  
  Reporte_comentario.query( { where: query } ).query(function(qb) { qb.whereBetween('fecha_creacion', [fecha_inicio, fecha_fin+' 23:59']);}).fetchAll({ withRelated: ['respuesta_comentario'] })
  .then(function(data){
    
    //parametro respuesta
    for (var i = 0; i < data.length; i++) {
      if(req.query.respuesta_comentario){
        if(data.toJSON()[i].respuesta_comentario.id == req.query.respuesta_comentario) arr1.push(data.toJSON()[i]);
      }else{
        arr1.push(data.toJSON()[i]);
      }
    }

    //parametro tipo respuesta
    for (var i = 0; i < arr1.length; i++) {
      if(req.query.tipo_respuesta_comentario){
        if(arr1[i].respuesta_comentario.id_tipo_respuesta_comentario == req.query.tipo_respuesta_comentario) arr2.push(arr1[i]);
      }else{
        arr2.push(arr1[i]);
      }
    }

    res.status(200).json({ error : false, data : arr2 });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}
