import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionsCreators from '../../store/actions';

class CreateConstruction extends Component {

  componentDidMount() {
    this.props.onChangeTitle();
  }

  render() {
    return (
      <div>
        CreateConstruction        
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onChangeTitle: () => dispatch( actionsCreators.changeHeaderTitle('Create a construction') )
  }
}

export default connect( null, mapDispatchToProps )(CreateConstruction);