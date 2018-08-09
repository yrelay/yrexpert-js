/*

!----------------------------------------------------------------------------!
!                                                                            !
! Yexpert : (your) Système Expert sous Mumps GT.M et GNU/Linux               !
! Copyright (C) 2001-2015 by Hamid LOUAKED (HL).                             !
!                                                                            !
!----------------------------------------------------------------------------!

*/

module.exports = function (controller, component) {

  component.workers = {};

  component.onNewProps = function(newProps) {
    //console.log('WorkerProcessDetailsTable newProps: ' + JSON.stringify(newProps));
  };

  controller.on('stopWorkerProcess', function(messageObj) {
    controller.send({type: 'getWorkerDetails'});
  });

  component.stopWorker = function(pid) {
    controller.send({
      type: 'stopWorkerProcess',
      params: {
        pid: pid
      }
    });
    controller.toastr('warning', 'Worker ' + pid + ' shut down');
  };

  component.poolSize = 1;

  controller.on('startTimers', function() {
    if (!controller.timers.poolSize) {
      controller.timers.poolSize = setInterval(function() {
        controller.send({type: 'getPoolSize'});
      },15000);
    }
    if (!controller.timers.workerDetails) {
      controller.timers.workerDetails = setInterval(function() {
        controller.send({type: 'getWorkerDetails'});
      },10000);
    }
  });

  controller.on('getPoolSize', function(messageObj) {
    component.poolSize = messageObj.message.poolSize;
    controller.emit('startTimers');
    component.setState({
      status: 'poolSizeAvailable'
    });
  });

  component.setPoolSize = function(poolSize) {
    controller.send({
      type: 'setPoolSize',
      params: {
        poolSize: poolSize
      }
    });
  };

  component.workerDetails = [];

  controller.on('getWorkerDetails', function(messageObj) {
    //console.log('getWorkerDetails: ' + JSON.stringify(messageObj));
    component.workerDetails = messageObj.results;
    controller.emit('startTimers');

    component.setState({
      status: 'dataAvailable'
    });
  });

  controller.send({type: 'getWorkerDetails'});
  controller.send({type: 'getPoolSize'});

  return controller;
};
