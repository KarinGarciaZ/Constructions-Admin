import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionsCreators from '../../store/actions';
import axios from '../../axios-connection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faInfoCircle, faPen } from "@fortawesome/free-solid-svg-icons";
import Input from '../../Components/UI/Form/Input';
import Loading from '../../Components/Layout/Loading';
import Aux from '../../hoc/Auxiliar';

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
      },
      statusConstruction: {
        elementType: 'select',
        valid: true,
        touched: true, 
        value: '',
        options: [
          {name:'', id:''},
          {name:'Finished', id:'Finished'},
          {name:'In Progress', id:'In Progress'}
        ],
        elementConfig: {
          placeholder: 'Construction Status'
        },
        required: {}
      },
      type: {
        elementType: 'select',
        valid: true,
        touched: true, 
        value: 0,
        options: [],
        elementConfig: {
          placeholder: 'Construction Type'
        },
        required: {}
      }
    },
    loading: true
  }

  componentDidMount() {
    this.props.onChangeTitle();
    
    axios.get('/construction')
    .then( data => {
      this.setState({constructions: data.data, originalConstructions: data.data})
    })

    axios.get('/type')
    .then( data => {
      let formElements = { ...this.state.formElements }
      let types = [ ...data.data ]
      let options = []
      options = types.map( type => {
        return  { name: type.name, id: type.id }  
      })
      options.unshift({ name: '', id: 0 })
      formElements.type.options = options
      this.setState({formElements, loading: false})
    })
  }

  onClickCard = (id) => {
    this.props.history.push('/construction/'+id)
  }

  onClickEdit = (id) => {
    this.props.history.push('/edit-construction/'+id)
  }

  filterConstructions = ( key, event) => {
    let formElements = { ...this.state.formElements }
    let value = event.target.value;    
    let constructions = [ ...this.state.originalConstructions ]

    if ( this.state.formElements.title.value !== '' && key !== 'title' ) {
      constructions = constructions.filter( construction => {
        if ( construction.title.toLowerCase().includes(this.state.formElements.title.value.toLowerCase()) ) 
          return true;
        return false
      })
    }

    if ( this.state.formElements.address.value !== '' && key !== 'address' ) {
      constructions = constructions.filter( construction => {
        if ( construction.address.toLowerCase().includes(this.state.formElements.address.value.toLowerCase()) ) 
          return true;
        return false
      })
    }

    if ( this.state.formElements.city.value !== '' && key !== 'city' ) {
      constructions = constructions.filter( construction => {
        if ( construction.city.toLowerCase().includes(this.state.formElements.city.value.toLowerCase()) ) 
          return true;
        return false
      })
    }

    if ( this.state.formElements.state.value !== '' && key !== 'state' ) {
      constructions = constructions.filter( construction => {
        if ( construction.state.toLowerCase().includes(this.state.formElements.state.value.toLowerCase()) ) 
          return true;
        return false
      })
    }

    if ( this.state.formElements.statusConstruction.value !== '' && key !== 'statusConstruction' ) {
      constructions = constructions.filter( construction => {
        if ( construction.statusConstruction.toLowerCase().includes(this.state.formElements.statusConstruction.value.toLowerCase()) ) 
          return true;
        return false
      })
    }
    if ( key === 'type' ) value = +value
    if ((this.state.formElements.type.value !== 0 && key !== 'type') || (key === 'type' && +value !== 0)) {      
      let typeValue = ( key === 'type' )? value : this.state.formElements.type.value
      constructions = constructions.filter( construction => {
        if ( construction.typeId === typeValue ) 
          return true;
        return false
      })
    }

    if ( key !== 'type' )
      constructions = constructions.filter( construction => {
        if ( construction[key].toLowerCase().includes(value.toLowerCase()) || !value )
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
          options={input.config.options}
        />
      )      
    })   
    
    
    let cards = this.state.constructions.map( construction => {
      let imageUrl = construction.images.filter( image => image.mainImage? true : false )[0].url;
      imageUrl = 'https://murmuring-eyrie-84778.herokuapp.com/' + imageUrl;
      return (
        <div className='card' key={construction.id}>
          <img className='card__image' src={imageUrl} alt='Construction img'></img>
          <FontAwesomeIcon icon={faPen} className='card__edit' onClick={this.onClickEdit.bind(this, construction.id)}/>
          <h3 className='card__title'>{construction.title}</h3>
          <div className='card__middle'>          
            <FontAwesomeIcon icon={faInfoCircle} className='card__icon'/>
            <div className='card__info'>
              <p>Type: {construction.type.name}</p>
              <p>Status: {construction.statusConstruction}</p>
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
      <Aux>
        { (!this.state.loading)? 
          <div className='all-constructions-container'>
            <div className='cards-main cards-main-1'>
              <div className='search-construction-container'>
                <p className='search-title'>Filter Constructions By:</p>
                {search}
              </div>
            </div>
            <div className='cards-main cards-main-2'>
              <div className='cards-container'>
                {cards}
              </div>
            </div>
          </div> : <Loading />
        }
      </Aux>     
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onChangeTitle: () => dispatch( actionsCreators.changeHeaderTitle('All constructions') )
  }
}

export default connect( null, mapDispatchToProps )(AllConstructions);