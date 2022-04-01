
const axios = require('axios');

const Trips = require('../models/Trips');
const BoundingBox = require('boundingbox');


/* exports.ObtenerDatos = async (req,res,next)=>{

   
    const { start_gte, start_lte, distance_gte } = req.params;   
    const limit = req.params.limit || 20;
    const offset = req.params.offset || 0;    
  
    try {

          const trips = await Trips.find().where('start.time').gt(start_gte).lt(start_lte).where('distance').equals(distance_gte).sort({ _id: 1}).skip(offset).limit(limit);
          res.json({trips});
  
     } catch (error) {
  
         console.log(error);
         next();
  
     }

    
   
}*/


async function ObtenerDatos (req,res,next){

   // console.log('llego');  
    const { start_gte, start_lte, distance_gte } = req.params;   
    const limit = req.params.limit || 20;
    const offset = req.params.offset || 0;    
  
    try {

          const trips = await Trips.find().where('start.time').gt(start_gte).lt(start_lte).where('distance').equals(distance_gte).sort({ _id: 1}).skip(offset).limit(limit);
          res.json({trips});
  
     } catch (error) {
  
         console.log(error);
         next();
  
     }



}


async function InsertData (req,res,next){

        // console.log("Hola");
        let overspeedsCount = 0;
        readings =req.body.readings;
     //   console.log(readings);
         if(readings.length <5){
        
            res.json('Debe enviar por lo menos 5 Readings para la creación del viaje!!');
            next();  
        }


        const start = Object.entries(readings).reduce( (prev, curr) => {           
                return prev[1].time < curr[1].time ? prev : curr;
        })[1];

        const end = Object.entries(readings).reduce( (prev, curr) => {
            return prev[1].time > curr[1].time ? prev : curr;
        })[1];

        let duration = end.time - start.time;   
    
        readings.forEach((r) => { if(r.speed > r.speedLimit) { overspeedsCount++; } });

       
        const bbox = new BoundingBox({lat: start.location.lat, lon: start.location.lon, maxlat: end.location.lat, maxlon: end.location.lon});        
       
    
        const startAddress =  await getAddress(start.location.lat, start.location.lon);
      
        const endAddress =   await getAddress(end.location.lat, end.location.lon);
        const distance =  await getKilometros(start.location.lat, start.location.lon, end.location.lat, end.location.lon);      

        var trips = {};
        trips.start = {time: start.time, lat: start.location.lat, lon: start.location.lon, address: startAddress?.display_name || ''};
        trips.end = { time: end.time, lat: end.location.lat, lon: end.location.lon, address: endAddress?.display_name || '' };
        trips.distance = distance;
        trips.duration = duration;
        trips.overspeedsCount = overspeedsCount;
        trips.boundingBox = [{lat: bbox.minlat, lon:bbox.minlon},{lat: bbox.maxlat, lon:bbox.maxlon}];
         

        //console.log(trips);
        const Trip = await Trips.create(trips);

        try {
            res.json({mensaje: 'Se Agrego Con Exito'});            
        } catch (error) {

               res.json(error);
                next();

        }

}

module.exports= {InsertData,ObtenerDatos};

/*exports.InsertData = async(req,res,next)=>{
   
      // console.log("Hola");
        let overspeedsCount = 0;
        readings =req.body.readings;
     //   console.log(readings);
         if(readings.length <5){
        
            res.json('Debe enviar por lo menos 5 Readings para la creación del viaje!!');
            next();  
        }


        const start = Object.entries(readings).reduce( (prev, curr) => {           
                return prev[1].time < curr[1].time ? prev : curr;
        })[1];

        const end = Object.entries(readings).reduce( (prev, curr) => {
            return prev[1].time > curr[1].time ? prev : curr;
        })[1];

        let duration = end.time - start.time;   
    
        readings.forEach((r) => { if(r.speed > r.speedLimit) { overspeedsCount++; } });

       
        const bbox = new BoundingBox({lat: start.location.lat, lon: start.location.lon, maxlat: end.location.lat, maxlon: end.location.lon});        
       
    
        const startAddress =  await getAddress(start.location.lat, start.location.lon);
        console.log(startAddress);
        const endAddress =   await getAddress(end.location.lat, end.location.lon);
        const distance =  await getKilometros(start.location.lat, start.location.lon, end.location.lat, end.location.lon);      

        var trips = {};
        trips.start = {time: start.time, lat: start.location.lat, lon: start.location.lon, address: startAddress?.display_name || ''};
        trips.end = { time: end.time, lat: end.location.lat, lon: end.location.lon, address: endAddress?.display_name || '' };
        trips.distance = distance;
        trips.duration = duration;
        trips.overspeedsCount = overspeedsCount;
        trips.boundingBox = [{lat: bbox.minlat, lon:bbox.minlon},{lat: bbox.maxlat, lon:bbox.maxlon}];
         

        //console.log(trips);
        const Trip = new Trips(trips);

        try {
                
            await Trip.save();
            res.json({mensaje: 'Se Agrego Con Exito'});
            
        } catch (error) {

               res.json(error);
                next();

        }
    

}*/



//Funcion para Obtener la dirección
async function getAddress(lat,log){

    return Promise.resolve({
    
        then: function(resolve, onReject) { 
             axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&addressdetails=1&lat=${lat}&&lon=${log}`)
                  .then(function (response) {        
                     resolve(response.data);
                 }).catch(function (error) {          
                    onReject(error);
                })
         }
      });
          
        
}
     
//Funcion para obtener los kilometros en decimales
async function getKilometros(lat1,lon1,lat2,lon2){
    
    const rad = function(x) {return x*Math.PI/180;}
    let R = 6378.137; //Radio de la tierra en km
    let dLat = rad( lat2 - lat1 );
    let dLong = rad( lon2 - lon1 );
    let a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    let d = R * c;

    return parseFloat(d.toFixed(3)); //Retorna tres decimales
    
}

