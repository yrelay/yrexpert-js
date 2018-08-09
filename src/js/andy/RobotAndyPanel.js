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
//var Inspector = require('react-json-inspector');
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
      partition: 'DMO',
      nameSpace: [],
      isLoading: false
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

  handleSubmit(event) {
    event.preventDefault();
  },

  handleClick() {
    //alert("-----partition: " + JSON.stringify(this.state.partition));
    this.setState({isLoading: true});
    var indice = (new Date()).getTime();
    this.ajouter_nom(this.state.partition);
    this.ajouter_date_creation(this.state.partition);
    this.ajouter_cree_par(this.state.partition);
    this.set_question(this.state.partition, this.state.value, indice);
    this.get_reponse(this.state.partition, indice);

    // C'est probablement là où vous auriez un appel `ajax`
    setTimeout(() => {
      // Achevée d'une action asynchrone, rétablit l'état de chargement
      this.setState({isLoading: false});
      this.setState({ value: '' });
    }, 1000);
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

      <form onSubmit={this.handleSubmit}>

      <div>
        <FormGroup controlId="formControlsSelect">
          <ControlLabel>Choisir votre partition</ControlLabel>
          <FormControl 
              onChange={this.onPickPartition.bind(null, this)}
              inputRef={ el => this.inputEl=el }
              defaultValue={this.props.partition}
              componentClass="select" placeholder="Partition">
            <option value="">Votre partition</option>
            <option value="YXP">YXP</option>
            <option value="DMO">DMO</option>
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
        <Well>{this.reponse && <p>{this.reponse}</p>}</Well>
      </div>

      </form>

      </Panel>
    );
  }
});

module.exports = RobotAndyPanel;



