import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionsCreators from '../store/actions/index';

class EditConstruction extends Component {

  componentDidMount() {
    this.props.onChangeTitle();
  }

  render() {
    return (
      <div>
        EditConstruction
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onChangeTitle: () => dispatch( actionsCreators.changeHeaderTitle('Edit a construction') )
  }
}

export default connect( null, mapDispatchToProps )(EditConstruction);