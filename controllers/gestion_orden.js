'use strict'
const Orden_sevicio = require('../models/orden_servicio');
const Empleado_asignado = require('../models/empleado_asignado');

exports.agregar = (req, res) => {
    console.log(req.body)
    let newOrden_sevicio = {
        id_solicitud:       req.body.id_solicitud,
        id_orden_servicio:  req.body.id_orden_servicio,
        estado:             req.body.estado
    }

    Orden_sevicio.forge(newOrden_sevicio).save()
        .then(function(orden) {

            if (req.body.empleados_asignados) {

                for (var i = 0; i < req.body.empleados_asignados.length; i++) {

                    let newEmpleSol = {
                        id_empleado: req.body.empleados_asignados[i],
                        id_orden_servicio: orden.id,
                    }

                    Empleado_asignado.forge(newEmpleSol).save()
                        .then(function(ser) {
                            console.log('Empleado_asignado guardado')
                        })
                        .catch(function(err) {
                            console.log(err);
                        });

                }

            }

            res.status(200).json({ error: false, data: { message: 'orden creada' } });

        })
        .catch(function(err) {
            res.status(500).json({ error: true, data: { message: err.message } });
        });

}