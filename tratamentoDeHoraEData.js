function tratarDataEHora(data, horas) {
    var dataHoraInicial;
    var dataHoraFinal;
    if(horas.horaInicial){
        dataHoraInicial = new Date(data.getFullYear(), data.getMonth(), data.getDate());
        dataHoraInicial.setHours(parseInt(horas.horaInicial.split(':')[0]));
        dataHoraInicial.setMinutes(parseInt(horas.horaInicial.split(':')[1]));
    }else{
        dataHoraInicial = new Date(data.getFullYear(), data.getMonth(), data.getDate());
        dataHoraInicial.setHours(8);
        dataHoraInicial.setMinutes(0);
    }

    if(horas.horaFinal){
        dataHoraFinal = new Date(data.getFullYear(), data.getMonth(), data.getDate());
        dataHoraFinal.setHours(parseInt(horas.horaFinal.split(':')[0]))
        dataHoraFinal.setMinutes(parseInt(horas.horaFinal.split(':')[1]))
    }else{
        dataHoraFinal = new Date(data.getFullYear(), data.getMonth(), data.getDate());
        dataHoraFinal.setHours(18);
        dataHoraFinal.setMinutes(0);
    }

    console.log('dataHoraFinal', dataHoraFinal)
    console.log('dataHoraInicial', dataHoraInicial)

    return {dataHoraInicial: dataHoraInicial.toISOString(), dataHoraFinal: dataHoraFinal.toISOString()};
    
}

module.exports.tratarDataEHora = tratarDataEHora;