//----dependencias------  
'use strict'
const Detalle_servicio = require('../models/detalle_servicio');
const Incidencia_servicio = require('../models/incidencia_servicio');
const Insumo_usado = require('../models/insumo_usado');

exports.agregar = (req,res) => {

  //Guardar detalle
  let newDetalle = {
    id_orden_servicio:        req.body.id_orden_servicio,
    id_servicio_solicitado:   req.body.id_servicio_solicitado,
    realizacion:              req.body.realizacion,
  }

  Detalle_servicio.forge(newDetalle).save()
  .then(function(detalle){

    //guardar insidencia si existe
    if(!req.body.realizacion){

      let newInsidencia = {
        id_detalle_servicio:  detalle.id,
        id_tipo_incidencia:   req.body.id_tipo_incidencia,
        descripcion:          req.body.descripcion,
      }

      Incidencia_servicio.forge(newInsidencia).save()
      .then(function(ser){
          console.log('incidencia_servicio guardado')
      })
      .catch(function (err) {
          console.log(err);
      });

    }

    //guardar insumos
    if(req.body.insumos){

      for (var i = 0; i < req.body.insumos.length; i++) {

        let newData = {
          id_detalle_servicio:  detalle.id,
          id_insumo:            req.body.insumos[i].id_insumo,
          cantidad:             req.body.insumos[i].cantidad,
        }

        Insumo_usado.forge(newData).save()
        .then(function(ser){
            console.log('Insumo_usado guardado')
        })
        .catch(function (err) {
            console.log(err);
        });

      }

    }
    
    res.status(200).json({ error: false, data: { message: 'detalle_servicio creado' } });

  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}