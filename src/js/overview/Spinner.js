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
  Button,
  ButtonGroup,
  Glyphicon
} = ReactBootstrap;

var value;

var Spinner = React.createClass({

  getInitialState: function() {
    return {
      status: 'initial'
    }
  },

  componentWillMount: function() {

    value = this.props.value;

    var component = this;

    this.increment = function() {
      value++;
      component.props.changeHandler(value);
      component.setState({
        status: 'update'
      });
    };

    this.decrement = function() {
      if (value > 1) {
        value--;
        component.props.changeHandler(value);
        component.setState({
          status: 'update'
        });
      }
    };
  },  

  componentWillReceiveProps: function(newProps) {
    value = newProps.value;
  },

  render: function() {
    return (

        <ButtonGroup>
          <Button>
           {value}
          </Button>
          <ButtonGroup
            vertical
          >
            <Button 
              bsStyle="default"
              bsSize = "xsmall"
              onClick = {this.increment}
            >
              <Glyphicon 
                glyph="triangle-top"
              />
            </Button>
            <Button 
              bsStyle="default"
              bsSize = "xsmall"
              onClick = {this.decrement}
            >
              <Glyphicon 
                glyph="triangle-bottom"
              />
            </Button>
          </ButtonGroup>
        </ButtonGroup>

    );
  }

});

module.exports = Spinner;




