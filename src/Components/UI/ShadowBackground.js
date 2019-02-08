import React from 'react'

const shadowBackground = (props) => {
  let classes = ['shadow-background'];
  classes.push(props.classes)
  return (
    <div className={classes.join(' ')}>      
    </div>
  )
}

export default shadowBackground