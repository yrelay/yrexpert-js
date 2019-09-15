/*

!----------------------------------------------------------------------------!
!                                                                            !
! YRexpert : (Your Relay) Système Expert sous Mumps GT.M et GNU/Linux        !
! Copyright (C) 2001-2015 by Hamid LOUAKED (HL).                             !
!                                                                            !
!----------------------------------------------------------------------------!

*/

'use strict'

var React = require('react')
var createReactClass = require('create-react-class')
var ReactToastr = require('react-toastr')
var jQuery = require('jquery')
window.$ = window.jQuery = jQuery

var { ToastContainer } = ReactToastr
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation)

var LoginRpcModal = require('./loginrpc/LoginRpcModal')
var Banner = require('./Banner')
var Content = require('./Content')
var Shutdown = require('./Shutdown')

var controller
var title = 'yrexpert-js'

var MainPage = createReactClass({

  getInitialState: function () {
    return {
      status: 'initial'
    }
  },

  componentWillMount: function () {
    controller = require('./controller-MainPage')(this.props.controller, this)
  },

  render: function () {
    // console.log('rendering MainPage');
    // var componentPath = controller.updateComponentPath(this);

    if (this.state.status === 'shutdown') {
      return (
        <Shutdown
          title={title}
        />
      )
    }

    return (
      <div>
        <Banner
          title={title}
          controller={controller}
        />

        <ToastContainer
          ref='toastContainer'
          toastMessageFactory={ToastMessageFactory}
          className='toast-top-right'
          newestOnTop
          target='body'
        />

        <LoginRpcModal
          controller={controller}
          show={this.showLoginModal}
        />

        <Content
          controller={controller}
          status={this.state.status}
        />

      </div>

    )
  }
})

module.exports = MainPage
