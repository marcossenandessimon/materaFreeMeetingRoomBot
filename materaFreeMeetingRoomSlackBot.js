var SlackBot = require('slackbots')
var auth = require('./oauth')

var bot = new SlackBot({
    token: 'SLACK BOT TOKEN',
    name: 'myBot'
});

bot.on('start', function () {
    bot.on('message', function (data) {
        //console.log(data);
        if(data.type === 'message'){           
            // para que ele responda apenas quando for mencionado, é necessário colocar o @usuario, este valor pode ser adquirido pelo parametro data da função
            if(data.text.match(/^(?!\/.*)<@usuario> .*/)){
                auth.start(data.team, data.text).then(function (reply) {
                    bot.postMessage(data.channel, reply);
                    if(reply.substr(0,2) === 'Olá'){
                        bot.postMessage(data.channel, ':fiestaparrot:');
                    }
                })
                
            }
        }
    })
})