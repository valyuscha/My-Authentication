import React, {Component} from 'react'
import Button from '../UI/Button'
import classes from './MainPage.module.css'

class MainPage extends Component {
  componentDidMount() {
    const token = localStorage.getItem('token')
    if (!token) {
      this.props.history.push('/sign-in')
    }
  }

  logout = () => {
    localStorage.clear()
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