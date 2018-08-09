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
// Fichier
var RobotAndyContainer = require('./andy/RobotAndyContainer');
var BeatryxRobotContainer = require('./beatryx/BeatryxRobotContainer');

// Editer

// Navigation

// Rechercher
var RechercherFichierContainer = require('./rechercherfichier/RechercherFichierContainer');

// Partition
var AllerPartitionContainer = require('./allerpartition/AllerPartitionContainer');

// Exécuter
var TerminalContainer = require('./terminal/TerminalContainer');
var OverviewContainer = require('./overview/OverviewContainer');
var DocumentStoreContainer = require('./document/DocumentStoreContainer');
var SessionsContainer = require('./session/SessionsContainer');

// Fenêtre

// Aide
var BienvenueContainer = require('./bienvenue/BienvenueContainer');
var AproposContainer = require('./apropos/AproposContainer');


var Content = React.createClass({

  getInitialState: function() {
    return {
      status: 'initial'
    }
  },

  componentWillMount: function() {
    this.controller = require('./controller-Content')(this.props.controller, this);
  },

  componentWillReceiveProps: function(newProps) {
    this.onNewProps(newProps);
  },

  render: function() {

    //var componentPath = this.controller.updateComponentPath(this);

    if (this.status === 'initial') {
      return (
        <div></div>
      );
    }
    else {
      return (
        <div>
          <RobotAndyContainer controller = {this.controller} status = {this.status} />
          <BeatryxRobotContainer controller = {this.controller} status = {this.status} />

          <RechercherFichierContainer controller = {this.controller} status = {this.status} />

          <AllerPartitionContainer controller = {this.controller} status = {this.status} />

          <TerminalContainer controller = {this.controller} status = {this.status} />
          <OverviewContainer controller = {this.controller} status = {this.status} /> 
          <DocumentStoreContainer controller = {this.controller} status = {this.status} />
          <SessionsContainer controller = {this.controller} status = {this.status} />

          <BienvenueContainer controller = {this.controller} status = {this.status} />
          <AproposContainer controller = {this.controller} status = {this.status} />

        </div>
      );
    }
  }
});

module.exports = Content;








