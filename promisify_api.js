/*
  Creado por Damián Cipolat - 2017/08/14

  Este script es un ejemplo de como usar las promises de BlueBirds.
  http://bluebirdjs.com/docs/api/promise.promisify.html

  Se usar promisify para convertir una funcion SINCRONICA a un ASINCRONCIA usando promises.

  En este ejemplo se usa para aplicarlo a EXPRESSJS.
*/

const http     = require('http');
const express  = require('express');
const app      = express();
const server   = http.createServer(app);
const Promise  = require('bluebird');
const port     = 5000;

//Transformo get en asincronico.
app.get = Promise.promisify(app.get);

//Cuando hago http://localhost:5000/search, me genera una lista de hoteles al azar.
app.get('/test').then((data)=>{

  //res.json({nombre:'damian'});
  console.log(data);

}).catch((err)=>{
  console.log('Error!');
  //res.json({error:'route error'});
});

//Inicializo el servidor, escuchando conexiones en el puerto fijado en port.
app.listen(port,(err)=>
{
  //Si hay un error, muestro por la consola, sino msj de inicio.
  if (err)
    console.log('ERROR: hubo un problema al iniciar el server.');
  else
    console.log('>Listen on port: '+port);
});