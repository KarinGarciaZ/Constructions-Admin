import React, { Component } from 'react';

import axios from '../../axios-connection';

export default class AllServices extends Component {

  state = {
    services: []
  }

  componentDidMount() {
    axios.get( '/service' )
    .then( data => {
      this.setState({ services: data.data })
    })
    .catch( error => console.log(error) )
  }

  render() {

    let services = [ ...this.state.services ];
    let serviceCards = services.map( service => {
      return (
        <div className='services-cards__card'> 
          <img src={'http://localhost:3001/' + service.image}  alt='ser-img'/>
        </div>
      )
    })

    return (
      <div className='all-services-container'>
        <div className='services-cards'> 
          {serviceCards}
        </div>
      </div>
    )
  }
}
