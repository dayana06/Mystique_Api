//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Reporte_servicio_realizado = require('../models/reporte_servicio_realizado');

exports.reporte = (req,res) => {

  //http://localhost:3000/api/reporte_servicio_realizado/2?fecha_inicio=2018-05-20&fecha_fin=2018-06-31

  //condicion
  let conditions = { id: req.params.id };

  //variables
  var contRealizacion = 0;
  var contReclamo = 0;
  var contIncidencia = 0;

  //parametro fechas
  if(req.query.fecha_inicio){
    var fecha_inicio = req.query.fecha_inicio;
  }else{
    var fecha_inicio = '1001/01/01';
  }

  if(req.query.fecha_fin){
    var fecha_fin = req.query.fecha_fin;
  }else{
    var fecha_fin = '9999/12/31';
  }
  
  Reporte_servicio_realizado.forge(conditions).fetch({ withRelated: ['servicios_solicitados.servicio_realizado.reclamos','servicios_solicitados.servicio_realizado.incidencias'] })
  .then(function(data){

      if(!data) return res.status(404).json({ error : true, data : { message : 'servicio no existe' } });

      //conteo
      if(data.toJSON().servicios_solicitados){

        for(var i = 0; i < data.toJSON().servicios_solicitados.length; i++){

          if(data.toJSON().servicios_solicitados[i].servicio_realizado){

            if(data.toJSON().servicios_solicitados[i].servicio_realizado.realizacion){
             if(new Date(data.toJSON().servicios_solicitados[i].servicio_realizado.fecha_creacion) > new Date(fecha_inicio) && new Date(data.toJSON().servicios_solicitados[i].servicio_realizado.fecha_creacion) < new Date(fecha_fin)){
              contRealizacion++;
             }
            }
            if(data.toJSON().servicios_solicitados[i].servicio_realizado.reclamos){
              if(data.toJSON().servicios_solicitados[i].servicio_realizado.reclamos.id){
                if(new Date(data.toJSON().servicios_solicitados[i].servicio_realizado.reclamos.fecha_creacion) > new Date(fecha_inicio) && new Date(data.toJSON().servicios_solicitados[i].servicio_realizado.reclamos.fecha_creacion) < new Date(fecha_fin)){
                  contReclamo++;
                }
              }
            }
            if(data.toJSON().servicios_solicitados[i].servicio_realizado.incidencias){
              if(data.toJSON().servicios_solicitados[i].servicio_realizado.incidencias.id){
                if(new Date(data.toJSON().servicios_solicitados[i].servicio_realizado.incidencias.fecha_creacion) > new Date(fecha_inicio) && new Date(data.toJSON().servicios_solicitados[i].servicio_realizado.incidencias.fecha_creacion) < new Date(fecha_fin)){
                  contIncidencia++;
                }
              }
            }
          }
        }
      }

      var respuesta = {
        id:                         data.toJSON().id,
        nombre:                     data.toJSON().nombre,
        frecuencia_realizacion:     contRealizacion,
        frecuencia_reclamo:         contReclamo,
        frecuencia_incidencia:      contIncidencia,
      }

    res.status(200).json({ error : false, data: respuesta });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}
