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
    // console.log('----- newProps: ' + JSON.stringify(newProps));
  }

  component.expanded = true
  component.token = ''
  // component.indice = (new Date()).getTime();
  component.nameSpace = []
  // alert("-----component.indice: " + JSON.stringify(component.indice));

  function getDateTime () {
    var date = new Date()
    var hour = date.getHours()
    hour = (hour < 10 ? '0' : '') + hour
    var min = date.getMinutes()
    min = (min < 10 ? '0' : '') + min
    var sec = date.getSeconds()
    sec = (sec < 10 ? '0' : '') + sec
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    month = (month < 10 ? '0' : '') + month
    var day = date.getDate()
    day = (day < 10 ? '0' : '') + day
    // return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;
    return day + '/' + month + '/' + year + ' ' + hour + ':' + min + ':' + sec
  }

  component.refresh = function () {
    var message = {
      type: 'getGlobalDirectory'
    }
    controller.send(message, function (responseObj) {
      // console.log('----- responseObj : ', responseObj);
      component.data = {}
      responseObj.message.forEach(function (name) {
        component.data[name] = expandText
      })
      component.setState({ status: 'globalDirectory' })
    })
  }

  controller.on('getNameSpace', function (responseObj) {
    if (responseObj.message && responseObj.message !== '') {
      component.nameSpace = responseObj.message
      component.setState({
        status: 'updated'
      })
    }
    // alert("partition: " + JSON.stringify(component.nameSpace));
  })
  controller.send({
    type: 'getNameSpace'
  })

  controller.on('getToken', function (responseObj) {
    if (responseObj.message && responseObj.message !== '') {
      component.token = responseObj.message.token
      component.setState({
        status: 'updated'
      })
    }
    // alert("-----token: " + JSON.stringify(component.token));
  })
  controller.send({
    type: 'getToken'
  })

  component.ajouter_nom = function (partition) {
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
    }
    controller.send(message, function (responseObj) {
      // alert("message: " + JSON.stringify(message));
      // alert("responseObj: " + JSON.stringify(responseObj));
      type: 'setRPCBDDC'
    })
  }

  component.ajouter_cree_par = function (partition) {
    var message = {
      type: 'setRPCBDDC',
      params: {
        qui: partition,
        rep: 'INTERFACE',
        ind: component.token,
        att: 'CREE.PAR',
        val: 'ANDY',
        ice: 1
      }
    }
    controller.send(message, function (responseObj) {
      // alert("message: " + JSON.stringify(message));
      // alert("responseObj: " + JSON.stringify(responseObj));
      type: 'setRPCBDDC'
    })
  }

  component.ajouter_date_creation = function (partition) {
    var message = {
      type: 'setRPCBDDC',
      params: {
        qui: partition,
        rep: 'INTERFACE',
        ind: component.token,
        att: 'DATE.CREATION',
        val: getDateTime(),
        ice: 1
      }
    }
    controller.send(message, function (responseObj) {
      // alert("message: " + JSON.stringify(message));
      // alert("responseObj: " + JSON.stringify(responseObj));
      type: 'setRPCBDDC'
    })
  }

  component.set_question = function (partition, question, indice) {
    var message = {
      type: 'setRPCBDDC',
      params: {
        qui: partition,
        rep: 'INTERFACE',
        ind: component.token,
        att: 'QUESTION',
        val: question,
        ice: indice
      }
    }
    controller.send(message, function (responseObj) {
      // alert("message: " + JSON.stringify(message));
      // alert("responseObj: " + JSON.stringify(responseObj));
      type: 'setRPCBDDC'
    })
  }

  component.get_reponse = function (partition, indice) {
    var message = {
      type: 'readRPCBDDC',
      params: {
        qui: partition,
        rep: 'INTERFACE',
        ind: component.token,
        att: 'REPONSE',
        ice: indice
      }
    }
    controller.send(message, function (responseObj) {
      // alert("message: " + JSON.stringify(message));
      // alert("responseObj: " + JSON.stringify(responseObj));
      if (responseObj.message && responseObj.message !== '') {
        component.reponse = responseObj.message.value
        component.setState({
          status: 'updated'
        })
      }
      type: 'readRPCBDDC'
    })
  }

  return controller
}
