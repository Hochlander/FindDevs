//Este arquivo receberá uma requisição e enviará uma resposta

// a biblioteca axios faz chamadas para outras APIs
const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray'); 
const {findConnections, sendMessage} = require('../websocket');

// funções do controller: INDEX(mostrar uma lista), SHOW(mostrar um único), 
//STORE(criar), UPDATE(alterar), DESTROY(deletar)

module.exports = {
    // o acesso a uma rota é uma requisição; requisição é tudo o que VEM do front end
    // resposta é tudo o que VAI para o front end; a resposta pode ser uma imagem, um texto, um json, etc.
    //json é um objeto? Orientação a objetos = orientação a jsons?
    //como se trata de exibição, é INDEX
    async index(request, response){
        const devs = await Dev.find();

        return response.json(devs);
    },

    // a função abaixo já não é arrow, porque tem um nome: "store"
    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;

        // o await significa que quer-se esperar este procedimento ser terminado para disparar outro
        let dev = await Dev.findOne({ github_username });

        if (!dev) {

            //"response" é a resposta que será obtida pela chamada de Axios À API
            // em nosso app, não temos controle sobre a velocidade da API do github.

            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

            const { name = login, avatar_url, bio } = apiResponse.data;

            
            const techsArray = parseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };

            dev = await Dev.create({
                // com exceção de "techs", o nome da propriedade é o mesmo do valor.
                //Isso dispensa os dois pontos(ex= name:name). Em JS, o nome disso é "Short Syntax"
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            })

            //filtrar conexões de acordo com dondições de localização (10km) e tecnologia (compatível)
            const sendSocketMessageTo = findConnections(
                {latitude, longitude},
                techsArray,
                )

            sendMessage(sendSocketMessageTo, 'new-dev', dev);
        }

        // a linha abaixo dá o comando de retornar os dados que foram cadastrados na função acima
        return response.json(dev);
    }
};