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
var Inspector = require('react-json-inspector');
var fs = require('fs');
var os = require('os');

var {
  Button,
  Glyphicon,
  OverlayTrigger,
  Panel,
  Tooltip,
  form,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock
} = ReactBootstrap;

var RobotAndyPanel = React.createClass({

  componentWillMount: function() {

    this.controller = require('./controller-RobotAndyPanel')(this.props.controller, this);

    this.title = (
      <h1>Robot Andy</h1>
    );
  },

// *******

  getInitialState() {
    return {
      valueNomPartition: '',
      isLoading: false,
      status: 'initial'
    };
  },


// ******2

  handleClick() {
    this.setState({isLoading: true});
    this.refresh();

    // This probably where you would have an `ajax` call
    setTimeout(() => {
      // Completed of async action, set loading state back
      this.setState({isLoading: false});
    }, 2000);
    },
/*
  componentDidUpdate: function() {

    //console.log('status: ' + this.state.status);
    var that = this;

    setTimeout(function() {
      $('.json-inspector__leaf').each(function(ix, item) {
        var id = $(item).attr('id');
        var name = id.split('root.')[1];
        if (!name) {
          $(item).find('span.json-inspector__key').first().hide();
          $(item).find('span.json-inspector__value').first().hide();
        }
        else if (name.indexOf('.') === -1 && that.data[name]) {
          $(item).find('span.json-inspector__key').first().addClass('json-inspector__docName');
        }
      });
    }, 100);
  },
*/  
// ******

  componentWillReceiveProps: function(newProps) {
    this.onNewProps(newProps);
  },

  render: function() {

    //var componentPath = this.controller.updateComponentPath(this);

    /**
     * @todo Améliorer le test sur laille de la partition
     * @todo La taille ne doit pas excéder 50% de la taille disponible en local
    */

    let isLoading = this.state.isLoading;

    // Créer un clone de données pour assurer un nouveau rendu
    if (this.data) {
      var newData = {};
      Object.assign(newData, this.data);
    }

    return (
      <Panel 
        collapsible 
        expanded={this.expanded} 
        header={this.title}
        bsStyle="primary"
      >

      <form>
        <FormGroup
          controlId="formBasicText"
        >
          <ControlLabel>Dialoguer avec Andy.</ControlLabel>
          <FormControl
            type="text"
            value={this.state.value}
            placeholder="Saisir votre question"
          />
          <FormControl.Feedback />
          <HelpBlock>Demandez à Andy toutes les questions et il fera de son mieux pour aider à les résoudre. Vous devez autoriser cette application à "Exécuter" lorsque vous y êtes invité. Si vous ne pouvez pas taper, cliquez sur l'écran de jeu pour concentrer la fenêtre. Tapez "help" (sans guillemets) pour afficher une liste de commandes.</HelpBlock>
        </FormGroup>

      </form>

      <Button
        bsStyle="primary"
        disabled={isLoading}
        onClick={!isLoading ? this.handleClick : null}>
        {isLoading ? 'En traitement...' : 'Soumettre'}
      </Button>

      </Panel>
    );
  }
});

module.exports = RobotAndyPanel;





