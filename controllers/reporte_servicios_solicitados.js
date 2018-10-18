//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Reporte_servicios_solicitados = require('../models/reporte_servicios_solicitados');

exports.reporte = (req,res) => {

  //http://localhost:3000/api/reporte_servicios_solicitados?fecha_inicio=01-02-2018&fecha_fin=02-02-2018&orderby=ASC

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
  
  
  Reporte_servicios_solicitados.query(function(qb) {
    qb.column('id_servicio','nombre_servicio','tipo_servicio');
    qb.count("id_servicio");
    qb.groupBy('id_servicio','nombre_servicio','tipo_servicio');
    qb.orderBy('count', req.query.orderby);
    qb.whereBetween('fecha_creacion', [fecha_inicio, fecha_fin+' 23:59']);
  }).fetchAll({})
  .then(function(data){

    res.status(200).json({ error : false, data : data });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}
