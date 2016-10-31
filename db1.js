var redis = require('redis');
var q = require ('q');

client = redis.createClient();
client.on("error", function(err){
    console.log("Error" + err);
})

function salvarUsuario(id, email) {
    var deferred = q.defer();
    client.hset(id , "email", email, function (err, reply) {
        if(err){
            return deferred.reject(err);
        }
        deferred.resolve(reply);        
    });
    return deferred.promise;
}

function recuperarEmail(id){
    var deferred = q.defer();
    client.hget(id, function (err, reply) {
        if(err){
            return deferred.reject(err);
        }
        deferred.resolve(reply);
    });
    return deferred.promise;
}



