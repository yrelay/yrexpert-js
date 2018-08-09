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
    //console.log('WorkerProcessDetails newProps: ' + JSON.stringify(newProps));
  };

  component.stopWorker = function() {
    console.log('stop worker ' + component.props.pid);
    component.props.stopWorker(component.props.pid);
  };

  return controller;
};
