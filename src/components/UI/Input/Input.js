import React from 'react'
import classes from './Input.module.css'

const input = props => {
  const errorMessageClass = props.showError ? classes.show : classes.hide

  return (
    <div className={classes.Input}>
      <label
        style={props.showError ? {color: '#ff0000'} : null}>{props.label}</label>
      <input
        style={props.showError ? {borderColor: '#ff0000'} : null}
        value={props.value}
        type={props.type}
        placeholder={props.placeholder}
        showerror={props.showError.toString()}
        name={props.name}
        touched={props.touched.toString()}
        valid={props.valid.toString()}
        required={props.required}
        onChange={props.onChange} />
      <p className={errorMessageClass}>{props.errorMessage}</p>
    </div>
  )
}

export default input