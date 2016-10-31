function calculaLivres(iniciais, finais, rangeInicio, rangeFim, sala) {

    var free = [];

    if(new Date(iniciais[0]) - new Date(rangeInicio) > 0 ){
        free.push({inicial: rangeInicio, final: iniciais[0]})
    }
    if(iniciais.length > 1){
        for(var x = 1; x < iniciais.length; x++){
            if (new Date(finais[x-1]) - new Date(iniciais[x]) < 0){
                free.push({inicial: finais[x-1], final: iniciais[x]});
            }
        }
    }
    if((new Date(finais[finais.length-1]) - new Date(rangeFim)) < 0){
        free.push({inicial: finais[finais.length-1], final: rangeFim});
    }

    return free;
    
}

module.exports.calculaLivres = calculaLivres;