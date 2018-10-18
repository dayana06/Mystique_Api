'use strict'
const Cita = require('../models/cita');
const Horario_empleado = require('../models/horario_empleado');

exports.agregar = (req,res) => {

  let newCita = {
    id_orden_servicio:         req.body.id_orden_servicio,
    estado:                    req.body.estado,
    id_agenda:                 req.body.id_agenda,
    hora_inicio:               req.body.hora_inicio,
    hora_fin:                  req.body.hora_fin,
    bloques_requeridos:        req.body.bloques_requeridos,
  }

  Cita.forge(newCita).save()
  .then(function(cita){

        //validar arreglo horarios
        if(req.body.horarios){

          for (var i = 0; i < req.body.horarios.length; i++) {

            let conditions = { id: req.body.horarios[i] };

            Horario_empleado.forge(conditions).fetch()
            .then(function(horario_empleado){

                let updateData = {
                  id_cita:             cita.id,
                }
                
                horario_empleado.save(updateData)
                .then(function(data){
                    console.log('bloque apartado');
                })
                .catch(function(err){
                    res.status(500).json({ error : false, data : {message : err.message} });
                })

            })
            .catch(function(err){
              res.status(500).json({ error : false, data : {message : err.message} })
            })

          }

        }
  
  //fin guarduar cita
  res.status(200).json({ error: false, data: { message: 'cita creada' } });

  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}