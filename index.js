//---- dependencias ------  
'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const formidable = require('express-form-data');

//---- dependencias ------
const config = require('./config');
const routes = require('./routes');

//---- app ------
const app = express();
var http = require('http').Server(app);
const io = require('socket.io')(http);
//---- body parser------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//---- CORS ------
app.use(cors());

//---- express-formidable (para las img) ------
app.use(formidable.parse({ keepExtensions: true }));

//----Agregar Archivos staticos (para las img)------
app.use("/files", express.static('files'));

//---- routes ----
app.use('/api', routes);

//---- correr servidor -----
app.listen(config.port, () => {
    console.log(`Api rest corriendo en http://localhost:${config.port}`);

});
io.on('connection', (socket) => {
    console.log('conectao');
    socket.emit('mensaje', () => {
        console.log('holaaa');
    });
    socket.on('respuesta', (data) => {
        console.log(data);
    });
    //------ Movil ---------------------
    socket.on('nueva_solicitu', (resp) => {
        console.log(resp);
        io.emit('solicitu', resp);
    });
    socket.on('nuevo_comentario', (resp) => {
        console.log(resp);
        io.emit('comentario', resp);
    });
    socket.on('nuevo_reclamo', (resp) => {
        console.log(resp);
        io.emit('reclamo', resp);
    });
    //---------------------------------------

    //----------- Intranet ---------------

    socket.on('nueva_respuesta_solicitud', (resp) => {
        console.log(resp);
        io.emit('respuesta_solicitu', resp);
    });
    socket.on('nueva_respuesta_comentario', (resp) => {
        console.log(resp);
        io.emit('respuesta_comentario', resp);
    });
    socket.on('nueva_respuesta_reclamo', (resp) => {
        console.log(resp);
        io.emit('respuesta_reclamo', resp);
    });
    socket.on('nueva_promocion', (resp) => {
        console.log(resp);
        io.emit('creacion_promo', resp);
    });
    socket.on('nuevo_consejo', (resp) => {
        console.log(resp);
        io.emit('creacion_consejo', resp);
    });
    socket.on('nuevo_servicio', (resp) => {
        console.log(resp);
        io.emit('creacion_servicio', resp);
    });

    //--------------------------------------------
});

var port = process.env.port || 3001;

http.listen(port, () => {
    console.log('socket corrieno en puesto 3001');
})