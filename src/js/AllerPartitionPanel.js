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
var ReactBootstrap = require('react-bootstrap');
var Inspector = require('react-json-inspector');
var Select = require('react-select');

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

var AllerPartitionPanel = React.createClass({

  componentWillMount: function() {
    this.controller = require('./controller-AllerPartitionPanel')(this.props.controller, this);

    this.title = (
      <h1>Choix d'une partition</h1>
    );
  },

  componentWillReceiveProps: function(newProps) {
    this.onNewProps(newProps);
  },

  getInitialState: function() {
    return {
      status: 'initial',
    }
  },

  updateValue (newValue) {
    //console.log('State changed to ' + newValue);
    this.setState({
      selectValue: newValue
    });
  if (newValue != '') this.choix(newValue);
  },

  render: function() {

    //var options = [
    //    { value: 'DMO', label: 'DMO' },
    //    { value: 'YXP', label: 'YXP' }
    //];
    var options = [];
    //var partition = [ 'DMO', 'YXP' ];
    var partition = this.partition;
    for (var i = 0; i < partition.length; i++) {
        var items = { 'value': partition[i].toUpperCase(), 'label': partition[i].toUpperCase() };
        options.push(items);
    }

    return (
      <Panel 
        collapsible 
        expanded={this.expanded} 
        header={this.title}
        bsStyle="primary"
      >

      <form>


       <Select
            ref="stateSelect"
            autofocus
            options={options}
            simpleValue
            clearable={this.state.clearable}
            name="selected-state"
            disabled={this.state.disabled}
            value={this.state.selectValue}
            onChange={this.updateValue}
            searchable={this.state.searchable}
        />
      
      <p></p>
      {this.state.selectValue && <p>La partition active est {this.state.selectValue}</p>}

      </form>
      </Panel>
    );
  }

});

module.exports = AllerPartitionPanel;



