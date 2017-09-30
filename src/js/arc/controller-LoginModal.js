/*

!----------------------------------------------------------------------------!
!                                                                            !
! Yexpert : (your) Système Expert sous Mumps GT.M et GNU/Linux               !
! Copyright (C) 2001-2015 by Hamid LOUAKED (HL).                             !
!                                                                            !
!----------------------------------------------------------------------------!

*/

module.exports = function (controller, component) {

  component.password = '';

  controller.LoginModal = {
    onLoginFieldChange: function(inputObj) {
      //console.log('onFieldChange - ' + inputObj.ref + '; ' + inputObj.value);
      component[inputObj.ref] = inputObj.value;
    }
  };

  component.handleKeyDown = function(e) {
    // enter key pressed
    if (e.charCode === 13) {
      component.handleLogin();
    }
  };

  component.handleLogin = function() {

    if (component.password === '') {
      controller.displayError("Vous devez entrer le mot de passe d'administration");
      return;
    }

    // send login message
    //   response handler subscription is in parent component (MainPage)

    controller.send({
      type: 'login',
      params: {
        password: component.password
      }
    });
  };

  return controller;
};




