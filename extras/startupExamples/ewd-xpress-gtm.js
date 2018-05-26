/*

!----------------------------------------------------------------------------!
!                                                                            !
! YRexpert : (Your Yrelay) Système Expert sous Mumps GT.M et GNU/Linux       !
! Copyright (C) 2001-2015 by Hamid LOUAKED (HL).                             !
!                                                                            !
!----------------------------------------------------------------------------!

*/


var config = {};
if (process.argv[2]) config = require(process.argv[2]);

var config = {
  managementPassword: 'keepThisSecret!',
  ssl: false,
  serverName: 'Nouveau serveur EWD',
  port: 8080,
  poolSize: 1,
  database: {
    type: 'gtm'
  }
};

var ewdXpress = require('ewd-xpress').master;

/*
  //Optional - add custom Express middleware, eg:

  // first load the intercept

  var xp = ewdXpress.intercept();

  // now you can add your own custom routes..:

  xp.app.get('/testx', function(req, res) {
    console.log('*** /testx query: ' + JSON.stringify(req.query));
    res.send({
      hello: 'world',
      query: JSON.stringify(req.query)
    });
    // or use ewd-qoper8-express handler
    //xp.qx.handleMessage(req, res);
  });

  // or, even simpler, using ewd-qoper8-express router:

  xp.app.use('/test', xp.qx.router());

  // router + custom response handling:

  xp.app.use('/report', xp.qx.router({ nextCallback: true }), function(req, res) {
    var message = res.locals.message;
    res.set('Content-Type', 'application/xml');
    if (message.error) {
      res.send(js2xmlparser('error', message));
    }
    else {
      res.send(js2xmlparser(message.json.root || 'xmlRoot', message.json.data || {}));
    }
  });

*/

/*
  Optiional - add custom Express middleware, eg:

  var xp = ewdXpress.intercept();


  xp.app.get('/testx', function(req, res) {
    console.log('*** /testx query: ' + JSON.stringify(req.query));
    res.send({
      hello: 'world',
      query: JSON.stringify(req.query)
    });
    // or use ewd-qoper8-express handler
    //xp.qx.handleMessage(req, res);
  });
*/


ewdXpress.start(config);

