import React, { Component } from 'react';
import NotFoundImage from '../Assets/Images/Project/404.jpg';

class NotFound extends Component {
  render() {
    return (
      <div className='not-found-container'>
        <img src={ NotFoundImage } alt='404' className='img-404'/>
        <h2 className='text-404'>404 Error</h2>
        <p className='not-found'>Item Not Found</p>
      </div>
    )
  }
}

export default NotFound;