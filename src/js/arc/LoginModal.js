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
  Modal,
  ModalTrigger,
  OverlayMixin
} = ReactBootstrap;

var LoginField = require('./LoginField');

var LoginModal = React.createClass({

  componentWillMount: function() {
    this.controller = require('./controller-LoginModal')(this.props.controller, this);
  },

  render: function() {

    //console.log('LoginModal rendering');
    //var componentPath = this.controller.updateComponentPath(this);

    return (

        <Modal
          show={this.props.show}
          backdrop='static'
          bsStyle='primary' 
          animation={true} 
          onKeyPress={this.handleKeyDown}
        >

          <Modal.Header>
            <Modal.Title>Mot de passe</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <LoginField
              placeholder='Entrez le mot de passe administrateur'
              fieldname='password'
              label='Mot de passe administrateur' 
              controller = {this.controller}
              focus={true}
            />
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.handleLogin} bsStyle='primary'>Se connecter</Button>
          </Modal.Footer>

        </Modal>

    )
  }
});

module.exports = LoginModal;


