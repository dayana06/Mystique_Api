//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/reporte_servicios_solicitados')

//----Rutas------ 
router.get('/reporte_servicios_solicitados', controller.reporte)

module.exports = router;