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

var RobotAndyContainer = require('./RobotAndyContainer');
var DefUtilisateurContainer = require('./DefUtilisateurContainer');
var NouvPartitionContainer = require('./NouvPartitionContainer');

var AllerPartitionContainer = require('./AllerPartitionContainer');

var BienvenueContainer = require('./BienvenueContainer');
var AproposContainer = require('./AproposContainer');

var TerminalContainer = require('./TerminalContainer');
var OverviewContainer = require('./OverviewContainer');
var DocumentStoreContainer = require('./DocumentStoreContainer');
var SessionsContainer = require('./SessionsContainer');

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
          <DefUtilisateurContainer controller = {this.controller} status = {this.status} />
          <NouvPartitionContainer controller = {this.controller} status = {this.status} />

          <AllerPartitionContainer controller = {this.controller} status = {this.status} />

          <BienvenueContainer controller = {this.controller} status = {this.status} />
          <AproposContainer controller = {this.controller} status = {this.status} />



          <TerminalContainer
            controller = {this.controller}
            status = {this.status} 
          />
          <OverviewContainer
            controller = {this.controller}
            status = {this.status} 
          /> 
          <DocumentStoreContainer
            controller = {this.controller}
            status = {this.status} 
          />
          <SessionsContainer
            controller = {this.controller}
            status = {this.status} 
          />
        </div>
      );
    }
  }
});

module.exports = Content;




