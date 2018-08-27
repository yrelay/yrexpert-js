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
  Panel,
  Table,
  Button,
  Glyphicon,
  OverlayTrigger,
  Tooltip
} = ReactBootstrap;

var WorkerProcessDetails = require('./WorkerProcessDetails');
var Spinner = require('./Spinner');

var WorkerProcessDetailsTable = createReactClass({

  getInitialState: function() {
    return {
      status: 'initial'
    }
  },

  componentWillMount: function() {
    this.controller = require('./controller-WorkerProcessDetailsTable')(this.props.controller, this);
    this.title = (
      <h2>Détails du processus Worker</h2>
    );
    this.tooltip = (
      <Tooltip 
        id = "workerProcessShutdownBtn"
      >
        Shutdown this Worker Process
      </Tooltip>
    );

  },

  componentWillReceiveProps: function(newProps) {
    this.onNewProps(newProps);
  },

  render: function() {

    //console.log('Rendering WorkerProcessDetails Table!');
    //var componentPath = this.controller.updateComponentPath(this);

    var rows = [];
    var row;
    var details;
    for (var i = 0; i < this.workerDetails.length; i++) {
      details = this.workerDetails[i];
	  //console.log('** details = ' + JSON.stringify(details));
      row = (
        <WorkerProcessDetails
          key = {details.pid}
          pid = {details.pid}
          memory = {details.memory}
          noOfRequests = {details.noOfMessages}
          available = {details.available.toString()}
          controller = {this.controller}
          stopWorker = {this.stopWorker}
        />
      );
      rows.push(row);
    }

    return (
      <Panel 
        header={this.title}
        bsStyle="info"
      >
        <Table 
          responsive  
          className = "overviewTable"
        >
          <thead>
            <tr>
              <th>PID</th>
              <th>Demandes</th>
              <th>Disponible</th>
              <th className = "pushRight">
                PoolSize&nbsp;&nbsp;&nbsp;
                <Spinner
                  value = {this.poolSize}
                  changeHandler = {this.setPoolSize}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </Table>
      </Panel>
    );
  }
});

module.exports = WorkerProcessDetailsTable;
