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
  component.token = '';
  component.indice = (new Date()).getTime();
  component.nameSpace = [];
  //alert("-----component.indice: " + JSON.stringify(component.indice));

  controller.on('getNameSpace', function(responseObj) {
    if (responseObj.message && responseObj.message !== '') {
      component.nameSpace = responseObj.message;
      component.setState({
        status: 'updated'
      });
    }
    //alert("partition: " + JSON.stringify(component.nameSpace));
  });
  controller.send({
    type: 'getNameSpace'
  });

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

  component.ajouter_nom = function(partition) {
    var message = {
      type: 'setRPCBDDC',
      params: {
        qui: partition,
        rep: 'INTERFACE',
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

  component.ajouter_cree_par = function(partition) {
    var message = {
      type: 'setRPCBDDC',
      params: {
        qui: partition,
        rep: 'INTERFACE',
        ind: component.token,
        att: 'CREE.PAR',
        val: 'Andy',
        ice: 1
      }
    };
    controller.send(message, function(responseObj) {
      //alert("message: " + JSON.stringify(message));
      //alert("responseObj: " + JSON.stringify(responseObj));
      type: 'setRPCBDDC'
    });
  };

  component.question = function(partition, question) {
    var message = {
      type: 'setRPCBDDC',
      params: {
        qui: partition,
        rep: 'INTERFACE',
        ind: component.token,
        att: 'QUESTION',
        val: 'question',
        ice: component.indice
      }
    };
    controller.send(message, function(responseObj) {
      //alert("message: " + JSON.stringify(message));
      //alert("responseObj: " + JSON.stringify(responseObj));
      type: 'setRPCBDDC'
    });

  };

  component.reponse = function(partition) {
    var message = {
      type: 'readRPCBDDC',
      params: {
        qui: partition,
        rep: 'INTERFACE',
        ind: component.token,
        att: 'REPONSE',
        ice: component.indice
      }
    };
    controller.send(message, function(responseObj) {
      alert("message: " + JSON.stringify(message));
      alert("responseObj: " + JSON.stringify(responseObj));
      if (responseObj.message && responseObj.message !== '') {
        component.reponse = responseObj.message.value;
        component.setState({
          status: 'updated'
        });
      }
      type: 'readRPCBDDC'
    });

  };

  return controller;
};







