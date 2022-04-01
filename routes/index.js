/*const express = require('express');
const router = express.Router();
const Data = require('../controllers/Datos');

module.exports = function(){




    //metodo para extraer ticket por mesa tecnica
    router.get('/test/datos/:start_gte/:start_lte/:distance_gte/:limit/:offset',
                 Data.ObtenerDatos    
              )
    
    router.post('/test/create',
                 Data.InsertData
               )          
   
    return router;

}*/

const express = require('express');
const router = express.Router();
const {ObtenerDatos,InsertData} = require('../controllers/Datos');

module.exports = function(){

router.get('/test/datos/:start_gte/:start_lte/:distance_gte/:limit/:offset',ObtenerDatos);
router.post('/test/create',InsertData);
return router;


}

