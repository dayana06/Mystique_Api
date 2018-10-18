//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/reporte_servicio_calificado')

//----Rutas------ 
router.get('/reporte_servicio_calificado', controller.reporte)

module.exports = router;