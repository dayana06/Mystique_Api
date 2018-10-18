//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/gestion_detalle_servicio')

//----Rutas------ 
router.post('/gestion_detalle_servicio', controller.agregar);

module.exports = router;