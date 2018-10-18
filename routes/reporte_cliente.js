//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/reporte_cliente')

//----Rutas------ 
router.get('/reporte_cliente', controller.reporte)

module.exports = router;