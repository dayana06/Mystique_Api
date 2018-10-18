//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/gestion_cita')

//----Rutas------ 
router.post('/agregar_cita', controller.agregar);

module.exports = router;