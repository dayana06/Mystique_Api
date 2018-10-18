//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Vista_horario_empleado = require('../models/vista_horario_empleado');

exports.findDocuments = (req,res) => {
  
  Vista_horario_empleado.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Vista_horario_empleado.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'vista_horario_empleado no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.buscarPorFecha = (req,res) => {

  var fecha = req.params.fecha;
  var empleado = req.params.empleado;
  
  Vista_horario_empleado.query({where: {dia: fecha, id_empleado: empleado}}).fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}