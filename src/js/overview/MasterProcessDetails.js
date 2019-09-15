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
var {
  Panel,
  Table,
  Button,
  Glyphicon,
  OverlayTrigger,
  Popover,
  Tooltip
} = ReactBootstrap

var MasterProcessDetails = createReactClass({

  getInitialState: function () {
    return {
      status: 'initial'
    }
  },

  componentWillMount: function () {
    this.controller = require('./controller-MasterProcessDetails')(this.props.controller, this)
    this.title = (
      <h2>Détails du processus maître</h2>
    )
    this.tooltip = (
      <Tooltip
        id='masterProcessShutdownBtn'
      >
        Shutdown ewd-xpress
      </Tooltip>
    )
  },

  componentWillReceiveProps: function (newProps) {
    this.onNewProps(newProps)
  },

  render: function () {
    // console.log('Rendering MasterProcessDetails!');
    // var componentPath = this.controller.updateComponentPath(this);

    var memoryPopover = (
      <Popover
        id='master-process-memory'
        title='Master Process Memory'
      >
        <Table>
          <tbody>
            <tr>
              <td>rss:</td>
              <td>{this.master.memory.rss}</td>
            </tr>
            <tr>
              <td>heapTotal:</td>
              <td>{this.master.memory.heapTotal}</td>
            </tr>
            <tr>
              <td>heapUsed:</td>
              <td>{this.master.memory.heapUsed}</td>
            </tr>
          </tbody>
        </Table>
      </Popover>
    )

    return (
      <Panel
        header={this.title}
        bsStyle='info'
      >
        <Table
          responsive
          className='overviewTable'
        >
          <tbody>
            <tr>
              <td>
                <OverlayTrigger
                  trigger={['hover', 'focus']}
                  placement='right'
                  overlay={memoryPopover}
                >
                  <span>{this.pid}</span>
                </OverlayTrigger>
              </td>
              <td className='pushRight'>
                <OverlayTrigger
                  placement='top'
                  overlay={this.tooltip}
                >
                  <Button
                    bsStyle='danger'
                    onClick={this.stopMasterProcess}
                  >
                    <Glyphicon
                      glyph='remove'
                    />
                  </Button>
                </OverlayTrigger>
              </td>
            </tr>
            <tr>
              <td>Started</td>
              <td className='pushRight'>{this.started}</td>
            </tr>
            <tr>
              <td>Uptime</td>
              <td className='pushRight'>{this.upTime}</td>
            </tr>
          </tbody>
        </Table>
      </Panel>
    )
  }
})

module.exports = MasterProcessDetails
