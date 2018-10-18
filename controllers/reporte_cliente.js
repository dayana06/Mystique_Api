//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Reporte_cliente = require('../models/reporte_cliente');

exports.reporte = (req,res) => {

  //http://localhost:3000/api/reporte_cliente?tipo_cliente=&sexo=13&rango_edad=17&fecha_inicio=2018-05-01&fecha_fin=2018-07-01

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

  //parametro tipo_cliente
  if(req.query.tipo_cliente) query.tipo_cliente = req.query.tipo_cliente;
  
  Reporte_cliente.query( { where: query } ).query(function(qb) { qb.whereBetween('fecha_creacion', [fecha_inicio, fecha_fin+' 23:59']);}).fetchAll({ withRelated: ['perfil'] })
  .then(function(data){
    
    //parametro sexo
    for (var i = 0; i < data.length; i++) {
      if(req.query.sexo){

        for (var j = 0; j < data.toJSON()[i].perfil.length; j++) {
          if(data.toJSON()[i].perfil[j].id_valor_parametro == req.query.sexo){
            arr2.push(data.toJSON()[i]);
            break;
          } 
        }

      }else{
        arr2.push(data.toJSON()[i]);
      }
    }

    //parametro rango_edad
    for (var i = 0; i < arr2.length; i++) {
      if(req.query.rango_edad){

        for (var j = 0; j < arr2[i].perfil.length; j++) {
          if(arr2[i].perfil[j].id_valor_parametro == req.query.rango_edad){
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
