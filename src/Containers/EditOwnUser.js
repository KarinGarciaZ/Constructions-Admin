import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionsCreators from '../store/actions/index';

class EditOwnUser extends Component {

  componentDidMount() {
    this.props.onChangeTitle();
  }
  
  render() {
    return (
      <div>
        EditOwnUser
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onChangeTitle: () => dispatch( actionsCreators.changeHeaderTitle('Edit your profile') )
  }
}

export default connect( null, mapDispatchToProps )(EditOwnUser);