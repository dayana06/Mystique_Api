//----dependencias------  
'use strict'
const bcrypt = require("bcryptjs");
const Reporte_cita = require('../models/reporte_cita');

exports.reporte = (req,res) => {

  //http://localhost:3000/api/reporte_reclamo?fecha_inicio=&fecha_fin=

  var enero =0;
  var febrero = 0;
  var marzo = 0;
  var abril = 0;
  var mayo =0;
  var junio = 0;
  var julio = 0;
  var agosto = 0;
  var septiembre =0;
  var octubre = 0;
  var noviembre = 0;
  var diciembre = 0;

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
  
  
  Reporte_cita.query(function(qb) {
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

      if(req.query.ano){

        var ano = new Date(data.toJSON()[i].fecha_creacion).getFullYear();

        if(ano==req.query.ano){

          var mes = new Date(data.toJSON()[i].fecha_creacion).getMonth();
          if(mes==0) enero++;
          if(mes==1) febrero++;
          if(mes==2) marzo++;
          if(mes==3) abril++;
          if(mes==4) mayo++;
          if(mes==5) junio++;
          if(mes==6) julio++;
          if(mes==7) agosto++;
          if(mes==8) septiembre++;
          if(mes==9) octubre++;
          if(mes==10) noviembre++;
          if(mes==11) diciembre++;

        }

      }else{

        var mes = new Date(data.toJSON()[i].fecha_creacion).getMonth();
        if(mes==0) enero++;
        if(mes==1) febrero++;
        if(mes==2) marzo++;
        if(mes==3) abril++;
        if(mes==4) mayo++;
        if(mes==5) junio++;
        if(mes==6) julio++;
        if(mes==7) agosto++;
        if(mes==8) septiembre++;
        if(mes==9) octubre++;
        if(mes==10) noviembre++;
        if(mes==11) diciembre++;

      }

    }

    var respuesta = [
      {
        mes:    'enero',
        citas:  enero,
      },
      {
        mes:    'febrero',
        citas:  febrero,
      },
      {
        mes:    'marzo',
        citas:  marzo,
      },
      {
        mes:    'abril',
        citas:  abril,
      },
      {
        mes:    'mayo',
        citas:  mayo,
      },
      {
        mes:    'junio',
        citas:  junio,
      },
      {
        mes:    'julio',
        citas:  julio,
      },
      {
        mes:    'agosto',
        citas:  agosto,
      },
      {
        mes:    'septiembre',
        citas:  septiembre,
      },
      {
        mes:    'octubre',
        citas:  octubre,
      },
      {
        mes:    'noviembre',
        citas:  noviembre,
      },
      {
        mes:    'diciembre',
        citas:  diciembre,
      },
    ];

    res.status(200).json({ error : false, data : respuesta });
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: {message: err.message} });
  });

}
