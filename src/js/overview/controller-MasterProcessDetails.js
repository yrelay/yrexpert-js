/*

!----------------------------------------------------------------------------!
!                                                                            !
! Yexpert : (your) Système Expert sous Mumps GT.M et GNU/Linux               !
! Copyright (C) 2001-2015 by Hamid LOUAKED (HL).                             !
!                                                                            !
!----------------------------------------------------------------------------!

*/

module.exports = function (controller, component) {
  component.onNewProps = function (newProps) {
    // console.log('MasterProcessDetails newProps: ' + JSON.stringify(newProps));
  }

  component.stopMasterProcess = function () {
    controller.send({ type: 'stopMasterProcess' })
  }

  component.pid = ''
  component.started = ''
  component.upTime = ''
  component.master = {
    memory: {
      rss: 'Not available',
      heapTotal: 'Not available',
      heapUsed: 'Not available'
    }
  }

  controller.on('startTimers', function () {
    if (!controller.timers.masterProcess) {
      controller.timers.masterProcess = setInterval(function () {
        controller.send({ type: 'getMasterProcessDetails' })
      }, 30000)
    }
  })

  controller.on('getMasterProcessDetails', function (messageObj) {
    component.pid = messageObj.message.pid
    component.started = messageObj.message.startTime
    component.upTime = messageObj.message.upTime
    component.master.memory = messageObj.message.memory

    controller.emit('startTimers')

    if (!controller.timers.masterProcess) {
      controller.timers.masterProcess = setInterval(function () {
        controller.send({ type: 'getMasterProcessDetails' })
      }, 30000)
    }

    component.setState({
      status: 'dataAvailable'
    })
  })

  controller.send({ type: 'getMasterProcessDetails' })

  return controller
}
