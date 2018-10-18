//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/reporte_cita')

//----Rutas------ 
router.get('/reporte_cita', controller.reporte)

module.exports = router;