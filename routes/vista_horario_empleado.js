'use strict'
const express = require('express')

//----dependencias------ 
const router = express.Router()
const controller = require('../controllers/vista_horario_empleado')

//----Parametros------
const path = '/vista_horario_empleado'
const id = ':id'

//----Rutas------ 
router.get(`${path}`, controller.findDocuments)
router.get(`${path}/${id}`,controller.findOneDocument)
router.get('/vista_horario_fecha/:fecha/:empleado',controller.buscarPorFecha)


module.exports = router;