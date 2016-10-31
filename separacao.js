//var readline = require('readline')

var tratamentoHoras = require('./tratamentoDeHoras')
var tratamentoLocais = require('./tratamentoDeLocais')
var tratamentoData = require('./tratamentoDeDatas')
var tratamentoDataEHora = require('./tratamentoDeHoraEData')
var recuperaSalas = require('./localizacaoDeSalas')

function separar(frase) {    

    frase = frase.toUpperCase();

    var reservar;        
    var reservarPattern = /(RESERVAR)|(RESERVE)|(AGENDE)|(AGENDAR)/g
    var usuariosPattern = /(<@\S{9}>)/g
    var horasPattern = /(\d?\d:\d\d)+|(\d?\d DA (TARDE|MANHA|MANHÃ))|(MEIO DIA)|(MEIA NOITE)|(\d?\d HORAS)|(\d?\d\s)|(\d?\d\?)|(\d?\d$)|(ANTES DE)|(ANTES DAS)|(ANTES DA)|(ANTES DO)|(DEPOIS DE)|(DEPOIS DAS)|(DEPOIS DA)|(DEPOIS DO)|(ENTRE)/g
    var lugaresPattern = /(MARINGA)|(MARINGÁ)|(MGA)|(MGR)|(CAMPINAS)|(CPS)|(SAO PAULO)|(SÃO PAULO)|( SP )/g
    var diaPattern = /(HOJE)|(AMANHA)|(AMANHÃ)|(\d?\d\/\d?\d)|(DIA \d?\d\/\d?\d)|(DIA \d?\d)|(SEGUNDA)|(TERCA)|(TERÇA)|(QUARTA)|(QUINTA)|(SEXTA)/g
    var salasPattern = /(ITAPEMA)|(GUARATUBA)|(LEBLON)|(ITAMAMBUCA)|(CABOBRANCO)|(MANAIRA)|(COPACABANA)|(IPANEMA)|(MARESIAS)|(FORTE)|(TORRES)|(JOAQUINA)|(ITAPUA)|(JURERE)|(MARAGOGI)/g

    var frases = frase.split(" ");    
    var lugaresArray = new Array;
    var datasArray = new Array;
    var horasArray = new Array;
    var usuariosArray = new Array;

    var matchLugares = frase.match(lugaresPattern);
    if(matchLugares){
        for(var i = 0 ; i < matchLugares.length; i++){
            frase = frase.replace(matchLugares,"");
            lugaresArray.push(matchLugares[i])                        
        }
    }
    var matchDatas = frase.match(diaPattern);
    if(matchDatas){
        for(var i = 0 ; i < matchDatas.length; i++){
            frase = frase.replace(matchDatas,"");            
            datasArray.push(matchDatas[i]);
        }
    }    
    var matchHoras = frase.match(horasPattern);
    if(matchHoras){
        for(var i = 0 ; i < matchHoras.length; i++){
            frase = frase.replace(matchHoras,"");
            horasArray.push(matchHoras[i]);            
        }
    }

    var matchReservar = frase.match(reservarPattern);
    if(matchReservar){
        for(var i = 0 ; i < matchReservar.length; i++){
            frase = frase.replace(matchReservar,"");
            reservar = true;            
        }        
    }else{
        reservar = false;
    }

    var matchUsuarios = frase.match(usuariosPattern);
    if(matchUsuarios){
        for(var i = 0 ; i < matchUsuarios.length; i++){
            frase = frase.replace(matchUsuarios,"");
            usuariosArray.push(matchUsuarios[i]);            
        }
    }

    if(horasArray.length < 2){
        return null;
    }

    var horas = tratamentoHoras.tratarHoras(horasArray);
    var lugares = tratamentoLocais.tratarLocais(lugaresArray)
    var data = tratamentoData.tratarDatas(datasArray[0])
    var dataHora = tratamentoDataEHora.tratarDataEHora(data, horas);
    var salas = recuperaSalas.retornaSalasDoLocal(lugares.locais);

    
    return {reservar: reservar, dataHoraInicial: dataHora.dataHoraInicial, dataHoraFinal: dataHora.dataHoraFinal, salas: salas};
}

module.exports.separar = separar;

