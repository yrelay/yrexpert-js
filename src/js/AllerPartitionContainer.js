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
var ReactBootstrap = require('react-bootstrap');
var {
  Grid,
  Row,
  Col
} = ReactBootstrap;

var AllerPartitionPanel = require('./AllerPartitionPanel');

var AllerPartitionContainer = React.createClass({

  getInitialState: function() {
    return {
      status: 'initial'
    }
  },

  componentWillMount: function() {
    this.controller = require('./controller-AllerPartitionContainer')(this.props.controller, this);
  },

  componentWillReceiveProps: function(newProps) {
    this.onNewProps(newProps);
  },

  render: function() {

    return (
      <Grid
        fluid = {true}
        className = {this.hideContainer ? 'hidden' : ''}
      >
        <Row>
          <Col md={12}>
            <AllerPartitionPanel
              controller = {this.controller}
            />
          </Col>
        </Row>
      </Grid>
    );

  }
});

module.exports = AllerPartitionContainer;



