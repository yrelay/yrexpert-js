/*

!----------------------------------------------------------------------------!
!                                                                            !
! YRexpert : (Your Relay) Système Expert sous Mumps GT.M et GNU/Linux        !
! Copyright (C) 2001-2015 by Hamid LOUAKED (HL).                             !
!                                                                            !
!----------------------------------------------------------------------------!

*/

module.exports = function (controller, component) {
  component.refresh = function () {
    var message = {
      type: 'getGlobalDirectory'
    }
    controller.send(message, function (responseObj) {
      component.data = {}
      component.data.TABIDENT = expandText
      component.setState({ status: 'globalDirectory' })
    })
  }

  component.onNewProps = function (newProps) {
  }

  component.expanded = true

  var expandText = ' -->'
  component.expand = false
  component.isExpanded = function (keypath, value) {
    return component.expand
  }

  // component.refresh();

  function index (obj, is, value) {
    // alert("value: " + JSON.stringify(value));
    if (typeof is === 'string') {
      return index(obj, is.split('.'), value)
    } else if (is.length === 1 && value !== undefined) {
      return obj[is[0]] = value
    } else if (is.length === 0) {
      return obj
    } else {
      return index(obj[is[0]], is.slice(1), value)
    }
  }

  component.nodeClicked = function (obj) {
    if (obj.value === expandText) {
      var message = {
        type: 'getNextSubscripts',
        params: {
          path: obj.path,
          expandText: expandText
        }
      }
      controller.send(message, function (responseObj) {
        // alert("obj.path: " + JSON.stringify(obj.path));
        index(component.data, obj.path, responseObj.message)
        component.expand = true
        component.setState({ status: 'nextSubscripts' })
      })
    }
  }

  return controller
}
