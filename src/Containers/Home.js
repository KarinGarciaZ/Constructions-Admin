import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionsCreators from '../store/actions/index';
import axios from '../axios-connection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faProjectDiagram, faCity, faTools } from "@fortawesome/free-solid-svg-icons";

class Home extends Component {

  state = {
    counts: {
      services: 0,
      constructions: 0,
      types: 0
    }
  }

  componentDidMount() {
    this.props.onChangeTitle();    
    axios.get( '/service/getCounters')
    .then( res => {
      let counts = { ...this.state.counts }
      counts.services = res.data[0]
      counts.constructions = res.data[1]
      counts.types = res.data[2]

      this.setState({ counts })
    })
  }

  render() {
    return (
      <div className='home'>
        <div className='home-container'>
          <div className='home__count home__count--serv'>
            <FontAwesomeIcon icon={faTools} className='home__count--icon'/>
            <span className='home__count--name'>Services</span>
            <span className='home__count--count'>{this.state.counts.services}</span>
          </div>  
          <div className='home__count home__count--const'>
            <FontAwesomeIcon icon={faCity} className='home__count--icon'/>
            <span className='home__count--name'>Constructions</span>
            <span className='home__count--count'>{this.state.counts.constructions}</span>
          </div>  
          <div className='home__count home__count--type'>
            <FontAwesomeIcon icon={faProjectDiagram} className='home__count--icon'/>
            <span className='home__count--name'>Types</span>
            <span className='home__count--count'>{this.state.counts.types}</span>
          </div>   
        </div>              
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onChangeTitle: () => dispatch( actionsCreators.changeHeaderTitle('Home page') )
  }
}

export default connect( null, mapDispatchToProps )(Home);