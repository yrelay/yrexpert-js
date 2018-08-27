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
var Inspector = require('react-json-inspector');

var {
  Button,
  Glyphicon,
  OverlayTrigger,
  Panel,
  Tooltip
} = ReactBootstrap;

var SessionDetails = createReactClass({

  getInitialState: function() {
    return {
      status: 'initial'
    }
  },

  componentWillMount: function() {
    this.controller = require('./controller-SessionDetails')(this.props.controller, this);
  },
  
  componentWillReceiveProps: function(newProps) {
    this.onNewProps(newProps);
  },

  render: function() {

    //var componentPath = this.controller.updateComponentPath(this);

   //console.log('rendering SessionDetails - ' + JSON.stringify(this.data));

    if (!this.data) {
      return (
        <div></div>
      );
    }

    // create a clone of data to ensure re-rendering
    var newData = {};
    Object.assign(newData, this.data);
   
    return (
      <Panel 
        collapsible 
        expanded={this.expanded} 
        header = {this.title}
        bsStyle="info"
      >
        <Inspector 
          data={newData}
          isExpanded = {this.isExpanded}
          onClick={this.nodeClicked}
          search={false}
        />
      </Panel>
    );
  }
});

module.exports = SessionDetails;









