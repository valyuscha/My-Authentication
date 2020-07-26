import React from 'react'
import Button from '../UI/Button'
import classes from './Congratulations.module.css'

const congratulations = props => {
  const token = localStorage.getItem('token')
  if (!token) {
    props.history.push('/sign-up')
  }

  return (
    <div className={classes.Congratulations}>
      <h1>Congratulations!!!) You have passed your registration successfully, so you can continue using this website)</h1>
      <Button
        action="Continue"
        clicked={() => props.history.push('/sign-in')} />
    </div>
  )
}

export default congratulations