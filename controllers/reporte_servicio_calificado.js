//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Reporte_servicio_calificado = require('../models/reporte_servicio_calificado');

exports.reporte = (req,res) => {

  //http://localhost:3000/api/reporte_servicio_calificado?orderby=DESC
  //DESC o ASC
  
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
  
  Reporte_servicio_calificado.query(function(qb) { qb.whereBetween('fecha_creacion', [fecha_inicio, fecha_fin+' 23:59']);}).fetchAll({ withRelated: ['servicios_solicitados.servicio_realizado.calificacion_servicio'] })
  .then(function(data){

    //parametro respuesta
    for (var i = 0; i < data.length; i++) {

      var acum = 0;
      var cont = 0;
      var prom = 0;

      for (var j = 0; j < data.toJSON()[i].servicios_solicitados.length; j++){

        if(data.toJSON()[i].servicios_solicitados[j].servicio_realizado){
          if(data.toJSON()[i].servicios_solicitados[j].servicio_realizado.calificacion_servicio){
            if(data.toJSON()[i].servicios_solicitados[j].servicio_realizado.calificacion_servicio.puntuacion){
              cont++;
              acum+=data.toJSON()[i].servicios_solicitados[j].servicio_realizado.calificacion_servicio.puntuacion;
            }
          }
        }

      }
      if(cont){
        prom = acum/cont;
      }else{
        prom = 0;
      }

      var servicio = {
        id:                     data.toJSON()[i].id,          
        nombre:                 data.toJSON()[i].nombre,
        tipo_servicio:          data.toJSON()[i].tipo_servicio,
        categoria_servicio:     data.toJSON()[i].categoria_servicio,  
        promedio_calificacion:  prom
      }

      respuesta.push(servicio)

    }

    //ordenar ascendente
    if(req.query.orderby == 'ASC'){
        respuesta.sort(function (a, b) {
        if (a.promedio_calificacion > b.promedio_calificacion) {
          return 1;
        }
        if (a.promedio_calificacion < b.promedio_calificacion) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
    }

    //ordenar descendente
    if(req.query.orderby=='DESC'){
        respuesta.sort(function (a, b) {
        if (a.promedio_calificacion < b.promedio_calificacion) {
          return 1;
        }
        if (a.promedio_calificacion > b.promedio_calificacion) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
    }

    res.status(200).json({ error : false, data : respuesta });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}
