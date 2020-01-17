//sempreque for usar html dentro do JS, temque importar o REact
import React, {useState} from 'react';

//três conceitos principais do React

//1.Componente
//Componente é uma função que retorna algum conteúdo html, css ou js pra interface.
// Um novo componente pode ser criado para ser repetido, e sua unidade se dá
//pelo fato de não afetar outros componentes. Componentes são unidades independentes
//Um post no FB é um componente. Anúncios são componentes
// Primeiras letras de componentes são maiúsculas
// Cada arquivo pode ter um componente

//2.Estado
//Estado são informações mantidas pelo componente (Lembrar: imutabilidade)

//3.Propriedade
//São informações que um componente-pai passa para o componente-filho

function App() {//App=componente-pai, Header são componentes-filhos
  //funções de componentes devem ser criadas dentro dos componentes

  // a linha abaixo cria o Estado
  //setCounter não atualiza o Estado de counter, mas cria um novo counter
  const [counter, setCounter]=useState(0);  

  function incrementCounter(){
    setCounter(counter + 1);
  }
  return (
    //a tag abaixo, fragment, é uma tag sem nomenclatura que marca um container. Existe pq em REact   
    // só pode ir um componente por vez. Na existência de dois, cria-se um fragment para ser o componente maior que engloba os outros. Aí, rola.
    //no caso abaixo, title é a propriedade do componentes Header
    <>
    <h1>Contador:{counter}</h1>
    <button onClick={incrementCounter}>Incrementar</button>
    </>
  );
}

export default App;
