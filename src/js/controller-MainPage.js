/*

!----------------------------------------------------------------------------!
!                                                                            !
! Yexpert : (your) Système Expert sous Mumps GT.M et GNU/Linux               !
! Copyright (C) 2001-2015 by Hamid LOUAKED (HL).                             !
!                                                                            !
!----------------------------------------------------------------------------!

*/

module.exports = function (controller, component) {

  controller.log = true;

  controller.toastr = function(type, text) {
    if (type && type !== '' && component.refs && component.refs.toastContainer && component.refs.toastContainer[type]) {
      component.refs.toastContainer[type](text);
    }
  };

  controller.displayError = function(error) {
    controller.toastr('error', error);
  };

  // Afficher les erreurs génériques Yexpert-JS en utilisant toastr :
  controller.on('error', function(messageObj) {
    var error = messageObj.message.error || messageObj.message;
    controller.displayError(error);
  });

  // Publier le gestionnaire de réponses de connexion dans ce
  // composant pour forcer le rendu de la page principale
  controller.on('loginRpc', function(messageObj) {
    if (!messageObj.message.error && messageObj.message.ok) {
      // connecté
      component.showLoginModal = false;
      component.setState({
        status: 'loggedIn'
      });
    }
  });

  controller.on('stopMasterProcess', function(messageObj) {
    console.log('Le processus principal a été arrêté');
  });

  controller.stopTimers = function() {
    for (var name in controller.timers) {
      clearInterval(controller.timers[name]);
    }
    delete controller.timers;
  };

  controller.on('socketDisconnected', function() {
    controller.toastr('warning', 'Back-end Yexpert-JS a été arrêté');
    controller.emit('logout');
    controller.stopTimers();
  });

  controller.on('robotandy', function() {component.setState({status: 'robotandy'});});
  controller.on('defutilisateur', function() {component.setState({status: 'defutilisateur'});});
  controller.on('nouvpartition', function() {component.setState({status: 'nouvpartition'});});

  controller.on('allerpartition', function() {component.setState({status: 'allerpartition'});});

  controller.on('bienvenue', function() {component.setState({status: 'bienvenue'});});
  controller.on('apropos', function() {component.setState({status: 'apropos'});});









  controller.on('logout', function() {
    // Arrêter tous les minuteries
    controller.stopTimers();
    // Affichage du commutateur pour se déconnecter / arrêter
    controller.disconnectSocket();
    component.setState({
      status: 'shutdown'
    });
  });

  controller.on('terminal', function() {
	  component.setState({
        status: 'terminal'
      });
  });

  controller.on('overview', function() {
	  component.setState({
        status: 'overview'
      });
  });

  controller.on('docstore', function() {
	  component.setState({
        status: 'docstore'
      });
  });

  controller.on('sessions', function() {
    component.setState({
      status: 'sessions'
    });
  });

  controller.on('ewd-reregistered', function() {
    console.log('Réenregistré - redémarrer les minuteries');
    // Back-end est de retour - redémarrez tout
    controller.timers = {};
    controller.emit('startTimers');
    controller.toastr('warning', 'Le back-end Yexpert-JS a été redémarré');
  });

  controller.navOptionSelected = function(eventKey) {
    controller.emit(eventKey);
  };

  controller.timers = {};

  component.showLoginModal = true;

  return controller;
};



