/*
  Creado por Damián Cipolat - 2017/08/14

  Este script es un ejemplo de como manejar una comunicación asincronica y aplicar
  el uso del objeto promise.

  En esta caso se usa para descargar cada X tiempo una lista de usuarios.
*/

const https   = require('https');
let reqCount = 0;

//Traigo la lista de usuarios.
let getUsers = ()=>{

  //Creo una promise para evitar usar callbacks y que sea mas prolijo el manejo del async.
  return new Promise((resolve,reject)=>{

    try{

      //Defino host.
      let url = 'https://jsonplaceholder.typicode.com/users';

      //Hago el request por GET.
      https.get(url,(response)=>{

        let body = '';

        //Cuando se va descargando contenido.
        response.on('data',(data)=>{
          body += data;
        });

        //Cuando termino de descargarse.s
        response.on('end',()=>{
          let data = JSON.parse(body);

          //Cuando tengo los datos lo retorno al then del promise.
          resolve(data);
        });

      });

    }
    catch(e){

      //En vaso de haber un error lo retorno al reject.
      reject(e);

    }

  });

}


//Ejecuto request al api y muestro por consola.
let procUsers = ()=>{

  reqCount++;
  console.log('Intento N°',reqCount);
  console.log('Esperando datos:');
  console.log('');

  getUsers().then((users)=>{

    users.forEach((user)=>{

      console.log('#'+user.id+' '+user.name+' '+user.username+' '+user.email);
    });    

    console.log('');

  }).catch((reason)=>{

    console.log('error',reason);

  });
  
}

console.log('Iniciando...');

//Uso un intervalo cada 3 segundos para mantener vivo el script.
setInterval(procUsers,5000);

