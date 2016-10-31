var TelegramBot = require('node-telegram-bot-api');
var db = require('./db');
var auth = require('./oauth')

var token = 'TELEGRAM TOKEN'

var bot = new TelegramBot(token, {polling: true});

bot.onText(/\/start/, function (msg) {

});

bot.onText(/^(?!\/.*)@materaFreeMeetingRoomsBot .*/, function (msg) {
    auth.start(msg.chat.id, msg.text).then(function (reply) {
        bot.sendMessage(msg.chat.id, reply);
    })
})

bot.onText(/\/autenticar/, function(msg){
    db.deleteToken(msg.chat.id);
})

bot.onText(/\/token (.+)/, function (msg) {
    var token = msg.text.slice(6).trim();
    console.log(token);
    auth.getNewTokenViaBot(msg.chat.id, token);
})