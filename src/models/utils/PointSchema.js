const mongoose = require('mongoose');

const PointSchema = new mongoose.Schema({
    type:{
        type:String,
        enum: ['Point'],
        required:true,
    },
   coordinates:{
       type:[Number],
       required:true,
   }
});

//exporta-se este arquivo
module.exports = PointSchema;