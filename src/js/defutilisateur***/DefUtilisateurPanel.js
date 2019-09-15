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
  Button,
  Panel,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock
} = ReactBootstrap

var DefUtilisateurPanel = createReactClass({

  componentWillMount: function () {
    this.controller = require('./controller-DefUtilisateurPanel')(this.props.controller, this)

    this.title = (
      <h1>Nouvelle partition</h1>
    )
  },

  // *******

  getInitialState () {
    return {
      valueWHOIS: 'DMO',
      valueBACK: 'GENERAL',
      valueENTETE: 'DEMO',
      valueMACHINE: 'DMO',
      valueNOM: 'DEMO',
      valuePASS: 'DMO',
      valuePRINTER: '30',
      valueSITE: '1',
      valueSTART: 'GENERAL',
      valueTABLETRAC: '30',
      valueTYPETABLE: 'HP-KYO',
      valueECRANGRAP: '0',
      valueTYPEECRAN: 'TEKTRO-4014',
      valueIMPRCOUR: '66',
      valueORDINATEUR: 'IBM-PC',
      valueLANGAGE: 'M11',
      isLoading: false,
      status: 'initial'
    }
  },

  // WHOIS
  getValidationWHOIS () {
    const length = this.state.valueWHOIS.length
    if (length > 5) return 'error'
    else if (length > 3) return 'warning'
    else if (length === 3) return 'success'
  },

  handleChangeWHOIS (e) {
    const re = /[a-zA-Z]/g
    if (e.target.value.replace(re, '') === '') {
      this.setState({
        valueWHOIS: e.target.value.toUpperCase()
      })
    } else {
      this.setState({
        valueWHOIS: e.target.value.substring(0, e.target.value.length - 1)
      })
    }
  },

  // ******2

  handleClick () {
    this.setState({ isLoading: true })
    this.refresh()

    // This probably where you would have an `ajax` call
    setTimeout(() => {
      // Completed of async action, set loading state back
      this.setState({ isLoading: false })
    }, 2000)
  },
  /*
  componentDidUpdate: function() {

    //console.log('status: ' + this.state.status);
    var that = this;

    setTimeout(function() {
      $('.json-inspector__leaf').each(function(ix, item) {
        var id = $(item).attr('id');
        var name = id.split('root.')[1];
        if (!name) {
          $(item).find('span.json-inspector__key').first().hide();
          $(item).find('span.json-inspector__value').first().hide();
        }
        else if (name.indexOf('.') === -1 && that.data[name]) {
          $(item).find('span.json-inspector__key').first().addClass('json-inspector__docName');
        }
      });
    }, 100);
  },
*/
  // ******

  componentWillReceiveProps: function (newProps) {
    this.onNewProps(newProps)
  },

  render: function () {
    // var componentPath = this.controller.updateComponentPath(this);

    /**
     * @todo Améliorer le test sur laille de la partition
     * @todo La taille ne doit pas excéder 50% de la taille disponible en local
    */

    function FieldGroup ({ id, validation, label, help, ...props }) {
      return (
        <FormGroup controlId={id} validationState={validation}>
          <ControlLabel>{label}</ControlLabel>
          <FormControl {...props} />
          <FormControl.Feedback />
          {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
      )
    }

    const isLoading = this.state.isLoading

    // Créer un clone de données pour assurer un nouveau rendu
    if (this.data) {
      var newData = {}
      Object.assign(newData, this.data)
    }

    return (
      <Panel
        collapsible
        expanded={this.expanded}
        header={this.title}
        bsStyle='primary'
      >

        <form>

          <FieldGroup
            id='formWHOIS'
            validation={this.getValidationWHOIS()}
            type='text'
            label="WHOIS : Indiquer le nom de l'utilisateur."
            placeholder="Saisir l'utilisateur."
            value={this.state.valueWHOIS}
            help='Le nom doit être en majscules, comporter des lettres ou des nombres, le point est autorisé comme séparateur.'
            onChange={this.handleChangeWHOIS}
          />

        </form>

        <Button
          bsStyle='primary'
          disabled={isLoading}
          onClick={!isLoading ? this.handleClick : null}
        >
          {isLoading ? 'En traitement...' : 'Soumettre'}
        </Button>

      </Panel>
    )
  }
})

module.exports = DefUtilisateurPanel

/*
      <Inspector
        data={newData}
        isExpanded = {this.isExpanded}
        onClick={this.nodeClicked}
        search={false}
      />
*/

/*
        <FormGroup
          controlId="formWHOIS"
          validationState={this.getValidationWHOIS()}
        >
          <ControlLabel>WHOIS : Indiquer nom de l'utisateur.</ControlLabel>
          <FormControl
            type="text"
            value={this.state.valueWHOIS}
            placeholder="Saisir le nom"
            onChange={this.handleChangeWHOIS}
          />
          <FormControl.Feedback />
          <HelpBlock>Le nom doit être en majscules, comporter des lettres ou des nombres, le point est autorisé comme séparateur.</HelpBlock>
        </FormGroup>

*/

/*
        <FieldGroup
          id="formWHOIS"
          validationState={this.getValidationWHOIS()}
          type="text"
          label="WHOIS : Indiquer le nom de l'utilisateur."
          placeholder="Saisir l'utilisateur."
          value={this.state.valueWHOIS}
          help="Le nom doit être en majscules, comporter des lettres ou des nombres, le point est autorisé comme séparateur."
          onChange={this.handleChangeWHOIS}
        />
        <FieldGroup
          id="formBACK"
          type="text"
          label="BACK : Indiquer le nom du menu de retour."
          placeholder="Saisir le menu."
          value={this.state.valueBACK}
        />
        <FieldGroup
          id="formENTETE"
          type="text"
          label="ENTETE : Indiquer l'entête de la partition ou du service."
          placeholder="Saisir l'entête."
          value={this.state.valueENTETE}
        />
        <FieldGroup
          id="formMACHINE"
          type="text"
          label="MACHINE : Indiquer le nom de la partition ou du service."
          placeholder="Saisir la partition."
          value={this.state.valueMACHINE}
        />
        <FieldGroup
          id="formNOM"
          type="text"
          label="Text"
          placeholder="Enter text."
          value={this.state.valueNOM}
        />
        <FieldGroup
          id="formPASS"
          type="text"
          label="PASS : Indiquer le mot de passe de la partition ou du service."
          placeholder="Saisir le mot de passe."
          value={this.state.valuePASS}
        />
        <FieldGroup
          id="formPRINTER"
          type="number"
          label="PRINTER : Indiquer le N° de l'imprimante."
          placeholder="Saisir l'imprimante."
          value={this.state.valuePRINTER}
        />
        <FieldGroup
          id="formSITE"
          type="number"
          label="SITE : Indiquer le N° du site."
          placeholder="Saisir le site."
          value={this.state.valueSITE}
        />
        <FieldGroup
          id="formSTART"
          type="text"
          label="START : Indiquer le nom du menu au démarrage."
          placeholder="Saisir le menu."
          value={this.state.valueSTART}
        />
        <FieldGroup
          id="formTABLETRAC"
          type="text"
          label="TABLETRAC : Indiquer le nom du menu au démarrage."
          placeholder="Saisir le menu."
          value={this.state.valueTABLETRAC}
        />
        <FieldGroup
          id="formTYPETABLE"
          type="text"
          label="TYPETABLE : Indiquer le nom du menu au démarrage."
          placeholder="Saisir le menu."
          value={this.state.valueTYPETABLE}
        />
        <FieldGroup
          id="formECRANGRAP"
          type="text"
          label="ECRANGRAP : Indiquer le nom du menu au démarrage."
          placeholder="Saisir le menu."
          value={this.state.valueECRANGRAP}
        />
        <FieldGroup
          id="formTYPEECRAN"
          type="text"
          label="TYPEECRAN : Indiquer le nom du menu au démarrage."
          placeholder="Saisir le menu."
          value={this.state.valueTYPEECRAN}
        />
        <FieldGroup
          id="formIMPRCOUR"
          type="text"
          label="IMPRCOUR : Indiquer le nom du menu au démarrage."
          placeholder="Saisir le menu."
          value={this.state.valueIMPRCOUR}
        />
        <FieldGroup
          id="formORDINATEUR"
          type="text"
          label="ORDINATEUR : Indiquer le nom du menu au démarrage."
          placeholder="Saisir le menu."
          value={this.state.valueORDINATEUR}
        />
        <FieldGroup
          id="formLANGAGE"
          type="text"
          label="LANGAGE : Indiquer le langage utilisé."
          placeholder="Saisir le langage."
          value={this.state.valueLANGAGE}
        />
*/
