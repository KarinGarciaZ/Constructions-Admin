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
      startDate: {
        elementType: 'input',
        valid: true,
        touched: true, 
        value: '',
        elementConfig: {
          type: 'date',
          placeholder: 'Start Construction Date'
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
          placeholder: 'Finish Construction Date'
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
      statusConstruction: {
        elementType: 'select',
        valid: true,
        touched: true, 
        value: 'Finished',
        options: [
          'Finished',
          'In Progress',
          'Canceled'
        ],
        elementConfig: {
          placeholder: 'Status'
        },
        required: {}
      }
    },
    formName: 'addUser',
    loading: true
  }

  componentDidMount() {
    let today = moment().format("YYYY-MM-DD");

    this.props.onChangeTitle();

    let props = { ...this.state }
    props.formElements.startDate.value = today;
    props.formElements.finishDate.value = today;
    this.props.onUpdateFormState( props )
  }

  shouldComponentUpdate( nextProps ) {
    if ( nextProps.formState.formName === 'addUser' && !nextProps.formState.loading)
      return true
    return false
  }

  componentWillUpdate( nextProps ) {
    if ( nextProps.formState.formElements.finishDate.valid ) {
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