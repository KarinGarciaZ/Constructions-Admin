import React, { Component } from 'react'

export default class Footer extends Component {
  render() {
    console.log('RENDER FOOTER');
    return (
      <div className='footer'>
        <p>&copy; Copyright 2019 by
          <a className='footer__autor' href='https://github.com/KarinGarciaZ'> Karin García.</a>
        </p>
      </div>
    )
  }
}
