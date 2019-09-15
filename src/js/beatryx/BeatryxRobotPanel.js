/*

!----------------------------------------------------------------------------!
!                                                                            !
! Yexpert : (your) Système Expert sous Mumps GT.M et GNU/Linux               !
! Copyright (C) 2001-2015 by Hamid LOUAKED (HL).                             !
!                                                                            !
!----------------------------------------------------------------------------!

*/

'use strict'

var React = require('react')
var createReactClass = require('create-react-class')
var ReactBootstrap = require('react-bootstrap')
// var Inspector = require('react-json-inspector');
var BeatryxTable = require('./BeatryxTable')
var BeatryxDetails = require('./BeatryxDetails')

var {
  Button,
  Col,
  Glyphicon,
  Grid,
  OverlayTrigger,
  Panel,
  Row,
  Tooltip
} = ReactBootstrap

var BeatryxRobotPanel = createReactClass({

  getInitialState: function () {
    return {
      status: 'initial'
    }
  },

  componentWillMount: function () {
    this.controller = require('./controller-BeatryxRobotPanel')(this.props.controller, this)

    this.tooltip = (
      <Tooltip
        id='BeatryxRobotRefreshBtn'
      >
        Refresh
      </Tooltip>
    )

    this.title = (
      <span>
        <b>Beatryx le robot (bilan)</b>
        <OverlayTrigger
          placement='top'
          overlay={this.tooltip}
        >
          <Button
            bsClass='btn btn-success pull-right'
            onClick={this.refresh}
          >
            <Glyphicon
              glyph='refresh'
            />
          </Button>
        </OverlayTrigger>
      </span>
    )
  },

  componentDidMount: function () {
    // Récupérer la liste actuelle de beatryxRobot
    this.refresh()
  },

  componentWillReceiveProps: function (newProps) {
    this.onNewProps(newProps)
  },

  render: function () {
    // var componentPath = this.controller.updateComponentPath(this);

    // console.log('rendering BeatryxRobotPanel: ' + JSON.stringify(this.beatryxData));

    return (
      <Panel
        collapsible
        expanded
        header={this.title}
        bsStyle='primary'
      >
        <Grid
          fluid
        >
          <Row>
            <Col md={5}>
              <BeatryxTable
                controller={this.controller}
                beatryxRobot={this.beatryxRobot}
              />
            </Col>
            <Col md={7}>
              <BeatryxDetails
                controller={this.controller}
                data={this.beatryxData}
              />
            </Col>
          </Row>
        </Grid>
      </Panel>
    )
  }
})

module.exports = BeatryxRobotPanel
