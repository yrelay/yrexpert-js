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
  Glyphicon,
  OverlayTrigger,
  Popover,
  Table,
  Tooltip
} = ReactBootstrap;

var SessionTableRow = createReactClass({

  getInitialState: function() {
    return {
      status: 'initial'
    }
  },

  componentWillMount: function() {
    this.controller = require('./controller-SessionTableRow')(this.props.controller, this);
    var id = 'Session' + this.props.pid + 'StopBtn';
    this.stopTooltip = (
      <Tooltip
        id = {id}
      >
        Stop and Delete this Session
      </Tooltip>
    );
    id = 'Session' + this.props.pid + 'ShowBtn';
    this.showTooltip = (
      <Tooltip
        id = {id}
      >
        Show Session Details
      </Tooltip>
    );

  },

  componentWillReceiveProps: function(newProps) {
    this.onNewProps(newProps);
  },

  render: function() {

    //console.log('Rendering SessionTableRow');
    //var componentPath = this.controller.updateComponentPath(this);

    return (
      <tr>
        <td>
            {this.props.pid}
        </td>
        <td>{this.props.application}</td>
        <td>{this.props.expiry}</td>
        <td>
          <OverlayTrigger 
            placement="top" 
            overlay={this.stopTooltip}
          >
            <Button 
              bsStyle="danger"
              onClick = {this.stopSession}
              bsSize="small"
              disabled = {this.props.disabled}
            >
              <Glyphicon 
                glyph="remove"
              />
            </Button>
          </OverlayTrigger>
        </td>
        <td>
          <OverlayTrigger 
            placement="top" 
            overlay={this.showTooltip}
          >
            <Button 
              bsStyle="info"
              onClick = {this.showSession}
              bsSize="small"
            >
              <Glyphicon 
                glyph="list-alt"
              />
            </Button>
          </OverlayTrigger>
        </td>
      </tr>
    );
  }
});

module.exports = SessionTableRow;
