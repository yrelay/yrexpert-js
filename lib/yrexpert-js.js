/*

!----------------------------------------------------------------------------!
!                                                                            !
! YRexpert : (Your Yrelay) Système Expert sous Mumps GT.M et GNU/Linux       !
! Copyright (C) 2001-2015 by Hamid LOUAKED (HL).                             !
!                                                                            !
!----------------------------------------------------------------------------!

*/

var build = require('./build');
var sessions = require('ewd-session');
var runRPC = require('yrexpert-rpc/lib/proto/runRPC');
var fs = require('fs');
var os = require('os');

/**
 * Module yrexpert-js.
 * @module lib/yrexpert-js
 */

/** Fonction yrexpert-js. */
module.exports = {

  /** Initialisation. */
  init: function() {
    var types = [
      'qoper8-stats',
      'qoper8-getStats',
      'getMasterProcessDetails',
      'getWorkerDetails',
      'getPoolSize'
    ];
    if (this.dontLog) this.dontLog(types);
  },

  /** Services autorisés. */
  servicesAllowed: {
    'ewd-react-tools': true
  },

  /** Gestionnaire d'évènemments. */
  handlers: {

    /**
     * Exécuter le RPC [RPCUSR ETABLIR CONNEXION].
     * @constructor
     * @param {object} messageObj - Message : [ac, vc].
     * @param {number} session - Session.
     * @param {string} send - Send.
     * @param {object} finished - Message de retour de la fonction.
     */
    loginRpc: function(messageObj, session, send, finished) {

      if (session.authenticated) {
        finished({error: 'Vous êtes déjà connectés à yrexpert-js'});
        return;
      }

      var accessCode = messageObj.params.ac;
      var verifyCode = messageObj.params.vc;
      //console.log("-----messageObj.params.ac: " + JSON.stringify(messageObj.params.ac));
      //console.log("-----messageObj.params.vc: " + JSON.stringify(messageObj.params.vc));

      if (accessCode === '') {
        finished({error: "Vous devez entrer un code d'accès"});
        return;
      }
      if (verifyCode === '') {
        finished({error: 'Vous devez saisir un code de validation'});
        return;
      }

      if (!this.db.symbolTable) this.db.symbolTable = sessions.symbolTable(this.db);

      var params = {
        rpcName: 'RPCUSR ETABLIR CONNEXION'
      };

      // N'enregistrez pas encore la table des symboles!
      var response = runRPC.call(this, params, session, false);
      //console.log("-----response: " + JSON.stringify(response));
  
      params = {
        rpcName: 'RPCUSR VERIFIER CODE',
        rpcArgs: [{
          type: 'LITERAL',
          value: accessCode + ';' + verifyCode
        }],
      };

      var response = runRPC.call(this, params, session, false);
      console.log('login response: ' + JSON.stringify(response));
      var values = response.value;
      var duz = values[0];
      var err = values[3]
      //console.log("-----err: " + JSON.stringify(err));
      if (duz.toString() === '0' && err !== '') {
        finished({error: err});
      }
      else {
        // Connecté avec succès
        // Enregistrer la table des symboles à la session ...
        ok = this.db.symbolTable.save(session);

        // Nettoyer le processus de back-end Cache / GT.M:
        ok = this.db.symbolTable.clear();

        // ** important ! Signaler l'utilisateur comme authentifié pour empêcher l'accès non autorisé aux RPC par un utilisateur avant de se connecter
        session.authenticated = true;

        // Réponse de retour
        var greeting = values[7];
        var pieces = greeting.split(' ');
        pieces = pieces.splice(2, pieces.length);
        var displayName = pieces.join(' ');

        var results = {
          displayName: displayName,
          greeting: greeting,
          lastSignon: values[8],
          messages: values.splice(8, values.length)
        };
        // Notez que nous ne renvoyons pas le DUZ!
        //finished(results);
        session.timeout = 20 * 60;
        session.authenticated = true;
        finished({ok: true});    
      }
    },

    /**
     * Exécuter le RPC [RPCBDD EXECUTER COMMANDE SET].
     * @constructor
     * @param {object} messageObj - Message : [qui, rep, ind, att, val, ice].
     * @param {number} session - Session.
     * @param {string} send - Send.
     * @param {object} finished - Message de retour de la fonction.
     */
    setRPCBDDC: function(messageObj, session, send, finished) {
/*
      var qui = messageObj.params.qui;
      var rep = messageObj.params.rep;
      var ind = messageObj.params.ind;
      var att = messageObj.params.att;
      var val = messageObj.params.val;
      var ice = messageObj.params.ice;
      //console.log("-----messageObj.params.ac: " + JSON.stringify(messageObj.params.qui));
      //console.log("-----messageObj.params.vc: " + JSON.stringify(messageObj.params.rep));

      if (qui === '') {
        finished({error: "Vous devez indiquer le nom d'une base de données (qui)"});
        return;
      }
      if (rep === '') {
        finished({error: "Vous devez indiquer le non d'un répertoire (rep)"});
        return;
      }
      if (ind === '') {
        finished({error: "Vous devez indiquer le nom d'un individu (ind)"});
        return;
      }
      if (att === '') {
        finished({error: "Vous devez indiquer le nom d'un attribut (att)"});
        return;
      }
      if (val === '') {
        finished({error: "Vous devez indiquer une valeur pour l'attribut (val)"});
        return;
      }
      if (ice === '') {
        finished({error: "Vous devez indiquer un indice pour l'attribut (ice)"});
        return;
      }

      if (!this.db.symbolTable) this.db.symbolTable = sessions.symbolTable(this.db);

      params = {
        rpcName: 'RPCBDD EXECUTER COMMANDE SET',
        rpcArgs: [
          {type: 'LITERAL', value: qui}, 
          {type: 'LITERAL', value: rep}, 
          {type: 'LITERAL', value: ind}, 
          {type: 'LITERAL', value: att}, 
          {type: 'LITERAL', value: val}, 
          {type: 'LITERAL', value: ice} 
        ],
      };

      var response = runRPC.call(this, params, session, false);
      console.log('login response: ' + JSON.stringify(response));
      var values = response.value;
      //console.log("-----err: " + JSON.stringify(err));
      if err !== '') {
        finished({error: err});
      }
      else {
        // Attribut mofifié avec succès
        // Enregistrer la table des symboles à la session ...
        ok = this.db.symbolTable.save(session);

        // Nettoyer le processus de back-end Cache / GT.M:
        ok = this.db.symbolTable.clear();

        // Réponse de retour
        var message = values[0];

        var results = {
          message: message
        };
        finished({ok: true});    
      }

*/
      finished({ok: true});    
    },

    /* ------------------------------- */
    rpc: function(messageObj, session, send, finished) {

      if (!this.db.symbolTable) this.db.symbolTable = sessions.symbolTable(this.db);

      var rpcName = messageObj.params.rpcName;
      if (rpcName === 'RPCUSR ETABLIR CONNEXION' || rpcName === 'RPCUSR VERIFIER CODE') {
        // Vous devez utiliser le gestionnaire de connexion pour ces RPC
        finished({error: rpcName + ' RPC ne peut pas être invoqué directement'});
        return;
      }
      var manageSymbolTable = false;      
      if (rpcName !== 'RPCUSR MESSAGE INTRO') {
        if (!session.authenticated) {
          finished({error: "Vous n'avez pas été authentifié sur yrexpert-js"});
          return;
        }
        manageSymbolTable = true;
      }

      var results = runRPC.call(this, messageObj.params, session, manageSymbolTable);

      if (manageSymbolTable) {
         // Nettoyer le processus de back-end Cache / GT.M :
         this.db.symbolTable.clearclear();
      }
      finished(results);
    },

    exemple: function(messageObj, session, send, finished) {

      var node = {
        global: 'irelay',
        subscripts: ['a'],
        data: 'hello world'
      };
      this.db.set(node);

      var func2 = this.db.function({function: 'ZGBLDIR^%GTM', arguments: ['DMO']});

      var dir = this.db.global_directory();
      finished(dir);
      //finished({ok: 'example executed!'});
    },

    /**
     * Se déplacer sur une partition.
     * @constructor
     * @param {object} messageObj - Message.
     * @param {number} session - Session.
     * @param {string} send - Send.
     * @param {object} finished - Message de retour de la fonction.
     */
    cdNameSpace: function(messageObj, session, send, finished) {
      var fn = {};
      var path = '/home/' + process.env['instance'] + '/partitions/' + messageObj.params.namespace.toLowerCase() + '/globals/';
      if (messageObj.params.namespace != '') {
        if (fs.existsSync(path + messageObj.params.namespace.toUpperCase() + '.gld')) {
          var fn = this.db.function({function: 'ZGBLDIR^%GTM', arguments: [messageObj.params.namespace.toUpperCase()]});
        }
      }
      finished(fn);    
    },

    /**
     * Obtenir la liste des noms des partitions installées.
     * @constructor
     * @param {object} messageObj - Message.
     * @param {number} session - Session.
     * @param {string} send - Send.
     * @param {object} finished - Liste des noms des partitions installées sous la forme ["DMO", "YXP"].
     */
    getNameSpace: function(messageObj, session, send, finished) {
      var path = '/home/' + process.env['instance'] + '/partitions/';
      fs.readdir(path, function(err, items) {
        if (err) {
          finished(err);
        }
        finished(items);
      });
    },

    getQui: function(messageObj, session, send, finished) {
      var node = {
        global: 'QUI',
        subscripts: []
      };
      var result = this.db.get(node);
      //console.log("-----getQui: " + JSON.stringify(result.data));
      finished({qui: result.data});
    },

    setQui: function(messageObj, session, send, finished) {
      if (messageObj.params.partition && messageObj.params.partition !== '') {
        var node = {
          global: 'QUI',
          subscripts: [],
          data: messageObj.params.partition
        };
        var result = this.db.set(node);
        //console.log("-----setQui: " + JSON.stringify(result.data));
        finished({ok: true});    
      }
      else {
        finished({error: 'Invalid partition'});
      }
    },
    /* A supprimer */
    login: function(messageObj, session, send, finished) {

      if (messageObj.params.password === this.userDefined.config.managementPassword) {
        session.timeout = 20 * 60;
        session.authenticated = true;
        finished({ok: true});    
      }
      else {
        finished({error: 'Invalid login attempt'});
      }
      return;
    },

    getServerName: function(messageObj, session, send, finished) {
      var serverName = '';
      if (this.userDefined.config && this.userDefined.config.serverName) serverName = this.userDefined.config.serverName;
      finished({serverName: serverName});
    },

    getBuildDetails: function(messageObj, session, send, finished) {
      var node = {
        global: 'INCONNE',
        subscripts: ['VERSION']
      };
      var rep = this.db.get(node);
      if (session.authenticated) {
        var buildDetails = {
          nodejsBuild: process.version,
          dbInterface: this.db.version(),
          qoper8Build: this.build,
          docStoreBuild: this.documentStore.build,
          xpressBuild: this.xpress.build,
          yrexpertmVersion: rep.data,
          yrexpertjsBuild: build
        };
        //console.log("-----buildDetails: " + JSON.stringify(buildDetails));
        if (this.userDefined.config && this.userDefined.config.qxBuild) buildDetails.qxBuild = this.userDefined.config.qxBuild;
        finished(buildDetails);
      }
      else {
        finished({error: 'Unauthenticated'});
      }
    },

    getMasterProcessDetails: function(messageObj, session, send, finished) {
      if (session.authenticated) {
        //var details = {};
        //if (this.userDefined.config && this.userDefined.config.masterProcessPid) details.pid = this.userDefined.config.masterProcessPid;
        //finished(details);
        finished({ok: true});
      }
      else {
        finished({error: 'Unauthenticated'});
      }
    },

    stopMasterProcess: function(messageObj, session, send, finished) {
      if (session.authenticated) {
        send({displayButton: true});
        finished({closeSocket: true});
      }
      else {
        finished({error: 'Unauthenticated'});
      }
    },

    getWorkerDetails: function(messageObj, session, send, finished) {
      if (session.authenticated) {
        finished({ok: true});
      }
      else {
        finished({error: 'Unauthenticated'});
      }
    },

    stopWorkerProcess: function(messageObj, session, send, finished) {
      finished({pid: messageObj.params.pid});
    },

    setPoolSize: function(messageObj, session, send, finished) {
      finished({poolSize: messageObj.params.poolSize});
    },

    getPoolSize: function(messageObj, session, send, finished) {
      finished({ok: true});
    },

    getGlobalDirectory: function(messageObj, session, send, finished) {
      var dir = this.db.global_directory();
      finished(dir);
    },

    getNextSubscripts: function(messageObj, session, send, finished) {
      var subscripts = messageObj.params.path.split('.');
      var global = subscripts.shift();
      var glo = new this.documentStore.DocumentNode(global, subscripts);
      var data = {};
      glo.forEachChild(function(name, node) {
        if (node.hasChildren) {
          data[name] = messageObj.params.expandText
	 }
	 else data[name] = node.value;
      });
      finished(data);
    },

    getSessions: function(messageObj, session, send, finished) {
      var activeSessions = this.sessions.active();
      var sessions = [];
      var disabled;
      activeSessions.forEach(function(ewdSession) {
        disabled = false;
        if (ewdSession.id.toString() === session.id.toString()) disabled = true;
        sessions.push({
          id: ewdSession.id,
          token: ewdSession.token,
          application: ewdSession.application,
          expiry: ewdSession.expiryTime,
          disabled: disabled
        });
      });
      finished(sessions);
    },

    stopSession: function(messageObj, session, send, finished) {
      var ewdSession = this.sessions.byToken(messageObj.params.token);
      if (ewdSession) ewdSession.delete();
      finished({ok: true});
    },

    showSession: function(messageObj, session, send, finished) {
      var token = messageObj.params.token;
      var ewdSession = this.sessions.byToken(token);
      if (ewdSession) {
        var data = {};
        var expandText = ' -->';
        ewdSession.data.forEachChild(function(name, childNode) {
          data[name] = expandText;
          if (childNode.hasValue) data[name] = childNode.value;
          if (name === 'ewd_symbolTable') data[name] = 'Mumps Symbol Table Data';
        });
        finished({
          token: token,
          id: ewdSession.id,
          data: data
        });
      }
      else {
        finished({
          token: token,
          error: 'Session no longer exists'
        });
      }
    },

    getSessionSubscripts: function(messageObj, session, send, finished) {
      var subs = messageObj.params.path.split('.');
      var token = messageObj.params.token;
      var ewdSession = this.sessions.byToken(token);
      if (ewdSession) {
        var documentName = ewdSession.documentName;
        var subscripts = ewdSession.data._node.subscripts.concat(subs);
        var doc = new this.documentStore.DocumentNode(documentName, subscripts);
        var data = {};
        doc.forEachChild(function(name, childNode) {
          data[name] = messageObj.params.expandText;
          if (childNode.hasValue) data[name] = childNode.value;
        });
        finished({
          data: data
        });
      }
      else {
        finished({error: 'Session no longer exists'});
      }
    }
  },



  workerResponseHandlers: {
    // Permettre l'interception par le processus maître d'augmenter/traiter la demande après l'authentification dans le worker
    getMasterProcessDetails: function(message) {
      var stats = this.getStats();
      return {
        pid: process.pid,
        startTime: new Date(this.startTime).toLocaleString(),
        upTime: stats.uptime,
        memory: stats.memory
      }
    },

    getWorkerDetails: function(message, send) {
      // use special handler function for getting stats for master and workers
      var that = this;
      this.handleStats(function(messageObj) {
        var resultObj = {
          type: 'getWorkerDetails',
          results: messageObj.worker
        };
        send(resultObj);
      });
      return;
    },

    stopMasterProcess: function(message) {

      if (message.displayButton) return message ;

      // delay slightly to allow response to be sent to browser
      var that = this;
      setTimeout(function() {
        that.stop();
      }, 2000);
      //return {disconnect: true, error: 'EWD AppRunner has been shut down'};
      return {ok: true};
    },

    stopWorkerProcess: function(message) {
      this.stopWorker(message.pid);
      return {pid: message.pid};
    },

    getPoolSize: function(message) {
      return {poolSize: this.worker.poolSize};
    },

    setPoolSize: function(message) {
      this.setWorkerPoolSize(message.poolSize);
      return {ok: true};
    }

  }

};
