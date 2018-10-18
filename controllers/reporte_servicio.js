//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Reporte_servicio = require('../models/reporte_servicio');

exports.reporte = (req,res) => {

  // http://localhost:3000/api/reporte_servicio?tipo_servicio=&categoria_servicio=&fecha_inicio=&fecha_fin=
  
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

  //parametro tipo_servicio
  if(req.query.tipo_servicio) query.id_tipo_servicio = req.query.tipo_servicio;

  //parametro categora_servicio
  if(req.query.categoria_servicio) query.id_categoria_servicio = req.query.categoria_servicio;
  
  
  Reporte_servicio.query( { where: query } ).query(function(qb) { qb.whereBetween('fecha_creacion', [fecha_inicio, fecha_fin+' 23:59']);}).fetchAll({})
  .then(function(data){
    
    //parametro

    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}
