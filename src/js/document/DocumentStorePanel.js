/*

!----------------------------------------------------------------------------!
!                                                                            !
! YRexpert : (Your Relay) Système Expert sous Mumps GT.M et GNU/Linux        !
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

var DocumentStorePanel = createReactClass({

  getInitialState: function() {
    return {
      status: 'initial'
    }
  },

  componentWillMount: function() {
    this.controller = require('./controller-DocumentStorePanel')(this.props.controller, this);

    this.tooltip = (
      <Tooltip
        id = "DocumentRefreshBtn"
      >
        Refresh
      </Tooltip>
    );

    this.title = (
      <span>
        <b>Globals</b>
        <OverlayTrigger
          placement="top"
            overlay={this.tooltip}
                >
          <Button
            bsClass="btn btn-success pull-right"
            onClick = {this.refresh}
          >
            <Glyphicon
              glyph="refresh"
            />
          </Button>
        </OverlayTrigger>
      </span>
    );
  },

  componentDidUpdate: function() {

    //console.log('status: ' + this.state.status);
    var that = this;

    setTimeout(function() {
      $('.json-inspector__leaf').each(function(ix, item) {
        var id = $(item).attr('id');
        var name = id.split('root.')[1];
        if (!name) {
          $(item).find('span.json-inspector__key').first().hide();
          $(item).find('span.json-inspector__value').first().hide();
        }
        else if (name.indexOf('.') === -1 && that.data[name]) {
          $(item).find('span.json-inspector__key').first().addClass('json-inspector__docName');
        }
      });
    }, 100);
  },
  
  componentWillReceiveProps: function(newProps) {
    this.onNewProps(newProps);
  },

  render: function() {

    //var componentPath = this.controller.updateComponentPath(this);

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
        header={this.title}
        bsStyle="primary"
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

module.exports = DocumentStorePanel;







