function tratarHoras(horasArray) {
    var horaInicial;
    var horaFinal;
    var hora1 = 0;
    var hora2 = 0;
    var patternHoraCompleta = /\d?\d:\d\d/;
    var patternHoraPeriodoManhã = /\d?\d DA (MANHA|MANHÃ)/;    
    var patternHoraPeriodoTardeNoite = /\d?\d DA (TARDE|NOITE)/;
    var patternMeioDia = /MEIO DIA/;
    var patternMeiaNoite = /MEIA NOITE/;
    var patternXX = /\d?\d/;
    var patternAntes = /ANTES/
    var patternDepois = /DEPOIS/
    var pattenEntre = /ENTRE/
    var antes = false;
    var depois = false;    
    for(var x = 0; x < horasArray.length;x++){
        var current = horasArray[x];

        if(current.match(patternHoraCompleta)){
            //achou hora completa, ver a menor e maior e retornar.
            hora1 === 0  ? hora1 = current : hora2 = current;

        }else if(current.match(patternHoraPeriodoManhã)){
            hora1 === 0 ? hora1 = current.slice(0,2).trim() + ":00" : hora2 = current.slice(0,2).trim() + ":00";

        }else if(current.match(patternHoraPeriodoTardeNoite)){
            hora1 === 0 ? hora1 = parseInt(current.slice(0,2).trim()) + 12 + ":00" : hora2 = parseInt(current.slice(0,2).trim()) + 12 + ":00";

        }else if(current.match(patternMeioDia)){
            hora1 === 0 ? hora1 = "12:00" : hora2 = "12:00";

        }else if(current.match(patternMeiaNoite)){
            hora1 === 0 ? hora1 = "00:00" : hora2 = "00:00";

        }else if(current.match(patternXX)){
            var horaTemp = parseInt(patternXX.exec(current)[0]);
            if(horaTemp < 6){
                horaTemp = horaTemp + 12;
            }
            hora1 === 0 ? hora1 = horaTemp+":00" : hora2 = horaTemp+":00";
        }

        if(horasArray[x].match(patternAntes)){
            antes = true;
            horaInicial = null;
        }else if(current.match(patternDepois)){
            depois = true;
            horaFinal = null;
        }
    }
    if (antes === false && depois === false){
        if(parseInt(hora1.split(":")[0]) > parseInt(hora2.split(":")[0])){
            horaInicial = hora2;
            horaFinal = hora1;                
        }else if(parseInt(hora1.split(":")[0]) === parseInt(hora2.split(":")[0])){
            if(parseInt(hora1.split(":")[1]) > parseInt(hora2.split(":")[1])){
                horaInicial = hora2;
                horaFinal = hora1;  
            }else{
                horaInicial = hora1;
                horaFinal = hora2;  
            }
        }else{
            horaInicial = hora1;
            horaFinal = hora2;
        }
    }else if (antes === true && depois === false){
        horaFinal = hora1;        
    }else if (antes === false && depois === true){
        horaInicial = hora1;
    }
    
    var retorno = { horaInicial: horaInicial, horaFinal: horaFinal};

    return retorno;
}



module.exports.tratarHoras = tratarHoras;