import React, { useState, useEffect } from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevItem from './components/DevItem';
import DevForm from './components/DevForm'


function App() {
    //a cada mudança de Estado ou propriedade, é como se o componente fosse executado de novo. Ele recebe dois parâmetros.
    // o primeiro é a função que ele precisa executar; o segundo é quando essa função deve ser executada
    const [devs, setDevs] = useState([]);

    //useEffect serve para disparar a função toda a vez que uma informação alterar
    useEffect(() => {
        async function loadDevs() {
            const response = await api.get('/devs');

            setDevs(response.data);
        }

        loadDevs();
        //se o array abaixo estiver vazio - como está -, a função executa uma única vez. Se tivesse uma variável como parâmetro,
        //seria alçterado a cada vez que o valor da variável se alterasse
    }, []);

    // a função abaixo atrelará mudanças de acordo com o Estado dos dados postados
    async function handleAddDev(data) {
        const response = await api.post('/devs', data)
        
        setDevs([...devs, response.data]);
    }

    //onSubmit, abaixo, dispara handleAddDev
    // a função map percorrerá toda a variável dev
    return (
        <div id="app">
            <aside>
                <strong>Cadastrar</strong>
                
                <DevForm onSubmit={handleAddDev}/>
            </aside>

            <main>
                <ul>                
                    {devs.map(dev => (
                        <DevItem key={dev._id} dev={dev} />
                    ))}

                </ul>
            </main>
        </div>
    );
}

export default App;