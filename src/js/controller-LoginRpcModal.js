/*

!----------------------------------------------------------------------------!
!                                                                            !
! Yexpert : (your) Système Expert sous Mumps GT.M et GNU/Linux               !
! Copyright (C) 2001-2015 by Hamid LOUAKED (HL).                             !
!                                                                            !
!----------------------------------------------------------------------------!

*/

module.exports = function (controller, component) {

  component.ac = '';
  component.vc = '';

  controller.LoginRpcModal = {
    onLoginFieldChange: function(inputObj) {
      //console.log('onFieldChange - ' + inputObj.ref + '; ' + inputObj.value);
      component[inputObj.ref] = inputObj.value;
    }
  };

  component.handleKeyDown = function(e) {
    // Touche entrée pressée
    if (e.charCode === 13) {
      component.handleLogin();
    }
  };

  component.handleLogin = function() {

    //alert("component.ac: " + JSON.stringify(component.ac));
    //alert("component.vc: " + JSON.stringify(component.vc));

    if (component.ac === '') {
      controller.displayError("Vous devez entrer votre code d'accès");
      return;
    }

    if (component.vc === '') {
      controller.displayError('Vous devez entrer votre code de vérification');
      return;
    }

    // envoyer un message de connexion
    // l'abonné du gestionnaire de réponses est dans le composant parent (MainPage)
    controller.send({
      type: 'loginRpc',
      params: {
        ac: component.ac,
        vc: component.vc
      }
    });
  };

  return controller;
};




