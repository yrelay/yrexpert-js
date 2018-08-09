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
var moment = require('moment');
var {
  Button,
  Glyphicon,
  OverlayTrigger,
  Popover,
  Table,
  Tooltip
} = ReactBootstrap;

var SessionTableRow = require('./SessionTableRow');

var SessionTable = React.createClass({

  getInitialState: function() {
    return {
      status: 'initial'
    }
  },

  componentWillMount: function() {
    this.controller = require('./controller-SessionTable')(this.props.controller, this);
  },

  componentWillReceiveProps: function(newProps) {
    this.onNewProps(newProps);
  },

  render: function() {

    //console.log('Rendering SessionTable');
    //var componentPath = this.controller.updateComponentPath(this);

    var rows = [];
    var row;
    var session;
    var expiry;
    //console.log('this.props.sessions = ' + JSON.stringify(this.props.sessions));
    for (var i = 0; i < this.props.sessions.length; i++) {
      session = this.props.sessions[i];
      expiry = moment(new Date(session.expiry * 1000)).format('DD MMM YY, h:mm:ss a');
      row = (
        <SessionTableRow
          key = {session.id}
          pid = {session.id}
          application = {session.application}
          token = {session.token}
          expiry = {expiry}
          disabled = {session.disabled}
          controller={this.controller}
        />
      );
      rows.push(row);
    }

    //console.log('session rows: ' + JSON.stringify(rows));


    return (
        <Table 
          responsive  
          className = "overviewTable"
        >
        <thead>
          <tr>
            <th>Id</th>
            <th>Application</th>
            <th>Expiration</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </Table>
    );
  }
});

module.exports = SessionTable;
