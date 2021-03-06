//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Vista_solicitud = require('../models/vista_solicitud');

exports.findDocuments = (req,res) => {
  
  Vista_solicitud.query(function(qb) {
    qb.orderBy('fecha_creacion', 'ASC');
  }).fetchAll({ withRelated: ['servicios_solicitados'] })
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Vista_solicitud.forge(conditions).fetch({ withRelated: ['servicios_solicitados'] })
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'vista_solicitud no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}