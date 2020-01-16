// as chaves importam apenas o que interessa do express. No caso abaixo, só o Router.
const {Router} = require('express');

//importa-se o DevController
const   DevController = require('./controllers/DevController');
const   SearchController = require('./controllers/SearchController');

// declara-se a variável routes, e se-a iguala à função Router()
// com isso, "routes" passa a possuir todos os métodos até então possuídos por "app"
const routes = Router();

//consequentemente, routes pode chamar métodos get, post, put, etc.
routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);

routes.get('/search', SearchController.index);

//para que a aplicação conheça as rotas deste arquivo, ele deve ser exportado
module.exports = routes;