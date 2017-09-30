/*

!----------------------------------------------------------------------------!
!                                                                            !
! Yexpert : (your) Système Expert sous Mumps GT.M et GNU/Linux               !
! Copyright (C) 2001-2015 by Hamid LOUAKED (HL).                             !
!                                                                            !
!----------------------------------------------------------------------------!

*/

module.exports = function (controller, component) {

  component.handleChange = function(e) {
    // Mise à jour de l'affichage du champ dans le composant d'entrée :

    var fieldName = component.props.fieldname;
    var value = e.target.value;

    component.setState({
      value: value
    });

    // Puis passer au composant parent LoginModal :

    controller.LoginModal.onLoginFieldChange({
      value: value,
      ref: fieldName
    });
  };

  component.validationState = function() {
    if (component.state.value.length === 0) return 'error';
  };

  return controller;
};




