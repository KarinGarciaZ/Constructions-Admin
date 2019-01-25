import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faPlus } from "@fortawesome/free-solid-svg-icons";

import axios from '../axios-connection';
import * as actionsCreators from '../store/actions/index';


class Types extends Component {

  state = {
    types: []
  }

  componentDidMount() {
    this.props.onChangeTitle();
    let TOKEN = localStorage.getItem('userToken');
    axios.get( '/type', { headers: { 'Authorization': 'Bearer ' + TOKEN }} )
    .then( typesRes => {
      let typesUdated = typesRes.data.map(element => {
        element.disable = true;
        return element;
      });
      this.setState({ types: typesUdated })
    })
    .catch( err => console.log( err.response ))
  }

  onEdit = ( typeId ) => {
    let types = [ ...this.state.types ];
    types.forEach( element => {
      if (element.id === typeId) {
        element.disable = !element.disable;
        if ( element.disable )
          this.onUpdate( element )
      }
    })
    this.setState({ types })
  }

  onChangeName = (event, typeId) => {
    let types = [ ...this.state.types ];
    types.forEach( element => {
      if (element.id === typeId)
        element.name = event.target.value;
    })
    this.setState({ types })
  }

  onUpdate = ( type ) => {
    let TOKEN = localStorage.getItem('userToken');
    axios.put( `/type/${type.id}`, { name: type.name }, { headers: { 'Authorization': 'Bearer ' + TOKEN }} )
    .then( resp => {
      console.log(resp)
    })
    .catch( err => {
      console.log(err)
    })
  }

  onCancel = () => {
    this.props.history.push('/');
  }
 
  render() {

    let types = [ ...this.state.types ];

    let headerForm = (
      <div className='types-columns-container'>
        <p><strong>ID</strong></p>
        <p><strong>Type Name</strong></p>
        <p><strong>Edit</strong></p>
      </div>
    )

    let footerForm = (
      <div className='types-columns-container'>
        <button className='btn btn-round'><FontAwesomeIcon icon={faPlus} /></button>
        <p></p>
        <button className='btn btn-cancel' onClick={this.onCancel}>cancel</button>
      </div>
    )

    let typesElements = types.map( type => {
      return(        
        <div className='types-columns-container' key={type.id}>
          <p>{type.id}</p>
          <input 
            value={type.name} 
            className='input' 
            disabled={type.disable} 
            onChange={(event) => this.onChangeName( event, type.id )}
          />
          <button className='btn btn-small btn-edit' onClick={this.onEdit.bind( this, type.id )}>
            { type.disable ? <FontAwesomeIcon icon={faEdit} /> : <FontAwesomeIcon icon={faSave} /> }
          </button>
        </div>
      )
    })

    return (
      <div className='types-container'>
        <div className='form-container'>
          <div className='types-rows-container'>
            { headerForm }
            { typesElements }
            { footerForm }
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onChangeTitle: () => dispatch( actionsCreators.changeHeaderTitle('Types controller') )
  }
}

export default connect( null, mapDispatchToProps )(Types);