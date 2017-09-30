//var ewdGlobals = require('./node_modules/ewdjs/node_modules/globalsjs');
var interface = require('nodem');
require('gtm-config');
var db = new interface.Gtm();
console.log('db: ' + JSON.stringify(db));
var ok = db.open();
console.log('db.optn: ' + JSON.stringify(ok));
//ewdGlobals.init(db);

//var ewd = {
//  mumps: ewdGlobals
//};


// Confirmez la connexion avec ok
console.log('ok: ' + JSON.stringify(ok));
console.log(db.version());

var node = { 
 global: 'test', 
 subscripts: ['foo', 'bar'], 
 data: 'hello world'
};

db.set(node);

var result = db.get(node);
console.log(JSON.stringify(result));

db.close();


