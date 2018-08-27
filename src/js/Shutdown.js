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
  Button,
  Navbar
} = ReactBootstrap;

var controller;

module.exports = createReactClass({

  startMonitor: function() {
    location.reload();
  },

  render: function() {
    return (
      <div>
        <Navbar inverse >
          <Navbar.Brand>
            {this.props.title}
          </Navbar.Brand>
        </Navbar>
        <Button 
          bsStyle="success"
          onClick = {this.startMonitor}
        >
          Redémarrer
        </Button>
      </div>       
    );
  }
});

