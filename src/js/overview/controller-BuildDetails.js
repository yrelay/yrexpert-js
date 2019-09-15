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
    // console.log('BuildDetails newProps: ' + JSON.stringify(newProps));
  }

  controller.on('getBuildDetails', function (messageObj) {
    var data = messageObj.message
    component.nodejsBuild = data.nodejsBuild
    var dbArr = data.dbInterface.split(';')
    component.dbInterface = dbArr[0]
    component.db = dbArr[1]
    component.qoper8Build = data.qoper8Build.no
    component.docStoreBuild = data.docStoreBuild.no
    component.qxBuild = data.qxBuild
    component.xpressBuild = data.xpressBuild.no
    component.yrexpertmVersion = data.yrexpertmVersion
    component.yrexpertjsBuild = data.yrexpertjsBuild.no
    component.setState({
      status: 'dataAvailable'
    })
  })

  component.nodejsBuild = ''
  component.dbInterface = ''
  component.db = ''
  component.qoper8Build = ''
  component.docStoreBuild = ''
  component.qxBuild = ''
  component.appRunnerBuild = ''

  controller.send({
    type: 'getBuildDetails'
  })

  return controller
}
