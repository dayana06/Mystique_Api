//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Notificacion = require('../models/notificacion');

exports.findDocuments = (req,res) => {
  
  Notificacion.forge().fetchAll()
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.createDocument = (req,res) => {

  let newData = {
    id_tipo_notificacion: req.body.id_tipo_notificacion,
    fecha_creacion:       req.body.fecha_creacion,
    estatus:              req.body.estatus,
    id_usuario:           req.body.id_usuario,
    id_registro:          req.body.id_registro,
  }

  Notificacion.forge(newData).save()
  .then(function(data){
    res.status(200).json({ error: false, data: { message: 'notificacion creado' } });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Notificacion.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'notificacion no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.updateDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Notificacion.forge(conditions).fetch()
    .then(function(notificacion){
      if(!notificacion) return res.status(404).json({ error : true, data : { message : 'notificacion no existe' } });

      let updateData = {
        id_tipo_notificacion: req.body.id_tipo_notificacion,
        fecha_creacion:       req.body.fecha_creacion,
        estatus:              req.body.estatus,
        id_usuario:           req.body.id_usuario,
        id_registro:          req.body.id_registro,
      }
      
      notificacion.save(updateData)
        .then(function(data){
          res.status(200).json({ error : false, data : { message : 'notificacion actualizado'} });
        })
        .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} });
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}

exports.deleteDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Notificacion.forge(conditions).fetch()
    .then(function(notificacion){
      if(!notificacion) return res.status(404).json({ error : true, data : { message : 'notificacion no existe' } });

      notificacion.destroy()
        .then(function(data){
          res.status(200).json({ error : false, data : {message : 'notificacion eliminado'} })
        })
        .catch(function(err){
          res.status(500).json({error : true, data : {message : err.message}});
        })

    })
    .catch(function(err){
          res.status(500).json({ error : false, data : {message : err.message} })
    })

}