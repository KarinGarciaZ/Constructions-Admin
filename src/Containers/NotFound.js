import React, { Component } from 'react';
import NotFoundImage from '../Assets/Images/Project/404.jpg';

class NotFound extends Component {
  render() {
    return (
      <div className='not-found-container'>
        <img src={ NotFoundImage } alt='404' className='img-404'/>
      </div>
    )
  }
}

export default NotFound;