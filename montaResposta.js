function montarResposta(objetoResposta) {
    var resposta = "";    
    var temHorarios = false;
    var respostaTemp = "";

    objetoResposta.forEach(function (objeto) {
        var sala = objeto.sala.split('@')[0].split('.')[1];
        if( objeto.horarios.length !== 0){
            temHorarios = true;
            respostaTemp = respostaTemp.concat("sala " + sala + "\n" )            
            objeto.horarios.forEach(function (horarios) {
                var dataInicial = new Date(horarios.inicial)
                var dataFinal = new Date(horarios.final)
                var horaInicial = dataInicial.getHours();
                var minutoInicial = dataInicial.getMinutes() === 0 ? "00" : dataInicial.getMinutes() ;
                var horaFinal = dataFinal.getHours();
                var minutoFinal = dataFinal.getMinutes() === 0 ? "00" : dataFinal.getMinutes();
                respostaTemp = respostaTemp.concat("-> das " + horaInicial + ":" + minutoInicial + " até as " + horaFinal + ":" + minutoFinal + "\n");
            })
            respostaTemp = respostaTemp.concat("========= \n")            
        }        
    })

    if( temHorarios === false){
        resposta = "Desculpe, parece que não há salas disponíveis no local e horário que você solicitou :("
    }else{
        resposta = "Olá! encontrei as seguintes salas dísponíveis no horário que você solicitou \n \n"
        resposta = resposta.concat(respostaTemp);
    }

    return resposta;

}

/**
 * Olá. encontrei as seguintes salas disposníveis no horário que vc solicitou.
 * ============
 * sala x:
 * -> livre das xx:xx até xx:xx
 * ou 
 * -> livre das yy:yy até yy:yy
 * ============
 * sala y:
 * -> livre das xx:xx até xx:xx 
 */

module.exports.montarResposta = montarResposta;