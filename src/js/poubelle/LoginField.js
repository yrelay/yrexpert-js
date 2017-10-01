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
  FormControl
} = ReactBootstrap;

var LoginField = React.createClass({

  getInitialState: function() {
    return {value:''}
  },

  componentWillMount: function() {
    this.controller = require('./controller-LoginField')(this.props.controller, this);
  },

  render: function() {

    //console.log('LoginField rendering');
    //this.controller.updateComponentPath(this);

    return (
     <div> 
      <FormControl
        type='password'
        autoFocus
        value={this.state.value}
        placeholder={this.props.placeholder}
        bsStyle={this.validationState()}
        ref={this.props.fieldname}
        label={this.props.label}
        onChange={this.handleChange}
      />
      <FormControl.Feedback />
     </div>
    )
  }
});

module.exports = LoginField;



