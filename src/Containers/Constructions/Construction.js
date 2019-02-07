import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import axios from '../../axios-connection';
import * as actionsCreators from '../../store/actions';
import Loading from '../../Components/Layout/Loading';
import Aux from '../../hoc/Auxiliar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from "@fortawesome/free-solid-svg-icons";

class Construction extends Component {

  state = {
    construction: {},
    loading: true
  }

  componentDidMount() {
    this.props.onChangeTitle();
    const id = this.props.match.params.id;
    this.loadConstruction( id )
  }

  loadConstruction( id ) {
    let TOKEN = localStorage.getItem('userToken');
    axios.get('/construction/' + id, {headers: {'Authorization': 'Bearer ' + TOKEN}})
    .then( construction => {
      console.log(construction.data)
      this.setState({ construction: construction.data, loading: false })
    })
    .catch( error => {
      console.log('error: ', error);
    })
  }

  componentWillReceiveProps( nextProps ) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      let id = nextProps.match.params.id
      this.loadConstruction( id );
    }
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

  onClose = () => {
    this.props.history.push('/allConstructions');
  }

  render() {
    let construction = { ...this.state.construction }

    let startMoment = moment(construction.startDate);
    let finishMoment = moment(construction.finishDate);

    let mainImageUrl = ''
    let images = []

    if ( !this.state.loading ) {
      mainImageUrl = construction.images.filter( image => image.mainImage? true : false )[0].url
      mainImageUrl = 'http://localhost:3001/' + mainImageUrl

      images = construction.images.map( image => {
        let classes = ['construction__images--img']
        if (image.mainImage) 
          classes.push('construction__images--img-active')

        return <img 
          className={classes.join(' ')}
          alt='Construction img' 
          src={'http://localhost:3001/' + image.url}
          onMouseEnter={this.changeMainImage.bind(this, image.id)}></img>
      })
    }

    return (
      <Aux>
        { (!this.state.loading)?
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
              <p className='description'>{construction.description}</p>
            </div>

            <div className='construction__buttons'>
              <button className='btn btn-cancel'>Delete</button>
              <button className='btn btn-edit'>Edit</button>
            </div>

          </div>
        </div> 
        : <Loading /> }
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