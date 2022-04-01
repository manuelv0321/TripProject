const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Trips = new Schema({

    start:[{

        time:{
             type: Number
          
        },

        lat:{
            type: Number
            
        },

        lon:{
            type: Number
            
        },

        address:{
            type: String
            
        }

    }],

    end:[{

        time:{
             type: Number
        },

        lat:{
            type: Number
        },

        lon:{
            type: Number 
        },

        address:{
            type: String
        }

    }],

   distance: Number,
   duration: Number,
   overspeedsCount: Number,
   boundingBox:[{

        lat:{
            type: Number
        },

        lon:{
            type: Number
        }

   }]   


})

module.exports = mongoose.model('Trips',Trips);
