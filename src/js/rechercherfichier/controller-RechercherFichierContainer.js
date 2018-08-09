/*

!----------------------------------------------------------------------------!
!                                                                            !
! Yexpert : (your) Système Expert sous Mumps GT.M et GNU/Linux               !
! Copyright (C) 2001-2015 by Hamid LOUAKED (HL).                             !
!                                                                            !
!----------------------------------------------------------------------------!

*/

module.exports = function (controller, component) {

  component.onNewProps = function(newProps) {
    component.hideContainer = (newProps.status !== 'rechercherfichier');
  };

  // n'affiche pas ce panneau lorsqu'il est rendu pour la première fois après la connexion
  component.hideContainer = true;

  return controller;
};
