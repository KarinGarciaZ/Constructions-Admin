import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionsCreators from '../../store/actions';
import Form from '../../Components/UI/Form/Form';
import moment from 'moment';
import axios from '../../axios-connection';

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
        valid: true,
        touched: true, 
        value: '',
        elementConfig: {
          type: 'file',
          placeholder: 'Add Pictures',
          multiple: true,
          accept: 'image/*'
        },
        validation: {}
      }
    },
    formName: 'addUser',
    loading: true,
    images: []
  }

  componentDidMount() {
    let today = moment().format("YYYY-MM-DD");

    this.props.onChangeTitle();

    let props = { ...this.state }
    props.formElements.startDate.value = today;
    props.formElements.finishDate.value = today;
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
      this.props.onUpdateFormState( props )
    })
  }

  shouldComponentUpdate( nextProps ) {
    if ( nextProps.formState.formName === 'addUser' && !nextProps.formState.loading)
      return true
    return false
  }

  componentWillUpdate( nextProps ) {
    console.log(nextProps.formState)
    if ( nextProps.formState.formElements.finishDate.valid && nextProps.formState.images.length) {
      let startDate = nextProps.formState.formElements.startDate.value;
      let finishDate = nextProps.formState.formElements.finishDate.value;
      let sd = moment(startDate);
      let fd = moment(finishDate);
      
      if ( sd.isBefore(fd) ) {
        //Save construction
      } else {
        let errorProps = { ...nextProps };
        errorProps.formState.formElements.finishDate.valid = false;
        errorProps.formState.formElements.finishDate.validation.validDate.valid = false;
        this.props.onUpdateFormState( errorProps.formState )
      }
    }    
  }

  onCancel = () => {
    this.props.onUpdateFormState( {} );
    this.props.history.push('/');
  }

  render() {
    return (
      <div className='create-construction-container'>
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
    onChangeTitle: () => dispatch( actionsCreators.changeHeaderTitle('Create a construction') ),
    onUpdateFormState: payload => dispatch( actionsCreators.updateFormState( payload ) )
  }
}

export default connect( mapStateToProps, mapDispatchToProps )(CreateConstruction);