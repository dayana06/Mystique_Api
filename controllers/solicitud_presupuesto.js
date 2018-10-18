
'use strict'
const bcrypt = require("bcryptjs");
const Presupuesto = require('../models/presupuesto');



exports.findOneDocument = (req,res) => {

  let conditions = { id_solicitud: req.params.id };

  Presupuesto.forge(conditions).fetch()
    .then(function(data){
      if(!data) return res.status(404).json({ error : true, data : { message : 'presupuesto no existe' } });

      res.status(200).json({ error : false, data : data.toJSON() })

    })
    .catch(function(err){
      res.status(500).json({ error : false, data : {message : err.message} })
    })

}