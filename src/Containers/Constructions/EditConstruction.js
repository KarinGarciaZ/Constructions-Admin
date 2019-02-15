import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import * as actionsCreators from '../../store/actions';
import axios from '../../axios-connection';
import Loading from '../../Components/Layout/Loading';
import Aux from '../../hoc/Auxiliar';
import Form from '../../Components/UI/Form/Form';

class EditConstruction extends Component {

  state = {
    formElements: {
      title: {
        elementType: 'input',
        valid: true,
        touched: false, 
        value: '',
        elementConfig: {
          type: 'text',
          placeholder: 'Title'
        },
        validation: {
          required: {
            valid: true,
            errorMessage: 'This field is required.'
          },
          maxLength: {
            valid: true,
            value: 250,
            errorMessage: 'Max length is 250 characters.'
          }
        }
      },
      statusConstruction: {
        elementType: 'select',
        valid: true,
        touched: true, 
        value: '',
        options: [
          {name:'Finished', id:'Finished'},
          {name:'In Progress', id:'In Progress'},
          {name:'Canceled', id:'Canceled'},
        ],
        elementConfig: {
          placeholder: 'Status'
        },
        required: {}
      },
      type: {
        elementType: 'select',
        valid: true,
        touched: true, 
        value: null,
        options: [],
        elementConfig: {
          placeholder: 'Construction Type'
        },
        required: {}
      },
      startDate: {
        elementType: 'input',
        valid: true,
        touched: true, 
        value: '',
        elementConfig: {
          type: 'date',
          placeholder: 'Start Working Date'
        },
        required: {}
      },
      finishDate: {
        elementType: 'input',
        valid: true,
        touched: true, 
        value: '',
        elementConfig: {
          type: 'date',
          placeholder: 'Finish Working Date'
        },
        validation: {
          validDate: {
            valid: true,
            errorMessage: 'This date should be after than start date.'
          }
        }
      },
      description: {
        elementType: 'textarea',
        valid: true,
        touched: false, 
        value: '',
        elementConfig: {
          type: 'text',
          placeholder: 'Description'
        },
        validation: {
          required: {
            valid: true,
            errorMessage: 'This field is required.'
          },
          maxLength: {
            valid: true,
            value: 10000,
            errorMessage: 'Max length is 10000 characters.'
          }
        }
      },
      address: {
        elementType: 'input',
        valid: true,
        touched: false, 
        value: '',
        elementConfig: {
          type: 'text',
          placeholder: 'Address'
        },
        validation: {
          required: {
            valid: true,
            errorMessage: 'This field is required.'
          },
          maxLength: {
            valid: true,
            value: 250,
            errorMessage: 'Max length is 250 characters.'
          }
        }
      },
      city: {
        elementType: 'input',
        valid: true,
        touched: false, 
        value: '',
        elementConfig: {
          type: 'text',
          placeholder: 'City'
        },
        validation: {
          required: {
            valid: true,
            errorMessage: 'This field is required.'
          },
          maxLength: {
            valid: true,
            value: 250,
            errorMessage: 'Max length is 250 characters.'
          }
        }
      },
      state: {
        elementType: 'input',
        valid: true,
        touched: false, 
        value: '',
        elementConfig: {
          type: 'text',
          placeholder: 'State'
        },
        validation: {
          required: {
            valid: true,
            errorMessage: 'This field is required.'
          },
          maxLength: {
            valid: true,
            value: 250,
            errorMessage: 'Max length is 250 characters.'
          }
        }
      },
      addPictures: {
        elementType: 'input',
        valid: true,
        touched: true, 
        value: '',
        elementConfig: {
          type: 'file',
          placeholder: 'Add Pictures (Max Size 3MB)',
          multiple: true,
          accept: 'image/*'
        },
        validation: {
          maxSize: {
            valid: true,
            errorMessage: "Some pictures weren't uploaded because they are larger then 3MB."
          },
          required: {
            valid: true,
            errorMessage: 'Upload at least 1 picture.'
          },
          isImage: {
            valid: true,
            errorMessage: 'This is not an image.'
          }
        }
      }
    },
    formName: 'editConstruction',
    loading: true,
    images: [],
    showSpinner: false
  }

  componentDidMount() {    
    let id = this.props.match.params.id
    this.getData( id )
  }

