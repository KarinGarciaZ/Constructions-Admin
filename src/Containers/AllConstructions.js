import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionsCreators from '../store/actions/index';

class AllConstructions extends Component {

  componentDidMount() {
    this.props.onChangeTitle();
  }

  render() {
    return (
      <div>
        AllConstructions
      </div>
    )
  }
}



const mapDispatchToProps = dispatch => {
  return {
    onChangeTitle: () => dispatch( actionsCreators.changeHeaderTitle('All constructions') )
  }
}

export default connect( null, mapDispatchToProps )(AllConstructions);