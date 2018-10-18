//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/reporte_promocion')

//----Rutas------ 
router.get('/reporte_promocion', controller.reporte)

module.exports = router;