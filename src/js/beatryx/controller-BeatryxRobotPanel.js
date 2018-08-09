/*

!----------------------------------------------------------------------------!
!                                                                            !
! Yexpert : (your) Système Expert sous Mumps GT.M et GNU/Linux               !
! Copyright (C) 2001-2015 by Hamid LOUAKED (HL).                             !
!                                                                            !
!----------------------------------------------------------------------------!

*/

module.exports = function (controller, component) {

  component.refresh = function() {
    var message = {
      type: 'getBeatryxRobot'
    };
    controller.send(message, function(responseObj) {
      //alert("message: " + JSON.stringify(message));
      component.beatryxRobot = responseObj.message;
      component.setState({status: 'gotBeatryxRobot'});
    });
  };

  controller.on('stopBeatryx', function(responseObj) {
    component.refresh();
  });

  controller.on('refreshBeatryxDisplay', function() {
    component.beatryxData = {};
    component.refresh();
  });

  controller.on('showBeatryx', function(responseObj) {

    if (responseObj.message.error) {
      // the selected beatryx no longer exists, so refresh the beatryx table
      component.beatryxData = {};
      component.refresh();
    }
    else {
      component.beatryxData = responseObj.message;
      component.setState({status: 'showBeatryx'});
    }
  });

  component.onNewProps = function(newProps) {
  };

  component.beatryxRobot = [];
  component.beatryxData = {};

  return controller;
};
