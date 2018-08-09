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
  };

  component.stopBeatryx = function() {
    var message = {
      type: 'stopBeatryx',
      params: {
        token: component.props.token
      }
    };
    controller.send(message);
  };

  component.showBeatryx = function() {
    var message = {
      type: 'showBeatryx',
      params: {
        token: component.props.token
      }
    };
    controller.send(message);
  };

  return controller;
};
