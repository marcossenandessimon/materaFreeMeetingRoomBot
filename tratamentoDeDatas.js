function tratarDatas(data) {
    var hojePattern = /HOJE/
    var amanhaPattern = /AMANHA|AMANHÃ/
    var diaDDPattern = /DIA \d?\d/
    var diaDDMMPattern = /(DIA \d?\d\/\d?\d)|(\d?\d\/\d?\d)/
    var segundaPattern = /SEGUNDA/
    var tercaPattern = /TERCA/
    var quartaPattern = /QUARTA/
    var quintaPattern = /QUINTA/
    var sextaPattern = /SEXTA/
    var retorno;
    var dataAtual = new Date()
    if(data.match(hojePattern)){
        retorno = dataAtual;
    }else if(data.match(amanhaPattern)){
        var dataTemp = new Date()
        dataTemp.setDate(dataAtual.getDate() + 1)
        retorno = dataTemp
    }else if(data.match(segundaPattern)){
        retorno = dataNoProximoDiaXDaSemana(1);
    }else if(data.match(tercaPattern)){
        retorno = dataNoProximoDiaXDaSemana(2);
    }else if(data.match(quartaPattern)){
        retorno = dataNoProximoDiaXDaSemana(3);
    }else if(data.match(quintaPattern)){
        retorno = dataNoProximoDiaXDaSemana(4);
    }else if(data.match(sextaPattern)){
        retorno = dataNoProximoDiaXDaSemana(5);
    }else if(data.match(diaDDPattern)){
        var x = parseInt(/\d?\d/.exec(data)[0]);
        var dataTemp = new Date();        
        if(dataAtual.getDate() > x ){
            dataTemp.setMonth(dataAtual.getMonth() + 1, x);
        }else{
            dataTemp.setDate(x);
        }
        retorno = dataTemp;
    }else if(data.match(diaDDMMPattern)){
        var dataTemp = new Date()
        var x = /\d?\d\/\d?\d/.exec(data);
        var dia = parseInt(x[0].split('/')[0]);
        var mes = parseInt(x[0].split('/')[1]);
        dataTemp.setMonth(mes - 1, dia);
        retorno = dataTemp;
    }
    
    return retorno;
    
}

function dataNoProximoDiaXDaSemana(diaDaSemana){
    
    var data = new Date()
    var diaDaSemanaAtual = data.getDay();
    if(diaDaSemanaAtual === diaDaSemana){        
        return data;
    }else if (diaDaSemana < diaDaSemanaAtual){        
        data.setDate(data.getDate() + diaDaSemana + 7 - diaDaSemanaAtual);
        return data;
    }else{
        data.setDate(data.getDate() + diaDaSemana - diaDaSemanaAtual);
        return data;
    }    

}

module.exports.tratarDatas = tratarDatas;