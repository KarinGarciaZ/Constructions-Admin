import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionsCreators from '../store/actions/index';
import axios from '../axios-connection';

class AllConstructions extends Component {

  componentDidMount() {
    this.props.onChangeTitle();
    const cachedHits = localStorage.getItem('userToken');
    axios.get('/construction', {headers: {authorization: cachedHits}}).then( data => {
      console.log(data)
    } )
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