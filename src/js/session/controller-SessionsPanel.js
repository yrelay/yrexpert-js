/*

!----------------------------------------------------------------------------!
!                                                                            !
! Yexpert : (your) Système Expert sous Mumps GT.M et GNU/Linux               !
! Copyright (C) 2001-2015 by Hamid LOUAKED (HL).                             !
!                                                                            !
!----------------------------------------------------------------------------!

*/

module.exports = function (controller, component) {
  component.refresh = function () {
    var message = {
      type: 'getSessions'
    }
    controller.send(message, function (responseObj) {
      component.sessions = responseObj.message
      component.setState({ status: 'gotSessions' })
    })
  }

  controller.on('stopSession', function (responseObj) {
    component.refresh()
  })

  controller.on('refreshSessionDisplay', function () {
    component.sessionData = {}
    component.refresh()
  })

  controller.on('showSession', function (responseObj) {
    if (responseObj.message.error) {
      // the selected session no longer exists, so refresh the session table
      component.sessionData = {}
      component.refresh()
    } else {
      component.sessionData = responseObj.message
      component.setState({ status: 'showSession' })
    }
  })

  component.onNewProps = function (newProps) {
  }

  component.sessions = []
  component.sessionData = {}

  return controller
}
