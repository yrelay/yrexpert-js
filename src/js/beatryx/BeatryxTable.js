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
var moment = require('moment')
var { Table } = ReactBootstrap

var BeatryxTableRow = require('./BeatryxTableRow')

var BeatryxTable = createReactClass({

  getInitialState: function () {
    return {
      status: 'initial'
    }
  },

  componentWillMount: function () {
    this.controller = require('./controller-BeatryxTable')(this.props.controller, this)
  },

  componentWillReceiveProps: function (newProps) {
    this.onNewProps(newProps)
  },

  render: function () {
    // console.log('Rendering BeatryxTable');
    // var componentPath = this.controller.updateComponentPath(this);

    var rows = []
    var row
    var beatryx
    var expiry
    // console.log('this.props.beatryxRobot = ' + JSON.stringify(this.props.beatryxRobot));
    for (var i = 0; i < this.props.beatryxRobot.length; i++) {
      beatryx = this.props.beatryxRobot[i]
      expiry = moment(new Date(beatryx.expiry * 1000)).format('DD MMM YY, h:mm:ss a')
      row = (
        <BeatryxTableRow
          key={beatryx.id}
          pid={beatryx.id}
          application={beatryx.application}
          token={beatryx.token}
          expiry={expiry}
          disabled={beatryx.disabled}
          controller={this.controller}
        />
      )
      rows.push(row)
    }

    // console.log('beatryx rows: ' + JSON.stringify(rows));

    return (
      <Table
        responsive
        className='overviewTable'
      >
        <thead>
          <tr>
            <th>Date de clôture</th>
            <th>31/12/2016</th>
            <th>31/12/2017</th>
            <th>Variation</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </Table>
    )
  }
})

module.exports = BeatryxTable
