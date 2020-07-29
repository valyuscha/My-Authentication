import React from 'react'
import Button from '../UI/Button'
import classes from './StopAuth.module.css'

const stopAuth = props => (
  <div className={classes.StopAuth}>
    <h1>Sorry, but we cannot offer you to continue, because your parents may be against of it(</h1>
    <Button
      action="Come back"
      clicked={() => props.history.push('/sign-up')}/>
  </div>
)

export default stopAuth