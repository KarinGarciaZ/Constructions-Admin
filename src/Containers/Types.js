import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

import Loading from '../Components/Layout/Loading';
import axios from '../axios-connection';
import * as actionsCreators from '../store/actions/index';
import Aux from '../hoc/Auxiliar';

class Types extends Component {

  state = {
    types: [],
    addType: false,
    newType: {
      name: ''
    }
  }

  componentDidMount() {
    this.getTypes();
  }

  getTypes = () => {
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

  onChangeName = (event, typeId) => {
    let types = [ ...this.state.types ];
    types.forEach( element => {
      if (element.id === typeId)
        element.name = event.target.value;
    })
    this.setState({ types })
  }

  onCancel = () => {
    this.props.history.push('/');
  }

  onToggleAddType = () => {
    this.setState( state => {
      return { addType: !state.addType }
    })
  }

  onSave = () => {
    let name = this.state.newType.name;
    let TOKEN = localStorage.getItem('userToken');
    axios.post( '/type', { name }, { headers: { 'Authorization': 'Bearer ' + TOKEN }} )
    .then( resp => {
      this.onToggleAddType();
      this.getTypes();
      let resetNewType = { ...this.state.newType }
      resetNewType.name = '';
      this.setState({newType: resetNewType})
    })
    .catch( err => {
      console.log(err)
    })
  }

  onChangeNewTypeName = (event) => {
    let newType = { ...this.state.newType };
    newType.name = event.target.value;
    this.setState({ newType });
  }
 
  render() {

    let types = [ ...this.state.types ];
    let newType = { ...this.state.newType }

    let headerForm = (
      <div className='types-columns-container'>
        <p><strong>ID</strong></p>
        <p><strong>Type Name</strong></p>
        <p><strong>Edit</strong></p>
      </div>
    )

    let newTypeForm = null;
    
    if ( this.state.addType )
      newTypeForm = (
        <div className='types-columns-container'>
          <button className='btn btn-round btn-close' onClick={this.onToggleAddType}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <input 
            value={newType.name} 
            className='input input__add' 
            onChange={(event) => this.onChangeNewTypeName( event )}
          />
          <button className='btn btn-small btn-edit' onClick={this.onSave}>
            <FontAwesomeIcon icon={faSave} />
          </button>
        </div>
      )

    let footerForm = (
      <div className='types-columns-container'>
        { !this.state.addType ? <button className='btn btn-round btn-add' onClick={this.onToggleAddType}>
          <FontAwesomeIcon icon={faPlus} />
        </button> : <p></p> }
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
      <Aux>
        { types.length > 0 ? 
          <div className='types-container'>
            <div className='form-container'>
              <div className='types-rows-container'>
                { headerForm }
                { typesElements }
                { newTypeForm }
                { footerForm }
              </div>
            </div>
          </div> 
        : <Loading />}
      </Aux>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onChangeTitle: () => dispatch( actionsCreators.changeHeaderTitle('Types controller') )
  }
}

export default connect( null, mapDispatchToProps )(Types);