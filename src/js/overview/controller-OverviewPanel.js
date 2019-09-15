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
    // console.log('OverviewPanel newProps: ' + JSON.stringify(newProps));
  }

  component.expanded = true
  component.serverName = 'ewd-xpress'

  controller.on('getServerName', function (responseObj) {
    if (responseObj.message.serverName && responseObj.message.serverName !== '') {
      component.serverName = responseObj.message.serverName
      component.setState({
        status: 'updated'
      })
    }
  })

  controller.send({
    type: 'getServerName'
  })

  return controller
}
