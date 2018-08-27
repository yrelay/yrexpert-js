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

var WorkerProcessDetails = createReactClass({

  getInitialState: function() {
    return {
      status: 'initial'
    }
  },

  componentWillMount: function() {
    this.controller = require('./controller-WorkerProcessDetails')(this.props.controller, this);
    var id = 'worker' + this.props.pid + 'ShutdownBtn';
    this.tooltip = (
      <Tooltip 
        id = {id}
      >
        Shutdown this Worker Process
      </Tooltip>
    );
  },

  componentWillReceiveProps: function(newProps) {
    this.onNewProps(newProps);
  },

  render: function() {

    //console.log('Rendering WorkerProcessDetails Row!');
    //var componentPath = this.controller.updateComponentPath(this);

    var title = 'Worker ' + this.props.pid + ' Memory';

    var memoryPopover = (
      <Popover id="worker-process-memory" title={title}>
        <Table>
          <tbody>
            <tr>
              <td>rss:</td>
              <td>{this.props.memory.rss}</td>
            </tr>
            <tr>
              <td>heapTotal:</td>
              <td>{this.props.memory.heapTotal}</td>
            </tr>
            <tr>
              <td>heapUsed:</td>
              <td>{this.props.memory.heapUsed}</td>
            </tr>
          </tbody>
        </Table>
      </Popover>
    );

    return (
      <tr>
        <td>
          <OverlayTrigger
            trigger={['hover', 'focus']}
            placement="left"
            overlay={memoryPopover}
          >
            <span>{this.props.pid}</span>
          </OverlayTrigger>
        </td>
        <td>{this.props.noOfRequests}</td>
        <td>{this.props.available}</td>
        <td className = "pushRight">
          <OverlayTrigger 
            placement="top" 
            overlay={this.tooltip}
          >
            <Button 
              bsStyle="danger"
              onClick = {this.stopWorker}
            >
              <Glyphicon 
                glyph="remove"
              />
            </Button>
          </OverlayTrigger>
        </td>
      </tr>
    );
  }
});

module.exports = WorkerProcessDetails;
