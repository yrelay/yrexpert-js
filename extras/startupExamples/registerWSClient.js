var ewdGlobals = require('./node_modules/ewdjs/node_modules/globalsjs');
var interface = require('nodem');
 
var db = new interface.Gtm();
var ok = db.open();
ewdGlobals.init(db);

var ewd = {
  mumps: ewdGlobals
};

var zewd = new ewd.mumps.GlobalNode('%zewd', []);
zewd._setDocument({
  "EWDLiteServiceAccessId": {
    "yrexpert-jsClient": {
      "secretKey": "$keepSecret!",
      "apps": {
        "yrexpert-js": true,
        "yrexpert-jsRestServer": true
      }
    }
  }
});

db.close();





