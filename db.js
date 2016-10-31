var redis = require('redis');
var q = require ('q');

client = redis.createClient();
client.on("error", function(err){
    console.log("Error" + err);
})

function createToken(token, id) {
    client.hset(id + "Calendario", "token", token, redis.print);
}

function getToken(id){
    var deferred = q.defer()
    client.hget(id + "Calendario","token", function (err,reply) {
        if(err){
            return deferred.reject(err);        
        }
        deferred.resolve(reply);
    });
    return deferred.promise
}
function deleteToken(id){    
    client.hdel(id + "Calendario","token")
}

function setClientId(id, clientId){
    var deferred = q.defer()
    client.hset(id + "Calendario", "clientId", clientId, function (err,reply) {
        if(err){
            return deferred.reject(err);            
        }
        deferred.resolve(reply);
    })
    return deferred.promise
}

function getClientId(id){
    var deferred = q.defer()
    client.hget(id + "Calendario", "clientId", function (err, reply) {
        if(err){
            return deferred.reject(err)
        }
        deferred.resolve(reply)        
    })
    return deferred.promise
}

function setClientSecret(id, clientSecret){
    var deferred = q.defer()
    client.hset(id + "Calendario", "clientSecret", clientSecret, function (err,reply) {
        if(err){
            return deferred.reject(err);            
        }
        deferred.resolve(reply);
    })
    return deferred.promise
}

function getClientSecret(id){
    var deferred = q.defer()
    client.hget(id + "Calendario", "clientSecret", function (err, reply) {
        if(err){
            return deferred.reject(err)
        }
        deferred.resolve(reply)        
    })
    return deferred.promise
}

module.exports.createToken = createToken;
module.exports.getToken = getToken;
module.exports.deleteToken = deleteToken;
module.exports.setClientId = setClientId;
module.exports.getClientId = getClientId;
module.exports.setClientSecret = setClientSecret;
module.exports.getClientSecret = getClientSecret;