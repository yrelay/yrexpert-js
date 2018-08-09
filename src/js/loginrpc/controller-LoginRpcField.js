/*

!----------------------------------------------------------------------------!
!                                                                            !
! Yexpert : (your) Système Expert sous Mumps GT.M et GNU/Linux               !
! Copyright (C) 2001-2015 by Hamid LOUAKED (HL).                             !
!                                                                            !
!----------------------------------------------------------------------------!

*/

module.exports = function (controller, component) {

  // *** Ac = Code d'accès ***
  component.handleChangeAc = function(e) {

    // Mise à jour de l'affichage du champ Ac dans le composant d'entrée
    var fieldNameAc = component.props.fieldnameAc;
    var valueAc = e.target.value;
    //alert("component.props.fieldname: " + JSON.stringify(component.props.fieldnameAc));
    //alert("e.target.value: " + JSON.stringify(e.target.value));

    component.setState({
      valueAc: e.target.value
    });

    // Puis passer au composant parent LoginRpcModal
    controller.LoginRpcModal.onLoginFieldChange({
      value: e.target.value,
      ref: fieldNameAc,
    });
  };

  // *** Vc = Code de vérification ***
  component.handleChangeVc = function(e) {

    // Mise à jour de l'affichage du champ Vc dans le composant d'entrée
    var fieldNameVc = component.props.fieldnameVc;
    var valueVc = e.target.value;

    component.setState({
      valueVc: e.target.value
    });

    // Puis passer au composant parent LoginRpcModal
    controller.LoginRpcModal.onLoginFieldChange({
      value: e.target.value,
      ref: fieldNameVc
    });
  };


  component.validationState = function() {
    if (component.state.value.length === 0) return 'error';
  };

  return controller;
};




