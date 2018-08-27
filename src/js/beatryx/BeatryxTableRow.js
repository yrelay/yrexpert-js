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

var BeatryxTableRow = createReactClass({

  getInitialState: function() {
    return {
      status: 'initial'
    }
  },

  componentWillMount: function() {
    this.controller = require('./controller-BeatryxTableRow')(this.props.controller, this);
    var id = 'Beatryx' + this.props.pid + 'StopBtn';
    this.stopTooltip = (
      <Tooltip
        id = {id}
      >
        Stop and Delete this Beatryx
      </Tooltip>
    );
    id = 'Beatryx' + this.props.pid + 'ShowBtn';
    this.showTooltip = (
      <Tooltip
        id = {id}
      >
        Show Beatryx Details
      </Tooltip>
    );

  },

  componentWillReceiveProps: function(newProps) {
    this.onNewProps(newProps);
  },

  render: function() {

    //console.log('Rendering BeatryxTableRow');
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
              onClick = {this.stopBeatryx}
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
              onClick = {this.showBeatryx}
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

module.exports = BeatryxTableRow;
