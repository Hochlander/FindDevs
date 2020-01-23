// a ideia deste arquivo é fazer com que o servidor também entenda o protocolo websocket, pra além do http
const socketio = require('socket.io');

const parseStringAsArray = require ('./utils/parseStringAsArray');
const calculateDistance = require ('./utils/calculateDistance');

let io;

// a variável abaixo é uma gambiarra para armazenar as conexões.
// idealmente, esta missão é cumprida por um banco de dados.
const connections = [];

// a linha abaixo exporta a função setupWebsocket, que configura o servidor para entender requisições neste protocolo
exports.setupWebsocket = (server) => {
    io = socketio(server);

    //adiciona-se o EventListener. O evento em questão é a conexão. Sempre que um usuário se conectar na aplicação via
    //Websocket, recebe-se o objeto "socket". 
    io.on('connection', socket=>{

        //o console.log só é executado na conexão de um novo cliente na aplicação
        // sempre que o socket.io detecta a queda do servidor, ele tenta reconectar automaticamente
        const {latitude, longitude, techs} = socket.handshake.query;
        
        // o método abaixo adiciona as conexões feitas na aplicação à variável connections
        connections.push({
            id: socket.id,
            coordinates:{
                latitude: Number(latitude),
                longitude: Number(longitude),                
            },
            techs: parseStringAsArray(techs),
        });
    });
};

exports.findConnections =(coordinates, techs)=>{
    // a linha abaixo percorre todas as conexões do WebSocket e filtra o que é pertinente às condições dadas
    return connections.filter(connection=>{
        return calculateDistance(coordinates, connection.coordinates)<10
        && connection.techs.some(item => techs.includes(item))
    })
}

exports.sendMessage=(to, message, data) =>{
   to.forEach(connection=>{
    io.to(connection.id).emit(message, data)
   }) 
}