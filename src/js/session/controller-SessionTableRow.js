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
  }

  component.stopSession = function () {
    var message = {
      type: 'stopSession',
      params: {
        token: component.props.token
      }
    }
    controller.send(message)
  }

  component.showSession = function () {
    var message = {
      type: 'showSession',
      params: {
        token: component.props.token
      }
    }
    controller.send(message)
  }

  return controller
}
