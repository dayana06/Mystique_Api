//----dependencias------ 
'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/solicitud_presupuesto')

//----Parametros------
const path = '/solicitud_presupuesto'
const id = ':id'

//----Rutas------ 
router.get(`${path}/${id}`,controller.findOneDocument)

module.exports = router;