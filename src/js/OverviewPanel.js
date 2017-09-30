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
  Panel,
  Grid,
  Row,
  Col
} = ReactBootstrap;

var BuildDetails = require('./BuildDetails');
var MasterProcessDetails = require('./MasterProcessDetails');
var WorkerProcessDetailsTable = require('./WorkerProcessDetailsTable');

var OverviewPanel = React.createClass({

  getInitialState: function() {
    return {
      status: 'initial'
    }
  },

  componentWillMount: function() {
    this.controller = require('./controller-OverviewPanel')(this.props.controller, this);
    this.title = (
      <h1>Overview {this.serverName}</h1>
    );
  },

  componentWillUpdate: function() {
    this.title = (
      <h1>Overview {this.serverName}</h1>
    );
  },

  componentWillReceiveProps: function(newProps) {
    this.onNewProps(newProps);
  },

  render: function() {

    //var componentPath = this.controller.updateComponentPath(this);

    if (this.state.status === 'initial') {
      return (
        <Panel collapsible expanded={this.expanded} header={this.title} />
      );
    }
    else {
      return (
        <Panel
          collapsible
          expanded={this.expanded}
          header={this.title}
          bsStyle="primary"
	 >
          <Grid
            fluid = {true}
          >
            <Row>
              <Col md={4}>
                <BuildDetails
                  controller = {this.controller}
                />
              </Col>
              <Col md={3}>
                <MasterProcessDetails
                  controller = {this.controller}
                />
              </Col>
              <Col md={5}>
                <WorkerProcessDetailsTable
                  controller = {this.controller}
                />
              </Col>
            </Row>
          </Grid>
        </Panel>
      );
    }
  }
});

module.exports = OverviewPanel;

