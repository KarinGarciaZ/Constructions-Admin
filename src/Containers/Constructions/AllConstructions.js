import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionsCreators from '../../store/actions';
import axios from '../../axios-connection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faInfoCircle, faPen } from "@fortawesome/free-solid-svg-icons";
import Input from '../../Components/UI/Form/Input';

class AllConstructions extends Component {

  state = {
    constructions: [],
    originalConstructions: [],
    formElements: {
      title: {
        elementType: 'input',
        value: '',
        elementConfig: {
          type: 'text',
          placeholder: 'Title'
        },
        validation: {}          
      },
      address: {
        elementType: 'input',
        value: '',
        elementConfig: {
          type: 'text',
          placeholder: 'Address'
        },
        validation: {}          
      },
      city: {
        elementType: 'input',
        value: '',
        elementConfig: {
          type: 'text',
          placeholder: 'City'
        },
        validation: {}          
      },
      state: {
        elementType: 'input',
        value: '',
        elementConfig: {
          type: 'text',
          placeholder: 'State'
        },
        validation: {}          
      }
    }
  }

  componentDidMount() {
    this.props.onChangeTitle();
    let TOKEN = localStorage.getItem('userToken');
    axios.get('/construction', {headers: {'Authorization': 'Bearer ' + TOKEN}})
    .then( data => {
      this.setState({constructions: data.data, originalConstructions: data.data})
    } )
  }

  onClickCard = (id) => {
    this.props.history.push('/construction/'+id)
  }

  onClickEdit = (id) => {
    this.props.history.push('/editConstruction/'+id)
  }

  filterConstructions = ( key, event) => {
    let formElements = { ...this.state.formElements }
    let value = event.target.value;    
    let constructions = [ ...this.state.originalConstructions ]

    if ( this.state.formElements.title.value !== '' && key !== 'title' ) {
      constructions = constructions.filter( construction => {
        if ( construction.title.includes(this.state.formElements.title.value) ) 
          return true;
        return false
      })
    }

    if ( this.state.formElements.address.value !== '' && key !== 'address' ) {
      constructions = constructions.filter( construction => {
        if ( construction.address.includes(this.state.formElements.address.value) ) 
          return true;
        return false
      })
    }

    if ( this.state.formElements.city.value !== '' && key !== 'city' ) {
      constructions = constructions.filter( construction => {
        if ( construction.city.includes(this.state.formElements.city.value) ) 
          return true;
        return false
      })
    }

    if ( this.state.formElements.state.value !== '' && key !== 'state' ) {
      constructions = constructions.filter( construction => {
        if ( construction.state.includes(this.state.formElements.state.value) ) 
          return true;
        return false
      })
    }

    constructions = constructions.filter( construction => {
      if ( construction[key].includes(value) || !value )
        return true
      return false
    })

    formElements[key].value = value;
    this.setState({ constructions, formElements })
  }

  render() {

    let arrayInputs = []
    let stateInputs = { ...this.state.formElements }

    for ( let key in stateInputs ) {
      arrayInputs.push({ key, config: stateInputs[key] })
    }

    let search = arrayInputs.map( input => { 
      return(
        <Input key={input.key}
          inputtype={input.config.elementType}
          elementConfig = {input.config.elementConfig}
          value={input.config.value}
          shouldValidate={input.config.validation}
          changed={( event ) => this.filterConstructions(input.key, event)}
        />
      )      
    })   
    
    
    let cards = this.state.constructions.map( construction => {
      let imageUrl = construction.images.filter( image => image.mainImage? true : false )[0].url;
      imageUrl = 'http://localhost:3001/' + imageUrl;
      return (
        <div className='card' key={construction.id}>
          <img className='card__image' src={imageUrl} alt='Construction img'></img>
          <FontAwesomeIcon icon={faPen} className='card__edit' onClick={this.onClickEdit.bind(this, construction.id)}/>
          <h3 className='card__title'>{construction.title}</h3>
          <div className='card__middle'>          
            <FontAwesomeIcon icon={faInfoCircle} className='card__icon'/>
            <div className='card__info'>
              <p>{construction.type.name}</p>
              <p>{construction.statusConstruction}</p>
            </div>
            <FontAwesomeIcon icon={faMapMarkerAlt} className='card__icon'/>
            <div className='card__location'>
              <p>{construction.address}</p>
              <p>{construction.city}</p>
              <p>{construction.state}</p>
            </div>
          </div>          
          <button className='btn card__btn' onClick={this.onClickCard.bind(this, construction.id)}>See Construction</button>
        </div>
      )
    })

    return (
      <div className='all-constructions-container'>
        <div className='cards-main cards-main-1'>
          <div className='search-construction-container'>
            {search}
          </div>
        </div>
        <div className='cards-main cards-main-2'>
          <div className='cards-container'>
            {cards}
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onChangeTitle: () => dispatch( actionsCreators.changeHeaderTitle('All constructions') )
  }
}

export default connect( null, mapDispatchToProps )(AllConstructions);