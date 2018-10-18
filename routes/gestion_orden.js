'use strict'
const express = require('express')

const router = express.Router()
const controller = require('../controllers/gestion_orden')

//----Rutas------ 
router.post('/agregar_orden', controller.agregar);

module.exports = router;