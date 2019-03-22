import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEye, faPen } from "@fortawesome/free-solid-svg-icons";

import axios from '../../axios-connection';
import Modal from '../../Components/UI/Modal';
import ServiceModal from '../../Components/UI/ServiceModal';
import ShadowBackground from '../../Components/UI/ShadowBackground';
import Aux from '../../hoc/Auxiliar';

export default class AllServices extends Component {

  state = {
    services: [],
    showDeleteModal: false,
    idToDelete: null,
    showShowModal: false,
    idToShow: null,
    serviceToShow: {}
  }

  componentDidMount() {
    this.getServices();
  }

  getServices = () => {
    axios.get( '/service' )
    .then( data => {
      this.setState({ services: data.data })
    })
    .catch( error => console.log(error) )
  }

  onToggleDeleteModal = (id) => {
    this.setState(state => {
      return { showDeleteModal: !state.showDeleteModal, idToDelete: id }
    })
  }

  onToggleShowModal = (id) => {
    let service = {}
    let services = [ ...this.state.services ]

    if( id ) {
      service = services.filter( service => service.id === id )[0]
    }

    this.setState(state => {
      return { showShowModal: !state.showShowModal, idToShow: id, serviceToShow: service }
    })
  }

  onTrashClick = ( ) => {
    let id = this.state.idToDelete;
    axios.delete( '/service/' + id )
    .then( () => {
      this.onToggleDeleteModal()
      this.getServices()
    })
    .catch( error => console.log(error) )
  }

  onEyeClick = () => {
    this.props.history.push()
  }

  render() {
    let service = { ...this.state.serviceToShow }
    let services = [ ...this.state.services ];
    let serviceCards = services.map( service => {
      return (
        <div className='services-cards__card' key={service.id}> 
          <img src={'http://localhost:3001/' + service.image}  alt='ser-img'/>
          <p className='services-cards__card--name'>{service.name}</p>
          <div className='services-cards__card--icons'>
            <FontAwesomeIcon icon={faTrash} className='services-cards__card--icons-trash' onClick={this.onToggleDeleteModal.bind(this, service.id)}/>
            <FontAwesomeIcon icon={faPen} className='services-cards__card--icons-pen' onClick={this.onToggleShowModal.bind(this, service.id)}/>
            <FontAwesomeIcon icon={faEye} className='services-cards__card--icons-eye'/>
          </div>         
        </div>
      )
    })

    return (
      <div className='all-services-container'>
        <div className='services-cards'> 
          {serviceCards}
          { this.state.showDeleteModal? <Aux>
            <ShadowBackground classes='dark'/>
            <Modal closeModal={this.onToggleDeleteModal.bind(this, 0)} deleteConst={this.onTrashClick.bind(this)}/> 
          </Aux> : null}  
          { this.state.showShowModal? <Aux>
            <ShadowBackground classes='dark'/>
            <ServiceModal closeModal={this.onToggleShowModal.bind(this, 0)} service={service}/> 
          </Aux> : null}  
        </div>
      </div>
    )
  }
}
