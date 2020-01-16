// importa-se mongoose para informá-lo o formato de Dev na base de dados.
const mongoose = require('mongoose');

// importa-se o PointSchema, que por sua vez foi exportado
const PointSchema = require('./utils/PointSchema');

//Schema é a estruturação de uma entidade no banco de dados
const DevSchema = new mongoose.Schema({
    //abaixo, passa-se os campos que o (objeto?) usuário terá
    name: String,
    github_username: String,
    bio: String,
    avatar_url: String,
    techs: [String],
    location:{
        type: PointSchema,
        index: '2dsphere'
    }
});

//exporta-se este modelo. "Dev" é o nome do modelo;
module.exports = mongoose.model('Dev', DevSchema);