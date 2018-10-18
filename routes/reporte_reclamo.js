//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/reporte_reclamo')

//----Rutas------ 
router.get('/reporte_reclamo', controller.reporte)

module.exports = router;