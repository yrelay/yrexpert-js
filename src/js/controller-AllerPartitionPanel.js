/*

!----------------------------------------------------------------------------!
!                                                                            !
! YRexpert : (Your Relay) Système Expert sous Mumps GT.M et GNU/Linux        !
! Copyright (C) 2001-2015 by Hamid LOUAKED (HL).                             !
!                                                                            !
!----------------------------------------------------------------------------!

*/

module.exports = function (controller, component) {

  component.onNewProps = function(newProps) {
    //console.log('----- newProps: ' + JSON.stringify(newProps));
  };

  component.expanded = true;
  component.partition = [ '' ];

  controller.on('getNameSpace', function(responseObj) {
    if (responseObj.message && responseObj.message !== '') {
      component.partition = responseObj.message;
      component.setState({
        status: 'updated'
      });
    }
    //alert("partition: " + JSON.stringify(component.partition));
  });

  controller.send({
    type: 'getNameSpace'
  });

  component.choix = function(partition) {
    var message = {
      type: 'setQui',
      params: {
        partition: partition
      }
    };
    controller.send(message, function(responseObj) {
    //alert("responseObj: " + JSON.stringify(responseObj));
      type: 'setQui'
    });
  };

  return controller;
};







