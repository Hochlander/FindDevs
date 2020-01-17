import React from 'react';

//ReactDom gera a capacidade do REact se comunicar com a árvore de elementos da aplicação
//React Dom varia do ambiente para ambiente em que está
import ReactDOM from 'react-dom';

// A linha abaixo importa o app.js
// app é uma função que retorna um conteúdo html
import App from './App';

// a linhga abaixo pega o REactDom, manda renderizar o app dentro da div com id root.
ReactDOM.render(<App />, document.getElementById('root'));


