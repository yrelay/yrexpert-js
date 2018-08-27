/*

!----------------------------------------------------------------------------!
!                                                                            !
! Yexpert : (your) Système Expert sous Mumps GT.M et GNU/Linux               !
! Copyright (C) 2001-2015 by Hamid LOUAKED (HL).                             !
!                                                                            !
!----------------------------------------------------------------------------!

*/

"use strict"

var React = require('react');
var createReactClass = require('create-react-class');
var ReactBootstrap = require('react-bootstrap');
var {
  Grid,
  Row,
  Col
} = ReactBootstrap;

var TerminalPanel = require('./TerminalPanel');

var TerminalContainer = createReactClass({

  getInitialState: function() {
    return {
      status: 'initial'
    }
  },

  componentWillMount: function() {
    this.controller = require('./controller-TerminalContainer')(this.props.controller, this);
  },

  componentWillReceiveProps: function(newProps) {
    this.onNewProps(newProps);
  },

  render: function() {

    //var componentPath = this.controller.updateComponentPath(this);

    return (
      <Grid
        fluid = {true}
        className = {this.hideContainer ? 'hidden' : ''}
      >
        <Row>
          <Col md={12}>
            <TerminalPanel
              controller = {this.controller}
            />
          </Col>
        </Row>
      </Grid>
    );

  }
});

module.exports = TerminalContainer;



