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
    component.hideContainer = (newProps.status !== 'robotandy');
  };

  // N'affichez pas le panneau RobotAndy lors du premier rendu après la connexion

  component.hideContainer = true;

  return controller;
};
