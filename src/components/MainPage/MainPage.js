import React, {Component} from 'react'
import {getCookie} from '../../shared/utility'
import Button from '../UI/Button'
import classes from './MainPage.module.css'

class MainPage extends Component {
  componentDidMount() {
    const token = getCookie('token')
    if (!token) {
      this.props.history.push('/sign-in')
    }
  }

  logout = () => {
    document.cookie = `token=${null}`
    this.props.history.push('/sign-in')
  }

  render() {
    return (
      <div className={classes.MainPage}>
        <h1>If you see this page it means that you have passed your registration and logged in successfully</h1>
        <Button
          action="Logout"
          clicked={this.logout}/>
      </div>
    )
  }
}

export default MainPage