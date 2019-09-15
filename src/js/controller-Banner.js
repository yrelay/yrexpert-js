/*

!----------------------------------------------------------------------------!
!                                                                            !
! YRexpert : (Your Relay) Système Expert sous Mumps GT.M et GNU/Linux        !
! Copyright (C) 2001-2015 by Hamid LOUAKED (HL).                             !
!                                                                            !
!----------------------------------------------------------------------------!

*/

module.exports = function (controller, component) {
  component.onNewProps = function (newProps) {
    // console.log('Banner newProps: ' + JSON.stringify(newProps));
  }

  component.expanded = true
  component.qui = 'Choisir une partition'

  controller.on('getQui', function (responseObj) {
    if (responseObj.message.qui && responseObj.message.qui !== '') {
      component.qui = responseObj.message.qui
      component.setState({
        status: 'updated'
      })
    }
    // alert("qui: " + JSON.stringify(component.qui));
  })

  controller.send({
    type: 'getQui'
  })

  return controller
}
