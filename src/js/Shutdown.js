/*

!----------------------------------------------------------------------------!
!                                                                            !
! Yexpert : (your) Système Expert sous Mumps GT.M et GNU/Linux               !
! Copyright (C) 2001-2015 by Hamid LOUAKED (HL).                             !
!                                                                            !
!----------------------------------------------------------------------------!

*/

'use strict'

import React from 'react'
import createReactClass from 'create-react-class'
import {
  Button,
  Navbar
} from 'react-bootstrap'

var controller

export default createReactClass({

  startMonitor: function () {
    location.reload()
  },

  render: function () {
    return (
      <div>
        <Navbar inverse>
          <Navbar.Brand>
            {this.props.title}
          </Navbar.Brand>
        </Navbar>
        <Button
          bsStyle='success'
          onClick={this.startMonitor}
        >
          Restart Monitor
        </Button>
      </div>
    )
  }
})
