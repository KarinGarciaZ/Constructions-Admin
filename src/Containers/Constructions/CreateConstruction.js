import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionsCreators from '../../store/actions';
import Form from '../../Components/UI/Form/Form';
import moment from 'moment';
import axios from '../../axios-connection';
import Loading from '../../Components/Layout/Loading';
import Aux from '../../hoc/Auxiliar';

class CreateConstruction extends Component {

  state = {
    formElements: {
      title: {
        elementType: 'input',
        valid: false,
        touched: false, 
        value: '',
        elementConfig: {
          type: 'text',
          placeholder: 'Title'
        },
        validation: {
          required: {
            valid: false,
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
        value: 'Finished',
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
        valid: false,
        touched: false, 
        value: '',
        elementConfig: {
          type: 'text',
          placeholder: 'Description'
        },
        validation: {
          required: {
            valid: false,
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
        valid: false,
        touched: false, 
        value: '',
        elementConfig: {
          type: 'text',
          placeholder: 'Address'
        },
        validation: {
          required: {
            valid: false,
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
        valid: false,
        touched: false, 
        value: '',
        elementConfig: {
          type: 'text',
          placeholder: 'City'
        },
        validation: {
          required: {
            valid: false,
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
        valid: false,
        touched: false, 
        value: '',
        elementConfig: {
          type: 'text',
          placeholder: 'State'
        },
        validation: {
          required: {
            valid: false,
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
        valid: false,
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
    formName: 'createConstruction',
    loading: true,
    images: [],
    showSpinner: false
  }

  componentDidMount() {
    let today = moment().format("YYYY-MM-DD");
    let tomorrow = moment().add(1, 'day').format("YYYY-MM-DD");
    this.props.onChangeTitle();

    let props = { ...this.state }
    props.formElements.startDate.value = today;
    props.formElements.finishDate.value = tomorrow;
    this.getTypes( props )
  }

  getTypes = ( props ) => {
    let TOKEN = localStorage.getItem('userToken');
    axios.get('/type', { headers: { 'Authorization': 'Bearer ' + TOKEN }} )
    .then( data => {
      let types = data.data.map( type => {
        return { id: type.id, name: type.name };
      })
      props.formElements.type.options = types;
      props.formElements.type.value = types[0].id;
      this.setState({showSpinner: false})
      this.props.onUpdateFormState( props )
    })
  }

  shouldComponentUpdate( nextProps, nextState ) {
    if ( nextProps.formState.formName === 'createConstruction' && !nextProps.formState.loading)
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
        this.saveConstruction(props);
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

  saveConstruction = (props) => {
    let mainImageIndex = 0;
    props.images.forEach( (image, index) => mainImageIndex = image.mainImage? index : mainImageIndex);

    let newConstruction = {
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

    const formData =  new FormData();
    formData.append( 'constructionData', JSON.stringify(newConstruction) )
    props.images.forEach( image => formData.append('image', image.file) )

    let TOKEN = localStorage.getItem('userToken');
    axios.post('/construction', formData, { headers: { 'Authorization': 'Bearer ' + TOKEN, 'Content-Type': 'multipart/form-data' } } )
    .then( res => {
      this.props.onUpdateFormState( {} )
      this.props.history.push('/');
    } )
    .catch( error => {
      console.log(error.response)
    } )
  }
  
  onCancel = () => {
    this.props.onUpdateFormState( {} );
    this.props.history.push('/');
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
    onChangeTitle: () => dispatch( actionsCreators.changeHeaderTitle('Create a construction') ),
    onUpdateFormState: payload => dispatch( actionsCreators.updateFormState( payload ) )
  }
}

export default connect( mapStateToProps, mapDispatchToProps )(CreateConstruction);