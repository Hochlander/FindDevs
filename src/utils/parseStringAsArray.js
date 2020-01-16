module.exports = function parseStringAsArray(arrayAsString){
    // a função abaixo converte String em arrays, separando cada uma por vírgulas.
    // foi colocada num arquivo separado porque é usada em mais de um lugar, 
    // então separa-se pra não terque ficar repetindo a mesma coisa toda hora.
    return arrayAsString.split(',').map(tech => tech.trim());
}