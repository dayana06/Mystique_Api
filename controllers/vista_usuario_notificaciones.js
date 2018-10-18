//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Vista_usuario_notificaciones = require('../models/vista_usuario_notificaciones');

exports.findDocuments = (req,res) => {
  
  Vista_usuario_notificaciones.forge().fetchAll({ withRelated: ['notificaciones'] })
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Vista_usuario_notificaciones.forge(conditions).fetch({ withRelated: ['notificaciones'] })
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'vista_usuario_notificaciones no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}