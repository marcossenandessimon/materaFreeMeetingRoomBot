var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var db = require('./db');
var q = require('q')
var listEvents = require('./listEvents')
var montarResposta = require('./montaResposta')

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/calendar-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'calendar-nodejs-quickstart.json';

// Load client secrets from a local file.
function start(id, frase) {
  var deferred = q.defer()
  fs.readFile('client_secret.json', function processClientSecrets(err, content) {
    if (err) {
      console.log('Error loading client secret file: ' + err);      
      return deferred.reject(err);
    }
    var credentials = JSON.parse(content);
    // Authorize a client with the loaded credentials, then call the
    // Google Calendar API.
    db.setClientId(id, credentials.installed.client_id).then(function (replyId) {
      db.setClientSecret(id, credentials.installed.client_secret).then(function (replySecret) {
        authorize(credentials,id , frase, listEvents.listEvents).then(function (reply) {
          if(reply !== null){
            if(reply.existeResposta === "sim"){
              deferred.resolve(montarResposta.montarResposta(reply.valores));      
            }else{
              deferred.resolve(reply.valores)
            }
          }else{
            deferred.resolve("desculpe, não entendi :( preciso que você me diga pelo menos uma faixa de horário e uma data")
          }
          
        })
      })
    })
  });  
    return deferred.promise
}


/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials,id, frase, callback) {
  var deferred = q.defer();
  var clientSecret = credentials.installed.client_secret;
  var clientId = credentials.installed.client_id;
  var redirectUrl = credentials.installed.redirect_uris[0];
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token.  
  db.getToken("token").then(function (reply) {
    if(reply === null){
      var x =("preciso de sua autorização para acessar suas agendas, por favor acesse esse link para fazer isso: " + oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES
      }));
      deferred.resolve({existeResposta: "nao", valores:x});
    }else{
      oauth2Client.credentials = JSON.parse(reply);
       callback(oauth2Client, id, frase).then(function (valores) {         
        //TODO
        //verificar se solicitou reserva.
        if(valores !== null){
          deferred.resolve({existeResposta:"sim", valores: valores});
        }else{
          deferred.resolve(null);
        }
                
       })
    }    
  })  
  return deferred.promise;
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client,id, callback) {
  var authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url: ', authUrl);
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', function(code) {
    rl.close();
    oauth2Client.getToken(code, function(err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      oauth2Client.credentials = token;
      storeToken(token, id);
      callback(oauth2Client);
    });
  });
}

function getNewTokenViaBot(id,tokenRecebido){ 
  var auth = new googleAuth(); 
  db.getClientId(id).then(function (replyId) {
    db.getClientSecret(id).then(function (replySecret) {
      var oauth2Client = new auth.OAuth2(replyId, replySecret, "urn:ietf:wg:oauth:2.0:oob");
      
      oauth2Client.getToken(tokenRecebido, function(err, token) {
        if (err) {
          console.log('Error while trying to retrieve access token', err);
          return;
        }
        oauth2Client.credentials = token;
        storeToken(token, id);
      });
    })
  })
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token, id) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err;
    }
  }
  db.createToken(JSON.stringify(token), "token");  
  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
  console.log('Token stored to ' + TOKEN_PATH);
}

function getHour(date){
  var d = new Date(date);
  var hour = d.getHours();
  var minutes = d.getMinutes();
  return {hour: hour, minutes:minutes};
     
}

function ISODateString(d){
 function pad(n){return n<10 ? '0'+n : n}
 return d.getUTCFullYear()+'-'
      + pad(d.getUTCMonth()+1)+'-'
      + pad(d.getUTCDate())+'T'
      + pad(d.getUTCHours())+':'
      + pad(d.getUTCMinutes())+':'
      + pad(d.getUTCSeconds())+'Z'}

module.exports.start = start
module.exports.getNewTokenViaBot = getNewTokenViaBot