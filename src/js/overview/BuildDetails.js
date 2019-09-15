/*

!----------------------------------------------------------------------------!
!                                                                            !
! YRexpert : (Your Relay) Système Expert sous Mumps GT.M et GNU/Linux        !
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
  Table
} = ReactBootstrap

var BuildDetails = createReactClass({

  getInitialState: function () {
    return {
      status: 'initial'
    }
  },

  componentWillMount: function () {
    this.controller = require('./controller-BuildDetails')(this.props.controller, this)
    this.title = (
      <h2>Détails de la construction</h2>
    )
  },

  componentWillReceiveProps: function (newProps) {
    this.onNewProps(newProps)
  },

  render: function () {
    // console.log('Rendering Build Details!');
    // var componentPath = this.controller.updateComponentPath(this);

    return (
      <Panel
        header={this.title}
        bsStyle='info'
      >
        <Table responsive className='overviewTable'>
          <thead>
            <tr>
              <th>Module</th>
              <th>Version/build</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Node.js</td>
              <td>{this.nodejsBuild}</td>
            </tr>
            <tr>
              <td>Database Interface</td>
              <td>{this.dbInterface}</td>
            </tr>
            <tr>
              <td>Database</td>
              <td>{this.db}</td>
            </tr>
            <tr>
              <td>ewd-qoper8</td>
              <td>{this.qoper8Build}</td>
            </tr>
            <tr>
              <td>ewd-document-store</td>
              <td>{this.docStoreBuild}</td>
            </tr>
            <tr>
              <td>ewd-qoper8-express</td>
              <td>{this.qxBuild}</td>
            </tr>
            <tr>
              <td>ewd-express</td>
              <td>{this.xpressBuild}</td>
            </tr>
            <tr>
              <td>yrexpert-m</td>
              <td>{this.yrexpertmVersion}</td>
            </tr>
            <tr>
              <td>yrexpert-js</td>
              <td>{this.yrexpertjsBuild}</td>
            </tr>
          </tbody>
        </Table>
      </Panel>
    )
  }
})

module.exports = BuildDetails
