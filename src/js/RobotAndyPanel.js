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
  HelpBlock,
  Well
} = ReactBootstrap;

var RobotAndyPanel = React.createClass({

  componentWillMount: function() {

    this.controller = require('./controller-RobotAndyPanel')(this.props.controller, this);

    this.title = (
      <h1>Robot Andy</h1>
    );
  },

  getInitialState() {
    return {
      status: 'initial',
      value: '',
      partition: '',
      isLoading: false,
      nameSpace: []
    };
  },

  onPickPartition(e){
    //console.log('----- onPickPartition : ', this.inputEl.value);
    this.setState({ partition: this.inputEl.value });
    //if (this.inputEl.value != '') this.choix(this.inputEl.value);
  },

  handleChange (event) {
    this.setState({ value: event.target.value });
  },

  handleClick() {
    //alert("-----partition: " + JSON.stringify(this.state.partition));
    this.setState({isLoading: true});
    this.ajouter_nom(this.state.partition);
    this.ajouter_cree_par(this.state.partition);
    this.question(this.state.partition, this.state.value);
    this.reponse(this.state.partition);

    // This probably where you would have an `ajax` call
    setTimeout(() => {
      // Completed of async action, set loading state back
      this.setState({isLoading: false});
    }, 2000);
    },

  componentWillReceiveProps: function(newProps) {
    this.onNewProps(newProps);
  },

  render: function() {

    //var componentPath = this.controller.updateComponentPath(this);

    /**
     * @todo Améliorer le test sur laille de la partition
     * @todo La taille ne doit pas excéder 50% de la taille disponible en local
    */

    //var options = [
    //    { value: 'DMO', label: 'DMO' },
    //    { value: 'YXP', label: 'YXP' }
    //];
    var options = [];
    //var nameSpace = [ 'DMO', 'YXP' ];
    var nameSpace = this.nameSpace;
    for (var i = 0; i < nameSpace.length; i++) {
        var items = { 'value': nameSpace[i].toUpperCase(), 'label': nameSpace[i].toUpperCase() };
        options.push(items);
    }
    //alert("-----options: " + JSON.stringify(options));

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

      <div>
        <FormGroup controlId="formControlsSelect">
          <ControlLabel>Choisir votre partition</ControlLabel>
          <FormControl 
              onChange={this.onPickPartition.bind(null, this)}
              inputRef={ el => this.inputEl=el }
              componentClass="select" placeholder="Partition">
            <option value="DMO">DMO</option>
            <option value="YXP">YXP</option>
          </FormControl>
        </FormGroup>

      <p></p>
      {this.state.partition && <p>La partition active est {this.state.partition}</p>}

      </div>

      <div>
        <FormGroup
          controlId="formBasicText"
        >
          <ControlLabel>Dialoguer avec Andy.</ControlLabel>
          <FormControl
            type="text"
            value={this.state.value}
            placeholder="Saisir votre question"
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
          <HelpBlock>Posez à Andy votre question et il fera de son mieux pour vous aider.</HelpBlock>
        </FormGroup>

      <Button
        bsStyle="primary"
        disabled={isLoading}
        onClick={!isLoading ? this.handleClick : null}>
        {isLoading ? 'En traitement...' : 'Soumettre'}
      </Button>

      <p></p>
      <Well>{this.reponse}</Well>

      </div>
      </form>
      </Panel>
    );
  }
});

module.exports = RobotAndyPanel;


/*
      <div>
        <FormGroup controlId="formControlsSelect">
          <ControlLabel>Choisir votre partition</ControlLabel>
          <FormControl 
              onChange={this.onPickPartition.bind(null, this)}
              inputRef={ el => this.inputEl=el }
              componentClass="select" placeholder="Partition">
            <option value="">Votre partition</option>
            <option value="YXP">YXP</option>
            <option value="DMO">DMO</option>
          </FormControl>
        </FormGroup>

      <p></p>
      {this.state.partition && <p>La partition active est {this.state.partition}</p>}

      </div>
*/


