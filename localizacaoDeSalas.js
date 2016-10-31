var salasMaringa = []//Array de salas em maringá 
var salasSaoPaulo = []//Array de salas em São Paulo
var salasCampinas = []//Array de salas em Campinas

function retornaSalasDoLocal(arrayLocais) {

    var retorno = new Array;  

    arrayLocais.forEach(function (local) {
        if(local === 'MGA'){
            salasMaringa.forEach(function (sala) {
                retorno.push(sala);
            })
        }else if(local === 'CPS'){
            salasCampinas.forEach(function (sala) {
                retorno.push(sala);
            })
        }else if(local === 'SPO'){
            salasSaoPaulo.forEach(function (sala) {
                retorno.push(sala);
            })
        }
    })
    return retorno;
}                     

module.exports.retornaSalasDoLocal = retornaSalasDoLocal;