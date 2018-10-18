//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/reporte_comentario')

//----Rutas------ 
router.get('/reporte_comentario', controller.reporte)

module.exports = router;