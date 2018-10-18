//----dependencias------  
'use strict'
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

function enviarCorreo(correoDestino, nombreCliente, apellidoCliente, contrasenia) {

    //---- Configurar Cuenta ------  
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mystiqueq4@gmail.com', // correo emisor
            pass: 'digitaldomain57' // contraseña del correo
        }
    });

    //---- Configurar Template ------
    transporter.use('compile', hbs({
        viewPath: 'services/mail-template',
        extName: '.hbs'
    }));

    //---- Configurar Correo ------  
    const mailOptions = {
        from: 'mystiqueq4@gmail.com', //cuenta emisor
        to: correoDestino, //cuenta destino
        subject: 'Suscripción Mystique', //asunto msj
        //text: 	mensaje,					//texto msj
        //html:  	html,						//html    
        template: 'index3',
        context: {
            correo: correoDestino,
            nombre: nombreCliente,
            apellido: apellidoCliente,
            contrasenia: contrasenia
        }
    };

    //---- Enviar Correo  ------  
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email enviado: ' + info.response);
        }
    });

}

module.exports = { enviarCorreo };