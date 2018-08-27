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
//var Inspector = require('react-json-inspector');

var {
  Panel,
  Grid,
  Row,
  Col,
  Image,
  ResponsiveEmbed
} = ReactBootstrap;

var AproposPanel = createReactClass({

  getInitialState: function() {
    return {
      status: 'initial'
    }
  },

  componentWillMount: function() {
    this.controller = require('./controller-TerminalPanel')(this.props.controller, this);

    this.title = (
      <h1>Terminal</h1>
    );
  },

  componentWillReceiveProps: function(newProps) {
    this.onNewProps(newProps);
  },

  render: function() {

    //var componentPath = this.controller.updateComponentPath(this);

    return (
      <Panel 
        collapsible 
        expanded={this.expanded} 
        header={this.title}
        bsStyle="primary"
      >

      <div style={{width: 'auto', height: 'auto'}}>
        <ResponsiveEmbed a16by9>
          <embed type="text/html" src="http://localhost:8081/yrexpert-term/index.html" />
        </ResponsiveEmbed>
      </div>

      </Panel>
    );
  }
});

module.exports = AproposPanel;

/*
        {
        <Grid>
          <Row>
            <Col md={12}>
              <iframe height="430px" width="710px" src="http://localhost:8081/yrexpert-term/index.html" frameborder="0" allowfullscreen></iframe>
            </Col>
          </Row>
        </Grid>

        }
*/





