//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/reporte_solicitud')

//----Rutas------ 
router.get('/reporte_solicitud', controller.reporte)

module.exports = router;