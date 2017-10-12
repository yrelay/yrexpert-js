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
  component.token = [ '' ];

  controller.on('getToken', function(responseObj) {
    if (responseObj.message && responseObj.message !== '') {
      component.token = responseObj.message.token;
      component.setState({
        status: 'updated'
      });
    }
    //alert("-----token: " + JSON.stringify(component.token));
  });
  controller.send({
    type: 'getToken'
  });


  component.init = function(qui) {
    var message = {
      type: 'setRPCBDDC',
      params: {
        qui: qui,
        rep: '%',
        ind: component.token,
        att: 'NOM',
        val: component.token,
        ice: 1
      }
    };
    controller.send(message, function(responseObj) {
      //alert("message: " + JSON.stringify(message));
      //alert("responseObj: " + JSON.stringify(responseObj));
      type: 'setRPCBDDC'
    });
  };

  component.question = function(question) {
    var message = {
      type: 'setRPCBDDC',
      params: {
        qui: 'DMO',
        rep: '%',
        ind: component.token,
        att: 'QUESTION',
        val: question,
        ice: (new Date()).getTime()
      }
    };
    controller.send(message, function(responseObj) {
      //alert("message: " + JSON.stringify(message));
      //alert("responseObj: " + JSON.stringify(responseObj));
      type: 'setRPCBDDC'
    });

  };

  return controller;
};







