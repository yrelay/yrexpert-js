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

var {
  form,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Checkbox
} = ReactBootstrap;

var LoginRpcField = React.createClass({

  getInitialState: function() {
    return {
      value: '',
      valueAc: '',
      valueVc: ''
    };
  },

  componentWillMount: function() {
    this.controller = require('./controller-LoginRpcField')(this.props.controller, this);
  },

  render: function() {

    //console.log('LoginRpcField rendering');
    //this.controller.updateComponentPath(this);

    return (
      <div> 
        <form>
          <FormGroup
            controlId="formAc"
          >
          <ControlLabel>{this.props.labelAc}</ControlLabel>
          <FormControl
            type='text'
            autoFocus={this.props.focusAc}
            value={this.state.valueAc}
            placeholder={this.props.placeholderAc}
            bsStyle='primary'
            ref={this.props.fieldnameAc}
            onChange={this.handleChangeAc}
          />
          <FormControl.Feedback />
          <HelpBlock></HelpBlock>
          </FormGroup>

          <FormGroup
            controlId="formVc"
          >
          <ControlLabel>{this.props.labelVc}</ControlLabel>
          <FormControl
            type='password'
            autoFocus={this.props.focusVc}
            value={this.state.valueVc}
            placeholder={this.props.placeholderVc}
            bsStyle='primary'
            ref={this.props.fieldnameVc}
            onChange={this.handleChangeVc}
          />
          <FormControl.Feedback />
          <HelpBlock></HelpBlock>
          </FormGroup>

        </form>

     </div>
    )
  }
});

module.exports = LoginRpcField;

// Votre code d'accès est habituellement la première lettre du prénom suivi de votre nom.
// Votre code de vérification est celui que vous avez vous-même choisi.



