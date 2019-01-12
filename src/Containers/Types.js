import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionsCreators from '../store/actions/index';

class Types extends Component {

  componentDidMount() {
    this.props.onChangeTitle();
  }

  render() {
    return (
      <div>
        Types
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onChangeTitle: () => dispatch( actionsCreators.changeHeaderTitle('Types controller') )
  }
}

export default connect( null, mapDispatchToProps )(Types);