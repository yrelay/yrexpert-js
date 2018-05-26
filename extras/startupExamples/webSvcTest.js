var client = require('ewdliteclient');

var args = {
 //host: 'ec2-54-211-177-232.compute-1.amazonaws.com',
 host: '127.0.0.1',
 port: 8080,
 ssl: true,
 appName: 'yrexpert-js',
 serviceName: 'authenticate',
 params: {
 accessId: 'yrexpert-jsClient',
 accessCode: 'fakedoc1',
 verifyCode: '1Doc!@#$'
 },
 secretKey: '$keepSecret!'
};


client.run(args, function(error, data) {
 if (error) {
 console.log('Une erreur est survenue : ' + JSON.stringify(error));
 }
 else {
 console.log('Données renvoyées par le service Web : ' + JSON.stringify(data));
 }
});

args.returnUrl = true;
var url = client.run(args);
console.log('url: ' + url);
