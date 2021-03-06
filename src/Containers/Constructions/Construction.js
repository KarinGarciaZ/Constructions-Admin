import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import axios from '../../axios-connection';
import * as actionsCreators from '../../store/actions';
import Loading from '../../Components/Layout/Loading';
import Aux from '../../hoc/Auxiliar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Modal from '../../Components/UI/Modal';
import ShadowBackground from '../../Components/UI/ShadowBackground';

class Construction extends Component {

  state = {
    construction: {},
    loading: true,
    showAll: false,
    showModal: false
  }

  componentDidMount() {
    this.props.onChangeTitle();
    const id = this.props.match.params.id;
    this.loadConstruction( id )
  }

  componentWillReceiveProps( nextProps ) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      let id = nextProps.match.params.id
      this.loadConstruction( id );
    }
  }

  loadConstruction( id ) {    
    axios.get('/construction/' + id)
    .then( construction => {
      this.setState({ construction: construction.data, loading: false })
    })
    .catch( error => {      
      console.log('error: ', error.response);
      this.pageNotFound()
    })
  }

  pageNotFound = () => {    
    this.props.history.replace('/not-found')
  }

  deleteConstruction = ( id ) => {
    
    axios.delete('/construction/' + id)
    .then( data =>{
      this.onClose();
    })
    .catch( error => {
      console.log('error: ', error.response);
    })
  }

  changeMainImage = ( id ) => {
    let construction = { ...this.state.construction }
    construction.images.forEach(image => {
      if (image.id === id)
        image.mainImage = 1
      else 
        image.mainImage = 0
    });

    this.setState({construction})
  }

  onShowMore = () => {
    this.setState({showAll: true})
  }

  onToggleModal = () => {
    this.setState(state => {
      return { showModal: !state.showModal }
    })
  }

  onClose = () => {
    this.props.history.push('/all-constructions');
  }
  
  onClickEdit = (id) => {
    this.props.history.push('/edit-construction/'+id)
  }

  pageNotFound = () => {    
    this.props.history.replace('/not-found')
  }

  render() {
    let construction = { ...this.state.construction }

    let startMoment = moment(construction.startDate);
    let finishMoment = moment(construction.finishDate);

    let mainImageUrl = ''
    let images = []
    let description = ''

    let showMoreButton = <button className='btn-link' onClick={this.onShowMore}>Show more...</button>;

    if ( !this.state.loading && this.state.construction ) {
      description = construction.description;
      mainImageUrl = construction.images.filter( image => image.mainImage? true : false )[0].url

      if ( !this.state.showAll && description.length > 1000) 
        description = description.substring(0, 1000);      

      images = construction.images.map( image => {
        let classes = ['construction__images--img']
        if (image.mainImage) 
          classes.push('construction__images--img-active')

        return <img 
          className={classes.join(' ')}
          alt='Construction img' 
          src={image.url}
          onMouseEnter={this.changeMainImage.bind(this, image.id)}
          key={image.id}></img>
      })
    }

    return (
      <Aux>
        { (!this.state.loading && this.state.construction)?
        <div className='construction-container'>
          <div className='construction'>
            <FontAwesomeIcon icon={faTimes} className='construction__close' onClick={this.onClose}/>
            <h3 className='construction__title'>{construction.title}</h3>
            <div className='construction__type'>
              <p>Type</p>
              <p className='info'>{construction.type.name}</p>
            </div>
            <div className='construction__status'>
              <p>Status</p>
              <p className='info'>{construction.statusConstruction}</p>
            </div>
            <div className='construction__location'>
              <p>Location</p>
              <p className='location'>{construction.address}</p>
              <p className='location'>{construction.city}, {construction.state}.</p>
            </div>
            <div className='construction__period'>
              <p>Period</p>
              <p className='info'>{startMoment.format('MM/DD/YYYY')} - {finishMoment.format('MM/DD/YYYY')}</p>
            </div>

            <div className='construction__image'>
              <img className='construction__image-img' src={mainImageUrl} alt='Construction img'></img>
            </div>

            <div className='construction__images'>
              {images}
            </div>

            <div className='construction__description'>
              <p>Description</p>
              <p className='description'>
                {description}
                { ( !this.state.showAll && construction.description.length > 1000 )? showMoreButton : null}
              </p>
              
            </div>

            <div className='construction__buttons'>
              <button className='btn btn-cancel' onClick={this.onToggleModal}>Delete</button>
              <button className='btn btn-edit' onClick={this.onClickEdit.bind(this, construction.id)}>Edit</button>
            </div>
            
          </div>
          <Aux> 
            { this.state.showModal? 
            <Aux>
              <ShadowBackground classes='dark'/>
              <Modal closeModal={this.onToggleModal} deleteConst={this.deleteConstruction.bind(this, construction.id)}/> 
            </Aux>             
              : null }
          </Aux>
        </div>
        
        : null }
        { ( this.state.loading )? <Loading /> : null }
        { ( !this.state.loading && !this.state.construction )? this.pageNotFound() : null }
      </Aux>
      
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onChangeTitle: () => dispatch( actionsCreators.changeHeaderTitle('A single construction') )
  }
}

export default connect( null, mapDispatchToProps )(Construction);