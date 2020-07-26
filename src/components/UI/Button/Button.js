import React from 'react'
import classes from './Button.module.css'

const button = props => {
  return (
    <button
      className={classes.Button}
      type={props.type}
      onClick={props.clicked}
      disabled={props.disabled}
      style={
        props.disabled
          ? {background: 'grey', border: '1px solid grey', cursor: 'not-allowed'}
          : null}>{props.action}</button>
  )
}

export default button