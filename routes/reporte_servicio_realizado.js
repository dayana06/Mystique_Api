//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/reporte_servicio_realizado')

//----Rutas------ 
router.get('/reporte_servicio_realizado/:id', controller.reporte)

module.exports = router;