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
    component.hideContainer = (newProps.status !== 'sessions');
  };

  // don't display the session panel when first rendered after login

  component.hideContainer = true;

  return controller;
};
