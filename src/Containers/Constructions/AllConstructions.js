import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionsCreators from '../../store/actions';
import axios from '../../axios-connection';
import Aux from '../../hoc/Auxiliar';
import house from '../../Assets/Images/Project/house.jpeg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

class AllConstructions extends Component {

  state = {
    constructions: []
  }

  componentDidMount() {
    this.props.onChangeTitle();
    let TOKEN = localStorage.getItem('userToken');
    axios.get('/construction', {headers: {'Authorization': 'Bearer ' + TOKEN}})
    .then( data => {
      this.setState({constructions: data.data})
    } )
  }

  render() {
    console.log(this.state)

    let cards = this.state.constructions.map( construction => {
      return (
        <div className='card' key={construction.id}>
          <img className='card__image' src={house}></img>
          <h3 className='card__title'>{construction.title}</h3>
          <div className='card__info'>
            <FontAwesomeIcon icon={faInfoCircle} className='card__icon'/>
            <p>{construction.statusConstruction}</p>
            <p>{construction.type.name}</p>
          </div>
          <div className='card__location'>
            <FontAwesomeIcon icon={faMapMarkerAlt} className='card__icon'/>
            <p>{construction.address}</p>
            <p>{construction.city}</p>
            <p>{construction.state}</p>
          </div>
          <button className='btn card__btn'>See Construction</button>
        </div>
      )
    })

    return (
      <div className='all-constructions-container'>
        <div className=''>
        dfdsfds
        </div>
        <div className='cards-main'>
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