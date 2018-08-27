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

var NouvPartitionPanel = createReactClass({

  componentWillMount: function() {

    this.controller = require('./controller-NouvPartitionPanel')(this.props.controller, this);

    this.title = (
      <h1>Nouvelle partition</h1>
    );
  },

// *******

  getInitialState() {
    return {
      valueNomPartition: 'DMO',
      valueTaillePartition: 1,
      isLoading: false,
      status: 'initial'
    };
  },

  getValidationNomPartition() {
    const length = this.state.valueNomPartition.length;
    if (length > 5) return 'error';
    else if (length > 3) return 'warning';
    else if (length == 3) return 'success';
  },

  getValidationTaillePartition() {
    const taille = this.state.valueTaillePartition;
    if (taille > 0 && taille <= 5) return 'success';
    else if (taille > 1 && taille <= 10) return 'warning';
    else if (taille <= 0 || taille > 10) return 'error';
  },

  handleChangeNomPartition(e) {
    const re = /[a-zA-Z]/g;
    const np = e.target.value.replace(re,"");
    if (e.target.value.replace(re,"")=="") {
      this.setState({
        valueNomPartition: e.target.value.toUpperCase(),
      });
    } else {
      this.setState({
        valueNomPartition: e.target.value.substring(0,e.target.value.length-1)
      });
    }
  },

// ******2

  handleChangeTaillePartition(e) {
    this.setState({
      valueTaillePartition: e.target.value
    });
  },

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
          validationState={this.getValidationNomPartition()}
        >
          <ControlLabel>Indiquer le nom de votre nouvelle partition.</ControlLabel>
          <FormControl
            type="text"
            value={this.state.valueNomPartition}
            placeholder="Saisir votre partition"
            onChange={this.handleChangeNomPartition}
          />
          <FormControl.Feedback />
          <HelpBlock>Le nom doit être en majscules, comporter 3 caractères au minimum et 5 caractères au maximum.</HelpBlock>
        </FormGroup>

        <FormGroup
          controlId="formTaillePartition"
          validationState={this.getValidationTaillePartition()}
        >
          <ControlLabel>Indiquer la taille en Go de votre nouvelle partition.</ControlLabel>
          <FormControl
            type="number"
            value={this.state.valueTaillePartition}
            placeholder="Saisir la taille de votre partition"
            onChange={this.handleChangeTaillePartition}
          />
          <FormControl.Feedback />
          <HelpBlock>La taille recommandée est de 1 Go et limitée à 10 Go.</HelpBlock>
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

module.exports = NouvPartitionPanel;

/*
      <Inspector 
        data={newData}
        isExpanded = {this.isExpanded}
        onClick={this.nodeClicked}
        search={false}
      />
*/

