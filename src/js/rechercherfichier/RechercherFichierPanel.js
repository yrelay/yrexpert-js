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
// var Inspector = require('react-json-inspector');

// const findUp = require('find-up')
// const testPath = findUp.sync(['App.s', 'index.js'])
// console.log('-----tesPath=' + JSON.stringify(testPath));

var {
  Button,
  Panel,
  Media,
  Jumbotron
} = ReactBootstrap

var RechercherFichierPanel = createReactClass({

  getInitialState: function () {
    return {
      status: 'initial'
    }
  },

  componentWillMount: function () {
    this.controller = require('./controller-RechercherFichierPanel')(this.props.controller, this)

    this.title = (
      <h1>RechercherFichier</h1>
    )
  },

  componentWillReceiveProps: function (newProps) {
    this.onNewProps(newProps)
  },

  render: function () {
    // var componentPath = this.controller.updateComponentPath(this);

    return (
      <Panel
        collapsible
        expanded={this.expanded}
        header={this.title}
        bsStyle='primary'
      >

        <Jumbotron>
          <h1>Bonjour !</h1>

          <Media>
            <Media.Left></Media.Left>
            <Media.Body>
              <img width={64} height={64} src='./images/yrexpert_logo.png' alt='Image' />
              <Media.Heading>yrexpert-js</Media.Heading>

              <p>Le Syst&egrave;me Expert YRexpert est libre et fonctionne sous Mumps <a href='http://www.fisglobal.com/products-technologyplatforms-gtm' rel='noopener noreferrer'>GT.M</a> et GNU/Linux. <a href='https://www.yrelay.fr/' target='_blank' rel='noopener noreferrer'>Yrelay</a> utilise de nombreuses contributions communautaires libres&nbsp;notamment l'application <a href='http://www.mgateway.com/' rel='noopener noreferrer'>EWD 3</a>.</p>
              <p>Comme tous les syst&egrave;mes experts, YRexpert se pr&eacute;sente comme une coquille vide qu&rsquo;il va falloir compl&eacute;ter.</p>

            </Media.Body>
          </Media>

          <p><Button bsStyle='primary' href='https://www.yrelay.fr/' target='_blank'>En savoir plus</Button></p>

        </Jumbotron>

      </Panel>
    )
  }
})

module.exports = RechercherFichierPanel
