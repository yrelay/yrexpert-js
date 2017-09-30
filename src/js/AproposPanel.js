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

var {
  Button,
  Glyphicon,
  OverlayTrigger,
  Panel,
  Tooltip,
  Image,
  Carousel,
  Media
} = ReactBootstrap;

var AproposPanel = React.createClass({

  getInitialState: function() {
    return {
      status: 'initial'
    }
  },

  componentWillMount: function() {
    this.controller = require('./controller-AproposPanel')(this.props.controller, this);

    this.title = (
      <h1>A propos</h1>
    );
  },

  componentWillReceiveProps: function(newProps) {
    this.onNewProps(newProps);
  },

  render: function() {

    //var componentPath = this.controller.updateComponentPath(this);

    return (
      <Panel 
        collapsible 
        expanded={this.expanded} 
        header={this.title}
        bsStyle="primary"
      >

      <Carousel activeIndex={this.state.index} direction={this.state.direction} onSelect={this.handleSelect}>
        <Carousel.Item>
          <img width={1800} height={640} alt="900x500" src="./images/carousel.jpg"/>
          <Carousel.Caption>
            <h3>Votre Système Expert libre</h3>
            <p>Comme tous les systèmes experts Yexpert se présente comme une coquille vide qu’il va falloir compléter.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img width={1800} height={640} alt="900x500" src="./images/carousel2.jpg"/>
          <Carousel.Caption>
            <h3>...</h3>
            <p>...</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img width={1800} height={640} alt="900x500" src="./images/carousel3.jpg"/>
          <Carousel.Caption>
            <h3>...</h3>
            <p>...</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
 

    <Media>
     <Media.Left>
        <img width={64} height={64} src="./images/yexpert_logo.png" alt="Image"/>
      </Media.Left>
      <Media.Body>
        <Media.Heading>Yexpert</Media.Heading>

          <p>Yexpert est un Syst&egrave;me Expert libre fonctionnant sous Mumps <a href="http://www.fisglobal.com/products-technologyplatforms-gtm" target="_blank">GT.M</a> et GNU/Linux. <a href="https://www.yrelay.fr/" target="_blank">Yrelay</a> utilise de nombreuses contributions communautaires libres&nbsp;notamment l'application <a href="http://www.mgateway.com/" target="_blank">EWD 3</a>.</p>

      </Media.Body>
    </Media>


      </Panel>
    );
  }
});

module.exports = AproposPanel;



