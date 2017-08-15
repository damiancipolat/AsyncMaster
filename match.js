/*
  Creado por Damián Cipolat - 2017/08/14

  Este script es un ejemplo de como manejar una comunicación asincronica y aplicar
  el uso del objeto promise para trabajar con varios request simultaneos.

  En esta caso se usa para descargar datos de dos usuarios de un api a la vez, simula un ejemplo de app de citas.
*/

const https  = require('https');

//Traigo info. de un user hombre.
let getMale = ()=>{

  //Creo una promise para evitar usar callbacks y que sea mas prolijo el manejo del async.
  return new Promise((resolve,reject)=>{

    try{

      //Defino host.
      let url = 'https://randomuser.me/api/?gender=male';

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

//Traigo info. de un user mujer.
let getFemale = ()=>{

  //Creo una promise para evitar usar callbacks y que sea mas prolijo el manejo del async.
  return new Promise((resolve,reject)=>{

    try{

      //Defino host.
      let url = 'https://randomuser.me/api/?gender=female';

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

//Ejecuto ambos request para traer un hombre y una mujer.
let matchUsers = ()=>{

  //Traigo ambos datos, si falla no traigo da ok.
  Promise.all([getMale(),getFemale()]).then((users)=>{

    if (users.length>0){

      let man    = (users[0].results[0].name.title+' '+users[0].results[0].name.first+' '+users[0].results[0].name.last).toUpperCase();
      let female = (users[1].results[0].name.title+' '+users[1].results[0].name.first+' '+users[1].results[0].name.last).toUpperCase();

      console.log('<3 <3 <3 <3 <3 <3 <3 <3 <3 <3 <3 <3');
      console.log('');
      console.log(man+' y '+female);
      console.log('');
      console.log('<3 <3 <3 <3 <3 <3 <3 <3 <3 <3 <3 <3');
    }
    else
      console.log('No se pudo matchear a los usuarios!');

  },(error)=>{
    console.log('No se pudo matchear a los usuarios!');
  });
  
}

console.log('Matchando usuarios.');
console.log('');

//Uso un intervalo cada 3 segundos para mantener vivo el script.
setTimeout(matchUsers,1000);

