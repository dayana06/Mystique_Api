//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Reporte_reclamo = require('../models/reporte_reclamo');

exports.reporte = (req,res) => {

  //http://localhost:3000/api/reporte_reclamo?fecha_inicio=&fecha_fin=

  var lunes =0;
  var lunesA = 0;
  var lunesR = 0;
  var lunesP = 0;
  var martes =0;
  var martesA = 0;
  var martesR = 0;
  var martesP = 0;
  var miercoles =0;
  var miercolesA = 0;
  var miercolesR = 0;
  var miercolesP = 0;
  var jueves =0;
  var juevesA = 0;
  var juevesR = 0;
  var juevesP = 0;
  var viernes =0;
  var viernesA = 0;
  var viernesR = 0;
  var viernesP = 0;
  var sabado =0;
  var sabadosA = 0;
  var sabadosR = 0;
  var sabadosP = 0;
  var domingo = 0;
  var domingosA = 0;
  var domingosR = 0;
  var domingosP = 0;

  //http://localhost:3000/api/reporte_servicios_solicitados?fecha_inicio=01-02-2018&fecha_fin=02-02-2018&orderby=ASC

  //parametro fechas
  if(req.query.fecha_inicio){
    var fecha_inicio = req.query.fecha_inicio;
  }else{
    var fecha_inicio = '01/01/0001';
  }

  if(req.query.fecha_fin){
    var fecha_fin = req.query.fecha_fin;
  }else{
    var fecha_fin = '31/12/9999';
  }
  
  
  Reporte_reclamo.query(function(qb) {
    // qb.column('fecha_creacion');
    // qb.count("*");
    // qb.count("*").where('estado','A');
    // qb.groupBy('fecha_creacion');
    // qb.orderBy('count', req.query.orderby);
    qb.whereBetween('fecha_creacion', [fecha_inicio, fecha_fin+' 23:59']);
  }).fetchAll({})
  .then(function(data){

    //parametro respuesta
    for (var i = 0; i < data.length; i++) {

      var semana = new Date(data.toJSON()[i].fecha_creacion).getDay();

      if(semana==0){
        domingo++;
        if(data.toJSON()[i].estado=='A') domingosA++;
        if(data.toJSON()[i].estado=='R') domingosR++;
        if(data.toJSON()[i].estado=='P') domingosP++;
      }

      if(semana==1){
        lunes++;
        if(data.toJSON()[i].estado=='A') lunesA++;
        if(data.toJSON()[i].estado=='R') lunesR++;
        if(data.toJSON()[i].estado=='P') lunesP++;
      }

      if(semana==2){
        martes++;
        if(data.toJSON()[i].estado=='A') martesA++;
        if(data.toJSON()[i].estado=='R') martesR++;
        if(data.toJSON()[i].estado=='P') martesP++;
      }

      if(semana==3){
        miercoles++;
        if(data.toJSON()[i].estado=='A') miercolesA++;
        if(data.toJSON()[i].estado=='R') miercolesR++;
        if(data.toJSON()[i].estado=='P') miercolesP++;
      }

      if(semana==4){
        jueves++;
        if(data.toJSON()[i].estado=='A') juevesA++;
        if(data.toJSON()[i].estado=='R') juevesR++;
        if(data.toJSON()[i].estado=='P') juevesP++;
      }

      if(semana==5){
        viernes++;
        if(data.toJSON()[i].estado=='A') viernesA++;
        if(data.toJSON()[i].estado=='R') viernesR++;
        if(data.toJSON()[i].estado=='P') viernesP++;
      }

      if(semana==6){
        sabado++;
        if(data.toJSON()[i].estado=='A') sabadosA++;
        if(data.toJSON()[i].estado=='R') sabadosR++;
        if(data.toJSON()[i].estado=='P') sabadosP++;
      }

    }

    var respuesta = [
      {
        dia:        'lunes',
        reclamos:    lunes,
        aprobados:   lunesA,
        rechazados:  lunesR,
        pendientes:  lunesP 
      },
      {
        dia:        'martes',
        reclamos:    martes,
        aprobados:   martesA,
        rechazados:  martesR,
        pendientes:  martesP 
      },
      {
        dia:        'miercoles',
        reclamos:    miercoles,
        aprobados:   miercolesA,
        rechazados:  miercolesR,
        pendientes:  miercolesP 
      },
      {
        dia:        'jueves',
        reclamos:    jueves,
        aprobados:   juevesA,
        rechazados:  juevesR,
        pendientes:  juevesP 
      },
      {
        dia:        'viernes',
        reclamos:    viernes,
        aprobados:   viernesA,
        rechazados:  viernesR,
        pendientes:  viernesP 
      },
      {
        dia:        'sabado',
        reclamos:    sabado,
        aprobados:   sabadosA,
        rechazados:  sabadosR,
        pendientes:  sabadosP 
      },
      {
        dia:        'domingo',
        reclamos:    domingo,
        aprobados:   domingosA,
        rechazados:  domingosR,
        pendientes:  domingosP 
      },

    ];

    res.status(200).json({ error : false, data : respuesta });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}
