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
  Image,
  Carousel,
  Media
} = ReactBootstrap;

var AproposPanel = createReactClass({

  getInitialState: function() {
    return {
      status: 'initial',
      index: 0,
      direction: null
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

  handleSelect(selectedIndex, e) {
    //alert(`selected=${selectedIndex}, direction=${e.direction}`);
    this.setState({
      index: selectedIndex,
      direction: e.direction
    });
  },

  render: function() {

    //var componentPath = this.controller.updateComponentPath(this);
    const { index, direction } = this.state;

    return (
      <Panel 
        collapsible 
        expanded={this.expanded} 
        header={this.title}
        bsStyle="primary"
      >

      <Carousel
        activeIndex={index}
        direction={direction}
        onSelect={this.handleSelect}
      >
        <Carousel.Item>
          <img width={1800} height={640} alt="1800*640" src="./images/carousel.jpg"/>
          <Carousel.Caption>
            <h3>Votre Système Expert</h3>
            <p>Comme tous les systèmes experts YRexpert se présente comme une coquille vide qu’il va falloir compléter.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img width={1800} height={640} alt="1800*640" src="./images/carousel2.jpg"/>
          <Carousel.Caption>
            <h3>Licence d’utilisation</h3>
            <p>Vous trouverez le texte de la GNU General Public License Version 3 sur <a href="https://www.gnu.org/" target="_blank">www.gnu.org</a></p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img width={1800} height={640} alt="1800*640" src="./images/carousel3.jpg"/>
          <Carousel.Caption>
            <h3>Mentions légales</h3>
            <p>Le présent logiciel est édité et géré par l'entreprise <a href="https://www.yrelay.fr/" target="_blank">Yrelay</a></p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
 

    <Media>
     <Media.Left>
        <img width={64} height={64} src="./images/yrexpert_logo.png" alt="Image"/>
      </Media.Left>
      <Media.Body>
        <Media.Heading>YRexpert</Media.Heading>

          <p>YRexpert est un Syst&egrave;me Expert libre fonctionnant sous Mumps <a href="http://www.fisglobal.com/products-technologyplatforms-gtm" target="_blank">GT.M</a> et GNU/Linux. <a href="https://www.yrelay.fr/" target="_blank">Yrelay</a> utilise de nombreuses contributions communautaires libres&nbsp;notamment l'application <a href="http://www.mgateway.com/" target="_blank">EWD 3</a>.</p>

      </Media.Body>
    </Media>


      </Panel>
    );
  }
});

module.exports = AproposPanel;



