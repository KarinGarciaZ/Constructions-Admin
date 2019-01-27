import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionsCreators from '../../store/actions';

class Construction extends Component {

  componentDidMount() {
    this.props.onChangeTitle();
  }

  render() {
    return (
      <div>
        Construction
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onChangeTitle: () => dispatch( actionsCreators.changeHeaderTitle('A single construction') )
  }
}

export default connect( null, mapDispatchToProps )(Construction);