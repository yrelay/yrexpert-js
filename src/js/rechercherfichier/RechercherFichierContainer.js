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

var RechercherFichierPanel = require('./RechercherFichierPanel');

var RechercherFichierContainer = React.createClass({

  getInitialState: function() {
    return {
      status: 'initial'
    }
  },

  componentWillMount: function() {
    this.controller = require('./controller-RechercherFichierContainer')(this.props.controller, this);
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
            <RechercherFichierPanel
              controller = {this.controller}
            />
          </Col>
        </Row>
      </Grid>
    );

  }
});

module.exports = RechercherFichierContainer;



