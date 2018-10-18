//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/reporte_servicio')

//----Rutas------ 
router.get('/reporte_servicio', controller.reporte)

module.exports = router;