  componentWillReceiveProps( nextProps ) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      let id = nextProps.match.params.id
      this.getData( id );
    }
  }

  getData = ( id ) => {
    let props = { ...this.state }

    
    axios.get('/construction/' + id)
    .then( construction => {

      axios.get('/type')
      .then( data => {
        let types = data.data.map( type => {
          return { id: type.id, name: type.name };
        })
        props.formElements.type.options = types;
        props.formElements.type.value = construction.data.typeId;
        props.formElements.title.value = construction.data.title;
        props.formElements.statusConstruction.value = construction.data.statusConstruction;
        props.formElements.startDate.value = moment(construction.data.startDate).format("YYYY-MM-DD");
        props.formElements.finishDate.value = moment(construction.data.finishDate).format("YYYY-MM-DD");
        props.formElements.description.value = construction.data.description;
        props.formElements.address.value = construction.data.address;
        props.formElements.city.value = construction.data.city;
        props.formElements.state.value = construction.data.state;

        props.images = construction.data.images.map( image => {
          image.url = 'http://localhost:3001/' + image.url
          return image
        })
        
        this.setState({showSpinner: false})
        this.props.onUpdateFormState( props )        
        this.props.onChangeTitle();
      })

    })
    .catch( error => {
      console.log('error: ', error);
    })    
  }

  shouldComponentUpdate( nextProps, nextState ) {
    if ( nextProps.formState.formName === 'editConstruction' && !nextProps.formState.loading)
      return true
    return false
  }

  componentWillUpdate( nextProps, nextState ) {
    let errorProps = { ...nextProps };
    if ( nextProps.formState.formElements.finishDate.valid && nextProps.formState.images.length) {
      let startDate = nextProps.formState.formElements.startDate.value;
      let finishDate = nextProps.formState.formElements.finishDate.value;
      let sd = moment(startDate);
      let fd = moment(finishDate);      
      if ( sd.isBefore(fd) ) {
        let props = { ...nextProps.formState };
        this.editConstruction(props);
      } else {
        errorProps.formState.formElements.finishDate.valid = false;
        errorProps.formState.formElements.finishDate.validation.validDate.valid = false;
        this.props.onUpdateFormState( errorProps.formState )
      }
    } else {
      errorProps.formState.formElements.addPictures.valid = false;
      errorProps.formState.formElements.addPictures.validation.required.valid = false;
      this.props.onUpdateFormState( errorProps.formState )
    }    
  }

  editConstruction = (props) => {
    let mainImageIndex = 0;
    props.images.forEach( (image, index) => mainImageIndex = image.mainImage? index : mainImageIndex);

    let constructionEdited = {
      title: props.formElements.title.value,
      description: props.formElements.description.value,
      statusConstruction: props.formElements.statusConstruction.value,
      address: props.formElements.address.value,
      city: props.formElements.city.value,
      state: props.formElements.state.value,
      startDate: props.formElements.startDate.value,
      finishDate: props.formElements.finishDate.value,
      idType: +props.formElements.type.value,
      mainImage: mainImageIndex
    }

    let newImages = props.images.filter( image => image.url.startsWith('data:image/') )
    let id = this.props.match.params.id
    
    const formData =  new FormData();
    formData.append( 'constructionData', JSON.stringify(constructionEdited) )
    newImages.forEach( image => formData.append('image', image.file) )

    let imagesToDelete = { images: props.deletedImages }
    
    
    let prom1 = axios.put('/construction/' + id, formData, { headers: { 'Content-Type': 'multipart/form-data' } } )
    let prom2 = axios.put('/image', imagesToDelete)

    Promise.all([prom1, prom2])
    .then( () => {
      this.props.onUpdateFormState( {} )
      this.props.history.push('/');
    })
    .catch( error => {
      console.log(error.response)
    })    
  }

  render() {
    return (
      <Aux>
        { (!this.state.showSpinner)? 
          <div className='create-construction-container'>
            <div className='form-container'>
              <Form onCancel={this.onCancel} cancelButton={true}/>
            </div>
          </div>
        : <Loading />}
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
    formState: state.formState.form
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onChangeTitle: () => dispatch( actionsCreators.changeHeaderTitle('Edit a construction') ),
    onUpdateFormState: payload => dispatch( actionsCreators.updateFormState( payload ) )
  }
}

export default connect( mapStateToProps, mapDispatchToProps )(EditConstruction);