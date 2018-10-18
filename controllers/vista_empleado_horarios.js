//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Vista_empleado_horarios = require('../models/vista_empleado_horarios');

exports.findDocuments = (req,res) => {
  
  Vista_empleado_horarios.forge().fetchAll({ withRelated: ['horarios'] })
  .then(function(data){
    res.status(200).json({ error : false, data : data.toJSON() });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}

exports.findOneDocument = (req,res) => {

  let conditions = { id: req.params.id };

  Vista_empleado_horarios.forge(conditions).fetch({ withRelated: ['horarios'] })
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'vista_empleado_horarios no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}