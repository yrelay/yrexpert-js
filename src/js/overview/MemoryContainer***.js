/*

!----------------------------------------------------------------------------!
!                                                                            !
! Yexpert : (your) Système Expert sous Mumps GT.M et GNU/Linux               !
! Copyright (C) 2001-2015 by Hamid LOUAKED (HL).                             !
!                                                                            !
!----------------------------------------------------------------------------!

*/

'use strict'

var React = require('react')
var createReactClass = require('create-react-class')
var ReactBootstrap = require('react-bootstrap')
var {
  Grid,
  Row,
  Col
} = ReactBootstrap

// var MemoryPanel = require('./MemoryPanel');

module.exports = createReactClass({

  getInitialState: function () {
    return {
      status: 'initial'
    }
  },

  componentWillMount: function () {
    // this.controller = require('./controller-MemoryContainer')(this.props.controller, this);
  },

  componentWillReceiveProps: function (newProps) {
    this.onNewProps(newProps)
  },

  render: function () {
    // var componentPath = this.controller.updateComponentPath(this);

    if (this.props.status !== 'xxx') {
      return (
        <div />
      )
    } else {
      return (
        <Grid>
          <Row>
            <Col md={12}>
              <div>Le panneau de mémoire va ici</div>
            </Col>
          </Row>
        </Grid>
      )
    }
  }
})
