var google = require('googleapis');
var googleAuth = require('google-auth-library');
var db = require('./db');
var q = require('q');
var separacao = require('./separacao')
var calculaLivres = require('./calculaLivres')

function listEvents(auth, id, frase) {
    var valores = separacao.separar(frase);
    if(valores === null){
        var nulo = q.defer();
        nulo.resolve(null);
        return nulo.promise;
    } 
    var resposta = [];   

    function transformaSalaEmPromessa(sala) {
    var deferred = q.defer();
       var calendar = google.calendar('v3');
        calendar.events.list({
            auth: auth,
            calendarId: sala,
            timeMin: valores.dataHoraInicial,
            timeMax: valores.dataHoraFinal,
            maxResults: 10,
            singleEvents: true,
            orderBy: 'startTime'
        }, function(err, response) {
            var iniciais = [];
            var finais = [];
            var livres;
            if (err) {
                console.log('The API returned an error: ' + err + sala);
                return;
            }
            var events = response.items;
            if (events.length == 0) {
                deferred.resolve({sala: sala, horarios: [{inicial: valores.dataHoraInicial, final: valores.dataHoraFinal}]})
            } else {
                db.getToken(id).then(function (reply) {
                    for (var i = 0; i < events.length; i++) {
                        var event = events[i];
                        var start = event.start.dateTime || event.start.date;
                        var end = event.end.dateTime || event.end.date;
                        iniciais.push(new Date(start).toISOString());
                        finais.push(new Date(end).toISOString());

                    }
                    deferred.resolve({sala: sala, horarios: calculaLivres.calculaLivres(iniciais, finais, valores.dataHoraInicial, valores.dataHoraFinal, sala)});
                })      
            }
        }); 

        return deferred.promise
    }
    if(valores.reservar === false){
        return q.all(valores.salas.map(transformaSalaEmPromessa));
    }else{
        var nulo = q.defer();
        nulo.resolve(null);
        return nulo.promise;
    }
}



function getHour(date){
  var d = new Date(date);
  var hour = d.getHours();
  var minutes = d.getMinutes();
  return {hour: hour, minutes:minutes};
     
}

module.exports.listEvents = listEvents;