import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionsCreators from '../../store/actions';
import Form from '../../Components/UI/Form/Form';
import axios from '../../axios-connection';
class CreateService extends Component {

  state = {
    formElements: {
      name: {
        elementType: 'input',
        valid: false,
        touched: false, 
        value: '',
        elementConfig: {
          type: 'text',
          placeholder: 'Name'
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
            value: 3000,
            errorMessage: 'Max length is 3000 characters.'
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
          placeholder: 'Add a Picture (Max Size 5MB)',
          multiple: false,
          accept: 'image/*'
        },
        validation: {
          maxSize: {
            valid: true,
            errorMessage: "Some pictures weren't uploaded because they are larger then 5MB."
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
      }     
    },
    formName: 'createService',
    loading: true,
    image: null
  }

  shouldComponentUpdate( nextProps, nextState ) {
    if ( nextProps.formState.formName === 'createService' && !nextProps.formState.loading)
      return true
    return false
  }

  componentWillUpdate( nextProps, nextState ) {
    let props = { ...nextProps.formState };  
    this.saveService( props )
  }

  saveService = (props) => {
    console.log(props)
    let newService = {
      name: props.formElements.name.value,
      description: props.formElements.description.value
    }
    let image = props.image

    const formData =  new FormData();
    formData.append( 'serviceData', JSON.stringify(newService) )
    formData.append('image', image.file)

    
    axios.post('/service', formData, { headers: { 'Content-Type': 'multipart/form-data' } } )
    .then( res => {
      this.props.history.push('/');
      this.props.onUpdateFormState( {} )
    } )
    .catch( error => {
      console.log(error.response)
    } )
  }

  componentDidMount() {
    this.props.onChangeTitle();

    let props = { ...this.state }
    this.props.onUpdateFormState( props )
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
    onChangeTitle: () => dispatch( actionsCreators.changeHeaderTitle('Create a service') ),
    onUpdateFormState: payload => dispatch( actionsCreators.updateFormState( payload ) )
  }
}

export default connect( mapStateToProps, mapDispatchToProps )(CreateService);