//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/respuesta_solicitud_foraneo')

//----Parametros------
const path = '/respuesta_solicitud_foraneo'
const id = ':id'

//----Rutas------ 

router.get(`${path}/${id}`,controller.findOneDocument)


module.exports = router;