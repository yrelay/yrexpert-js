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

var {
  Panel,
  FormGroup,
  ControlLabel,
  FormControl
} = ReactBootstrap

var AllerPartitionPanel = createReactClass({

  componentWillMount: function () {
    this.controller = require('./controller-AllerPartitionPanel')(this.props.controller, this)

    this.title = (
      <h1>Choix d'une partition</h1>
    )
  },

  componentWillReceiveProps: function (newProps) {
    this.onNewProps(newProps)
  },

  getInitialState: function () {
    return {
      status: 'initial',
      value: 'YXP'
    }
  },

  onPickPartition (e) {
    // console.log('----- onPickPartition : ', this.inputEl.value);
    this.setState({ partition: this.inputEl.value })
    if (this.inputEl.value !== '') this.choix(this.inputEl.value)
  },

  render: function () {
    // var options = [
    //    { value: 'DMO', label: 'DMO' },
    //    { value: 'YXP', label: 'YXP' }
    // ];
    var options = []
    // var partition = [ 'DMO', 'YXP' ];
    var partition = this.partition
    for (var i = 0; i < partition.length; i++) {
      var items = { value: partition[i].toUpperCase(), label: partition[i].toUpperCase() }
      options.push(items)
    }

    return (
      <Panel
        collapsible
        expanded={this.expanded}
        header={this.title}
        bsStyle='primary'
      >

        <form>

          <div>
            <FormGroup controlId='formControlsSelect'>
              <ControlLabel>Selection</ControlLabel>
              <FormControl
                onChange={this.onPickPartition.bind(null, this)}
                inputRef={el => this.inputEl = el}
                componentClass='select' placeholder='Partition'
              >
                <option value=''>Votre partition</option>
                <option value='YXP'>YXP</option>
                <option value='DMO'>DMO</option>
              </FormControl>
            </FormGroup>
          </div>

          <p />
          {this.state.partition && <p>La partition active est {this.state.partition}</p>}

        </form>
      </Panel>
    )
  }

})

module.exports = AllerPartitionPanel
