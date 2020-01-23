// express auxilia na criação de rotas

// define-se a variável express, e importa-se seu módulo; agora o módulo está disponível dentro da variável
const express = require('express');

// Mongoose é uma biblioteca que dá acesso do Node dentro da base de dados Mongo.
// É a ferramenta decomunicação entre aplicação e DB.
const mongoose = require('mongoose');

const cors = require('cors');

const http = require('http');

// as rotas exportadas pelo arquivo "routes" são importadas para "index" pelo comando abaixo
//passa-se o caminho relativo "./", e não o nome do arquivo (que seria .js)
const routes = require('./routes');

//importa-se a função.
const {setupWebsocket} = require('./websocket')

//cria-se a variável app, e o express como uma função da variável app
const app = express();

// a linha abaixo extrai o servidor http de dentro do express;
//normalmente o servidor http vem embutido no express.
//isso pode ser um problema quando se deseja usar algum protocolo que não o http. É o caso aqui.
const server = http.Server(app);

//envia-se o servidor
setupWebsocket(server);

mongoose.connect('mongodb+srv://omnistack:root@cluster0-4ybp0.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology: true,
});

app.use(cors());

// ".use" significa que o que virá depois será valido para todas as rotas da aplicação;
// a linha abaixo informa ao express que ele receberá informações no formato json
app.use(express.json());

//métodos de requisição HTTP possíveis: get, post, put, delete

// Tipos de parâmetros dos métodos http dentro do express: Query params, Route params, Body

//Query params: req.query (filtros, ordenação, paginação). Normalmente são usados com método get.
//Query params são incorporados à URL.

// Route params: request.params. Servem para identificar um recurso na alteração ou remoção
// No caso de hoje, vão ser usados para fazer requisições PUT e DELETE, 
//quando queremos nos referir a um objeto específico

// Body: request.body (Dados para a criação ou alteração de um registro)
//É mais usado no POST e no PUT, quando informações precisam ser enviadas no corpo da requisição.
// o corpo da requisição pode ser um Json, por exemplo

// MongoDB (Não-relacional)

//com o comando abaixo, todas as rotas estão cadastradas novamente
app.use(routes);


server.listen(3333);