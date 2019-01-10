import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionsCreators from '../store/actions/index';

class AddUser extends Component {

  componentDidMount() {
    this.props.onChangeTitle();
  }

  render() {
    
    return (
      <div>
        AddUser
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onChangeTitle: () => dispatch( actionsCreators.changeHeaderTitle('Add a new User') )
  }
}

export default connect( null, mapDispatchToProps )(AddUser);