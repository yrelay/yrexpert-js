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
var ReactBootstrap = require('react-bootstrap');
var {
  Nav,
  Navbar,
  NavItem,
  NavDropdown,
  MenuItem,
  SubMenu,
  Tooltip
} = ReactBootstrap;

var Banner = React.createClass({

  getInitialState: function() {
    return {
      status: 'initial'
    }
  },

  componentWillMount: function() {
    this.controller = require('./controller-Banner')(this.props.controller, this);
    this.title = (
      "yrexpert-js"
    );
  },

  componentWillUpdate: function() {
    this.title = (
      "yrexpert-js"
    );
  },

  componentWillReceiveProps: function(newProps) {
    this.onNewProps(newProps);
  },

  render: function() {

    return (
      <div>

  <Navbar inverse collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="https://www.yrelay.fr/" target="_blank">{this.title}</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav bsStyle="tabs" activeKey="1" onSelect = {this.props.controller.navOptionSelected}>
        <NavDropdown eventKey="fichier" title="Fichier" id="nav-dropdown">
          <NavDropdown eventKey="robot" title="Robot" id="nav-dropdown" horizontal>
            <MenuItem eventKey="robotandy">Andy</MenuItem>
            <MenuItem eventKey="beatryxrobot">Beatryx</MenuItem>
          </NavDropdown>
          <MenuItem eventKey="reprendreetude">Reprendre une étude</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey="logout">Fermer</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey="logout">Quitter</MenuItem>
        </NavDropdown>
        <NavDropdown eventKey="editer" title="Editer" id="nav-dropdown">
        </NavDropdown>
        <NavDropdown eventKey="navigation" title="Navigation" id="nav-dropdown">
        </NavDropdown>
        <NavDropdown eventKey="rechercher" title="Rechercher" id="nav-dropdown">
          <NavDropdown eventKey="fichier" title="Fichier" id="nav-dropdown" horizontal>
            <MenuItem eventKey="rechercherfichier">Rechercher fichier</MenuItem>
          </NavDropdown>
          <NavDropdown eventKey="texte" title="Texte" id="nav-dropdown" horizontal>
            <MenuItem eventKey="rechyrexpert-js">Module yrexpert-js</MenuItem>
            <MenuItem eventKey="rechrtnyxp">Routines YXP</MenuItem>
          </NavDropdown>
        </NavDropdown>
        <NavDropdown eventKey="partition" title="Partition" id="nav-dropdown">
          <MenuItem eventKey="allerpartition">Aller sur une partition</MenuItem>
        </NavDropdown>
        <NavDropdown eventKey="executer" title="Exécuter" id="nav-dropdown">
          <MenuItem eventKey="terminal">Terminal</MenuItem>
            <NavDropdown eventKey="moniteur" title="Moniteur" id="nav-dropdown">
              <MenuItem eventKey="overview">Vue d'ensemble</MenuItem>
              <MenuItem eventKey="docstore">Globals</MenuItem>
              <MenuItem eventKey="sessions">Sessions</MenuItem>
              <MenuItem eventKey="docs" href="docs/index.html" target="_blank">Documentation API</MenuItem>
            </NavDropdown>
        </NavDropdown>
        <NavDropdown eventKey="fenetre" title="Fenêtre" id="nav-dropdown">
        </NavDropdown>
        <NavDropdown eventKey="aide" title="Aide" id="nav-dropdown">
          <MenuItem eventKey="bienvenue">Bienvenue</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey="tabledesmatieresdelaide" href="help/index.html" target="_blank">Table des matières de l'aide</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey="apropos">A propos d'YRexpert</MenuItem>
        </NavDropdown>
      </Nav>

      <Nav bsStyle="tabs" pullRight>
        <NavItem eventKey="allerpartition" href="#">{this.qui}</NavItem>
      </Nav>

    </Navbar.Collapse>
  </Navbar>

      </div>
    );
  }
});

module.exports = Banner;









