import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionsCreators from '../../store/actions';
import Form from '../../Components/UI/Form/Form';
import axios from '../../axios-connection';

class EditService extends Component {

  state = {
    formElements: {
      addPictures: {
        elementType: 'input',
        valid: true,
        touched: true, 
        value: '',
        elementConfig: {
          type: 'file',
          placeholder: 'Add a Picture (Max Size 5MB)',
          multiple: false,
          accept: 'image/*'
        },
        validation: {
          maxSize: {
            valid: true,
            errorMessage: "This picture is larger than 5MB."
          },
          required: {
            valid: true,
            errorMessage: 'Upload 1 picture.'
          },
          isImage: {
            valid: true,
            errorMessage: 'This is not an image.'
          }
        }
      },
      name: {
        elementType: 'input',
        valid: true,
        touched: false, 
        value: '',
        elementConfig: {
          type: 'text',
          placeholder: 'Name'
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
            value: 2000,
            errorMessage: 'Max length is 2000 characters.'
          }
        }
      }    
    },
    formName: 'editService',
    loading: true,
    image: null
  }

  componentDidMount() {
    this.props.onChangeTitle();

    this.getService()
  }

  getService = () => {
    let props = { ...this.state };
    let id = this.props.match.params.id
    axios.get( 'service/' + id )
    .then( service => {
      props.image = 'http://localhost:3001/' + service.data.image;
      props.formElements.name.value = service.data.name
      props.formElements.description.value = service.data.description

      this.props.onUpdateFormState( props );
    })
  }

  shouldComponentUpdate( nextProps, nextState ) {
    if ( nextProps.formState.formName === 'editService' && !nextProps.formState.loading)
      return true
    return false
  }

  componentWillUpdate( nextProps, nextState ) {
    let props = { ...nextProps.formState };  
    this.saveService( props )
  }

  saveService = (props) => {
    let newService = {
      id: this.props.match.params.id,
      name: props.formElements.name.value,
      description: props.formElements.description.value
    }
    let image = props.image;

    const formData =  new FormData();
    formData.append( 'serviceData', JSON.stringify(newService) )
    formData.append('image', image.file)

    
    axios.put('/service', formData, { headers: { 'Content-Type': 'multipart/form-data' } } )
    .then( res => {
      this.props.history.push('/all-services');
      this.props.onUpdateFormState( {} )
    } )
    .catch( error => {
      console.log(error.response)
    } )
  }

  onCancel = () => {
    this.props.history.push('/');
  }

  render() {
    return (
      <div className='create-service-container'>
        <div className='form-container'>
          <Form onCancel={this.onCancel} cancelButton={true}/>
        </div>
      </div>
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
    onChangeTitle: () => dispatch( actionsCreators.changeHeaderTitle('Edit a service') ),
    onUpdateFormState: payload => dispatch( actionsCreators.updateFormState( payload ) )
  }
}

export default connect( mapStateToProps, mapDispatchToProps )(EditService);