import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Backdrop from '../UI/Backdrop'
import Button from '../UI/Button'
import Input from '../UI/Input'
import Modal from '../UI/Modal'
import {
  auth,
  disableButton,
  inputChangeHandler,
  submitForm
} from '../../shared/utility'
import classes from './SignInForm.module.css'

class SignInForm extends Component {
  state = {
    controls: {
      email: {
        value: '',
        name: 'email',
        type: 'text',
        label: 'Email',
        placeholder: 'Your email',
        validation: {
          required: true,
          isEmail: true
        },
        touched: false,
        valid: false,
        showError: false,
        errorMessage: 'Your email has to contain \'@\' and \'.\''
      },
      password: {
        value: '',
        name: 'password',
        type: 'password',
        label: 'Password',
        placeholder: 'Your password',
        validation: {
          required: true,
          minLength: 6
        },
        touched: false,
        valid: false,
        showError: false,
        errorMessage: 'Your password has to be no less than 6 characters'
      }
    },
    isModalShow: false
  }

  onChangeHandler = event => {
    let controls = {...this.state.controls}
    inputChangeHandler(event, controls)

    this.setState({controls})
  }


  submitFormHandler = async event => {
    const controls = {...this.state.controls}
    const formData = submitForm(event, controls, controls.email, controls.password)
    if (Object.keys(formData).length !== 0) {
      const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDkOlROGpix-dQmSz8c386OlFqMPcitQ_Q'
      await auth(url, formData)
        .then(response => response
          ? this.setState({isModalShow: true})
          : this.props.history.push('/'))
      for (let folder in controls) {
        controls[folder].value = ''
      }
    }

    this.setState({controls})
  }

  render() {
    let form = []

    for (let control in this.state.controls) {
      const folder = this.state.controls[control]
      form.push(folder)
    }

    return (
      <div className={classes.Form}>
        <h1>Login</h1>
        <form>
          {
            form.map(folder => {
              return (
                <Input
                  key={folder.label}
                  value={folder.value}
                  type={folder.type}
                  label={folder.label}
                  name={folder.name}
                  placeholder={folder.placeholder}
                  touched={folder.touched}
                  valid={folder.valid}
                  required={folder.validation.required}
                  showError={folder.showError}
                  errorMessage={folder.errorMessage}
                  onChange={this.onChangeHandler}/>
              )
            })
          }
          <div className={classes.Tools}>
            <Link to="/sign-up">Create a new account</Link>
            <Button
              type="submit"
              action="Sign in"
              disabled={disableButton(form)}
              clicked={this.submitFormHandler}/>
          </div>
        </form>
        <Backdrop
          show={this.state.isModalShow}
          clicked={() => this.setState({isModalShow: false})}/>
        <Modal
          show={this.state.isModalShow}
          message="Your email or password is incorrect"
          buttonClicked={() => this.setState({isModalShow: false})}
          isModalShow={this.state.isModalShow}/>
      </div>
    )
  }
}

export default SignInForm