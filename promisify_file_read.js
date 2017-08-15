/*
  Creado por Damián Cipolat - 2017/08/14

  Este script es un ejemplo de como usar las promises de BlueBirds.
  http://bluebirdjs.com/docs/api/promise.promisify.html

  Se usar promisify para convertir una funcion SINCRONICA a un ASINCRONCIA usando promises.
*/

const Promise = require('bluebird');
const fs      = require('fs');

//Forma tradicional sincrona.
let readSync = ()=>{

  fs.readFile('./mario.txt', function(err, buffer) {
      console.log('SYNC');
      console.log(buffer.toString());
  });

}

//Forma tradicional asincrona.
let readAsync = ()=>{

  //Transformo la función de lectura sincrona a una promise.
  let promRead = Promise.promisify(fs.readFile);

  promRead('./mario.txt').then(function(buffer){
      console.log('ASYNC');
      console.log(buffer.toString());
    });

}

//Ejecuto luego de 3 segundos.
setTimeout(readAsync,1);

