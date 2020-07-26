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
import classes from './SignUpForm.module.css'

class SignUpForm extends Component {
  state = {
    controls: {
      name: {
        value: '',
        name: 'name',
        type: 'text',
        label: 'Name',
        placeholder: 'Your name',
        validation: {
          required: true,
          minLength: 2
        },
        touched: false,
        valid: false,
        showError: false,
        errorMessage: 'We don\'t think that your name contains only 1 character)'
      },
      surname: {
        value: '',
        name: 'surname',
        type: 'text',
        label: 'Surname',
        placeholder: 'Your surname',
        validation: {
          required: true,
          minLength: 2
        },
        touched: false,
        valid: false,
        showError: false,
        errorMessage: 'We don\'t think that your surname contains only 1 character)'
      },
      age: {
        value: '',
        name: 'age',
        type: 'text',
        label: 'Age',
        placeholder: 'Your age',
        validation: {
          required: true,
          isNumeric: true,
          min: 4,
          max: 150
        },
        touched: false,
        valid: false,
        showError: false,
        errorMessage: ''
      },
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

  makeErrorMessageForAge = () => {
    const controls = {...this.state.controls}
    const value = controls.age.value
    let errorMessage = ''

    if (isNaN(value)) {
      errorMessage = 'Your age has to contain numbers, but not letters'
    } else {
      if (+value < controls.age.validation.min && +value > 0) {
        errorMessage = 'Sorry, but you are too small('
      } else if (+value < 0) {
        errorMessage = 'Your age cannot become smaller and smaller every year'
      } else if (+value === 0) {
        errorMessage = 'You have just born. It\'s so cute, but you aren\'t able to use our website)'
      } else if (+value > controls.age.validation.max) {
        errorMessage = 'Hmmmm... People don\'t live so mush'
      }
    }

    controls.age.errorMessage = errorMessage
    if (controls.age.errorMessage === '') {
      controls.age.valid = true
    }
    this.setState({controls})
  }


  onChangeHandler = event => {
    let controls = {...this.state.controls}
    inputChangeHandler(event, controls)

    this.setState({controls})
  }

  submitFormHandler = (event) => {
    const controls = {...this.state.controls}
    const formData = submitForm(event, controls, controls.email, controls.password)
    this.makeErrorMessageForAge()

    if (+formData.age < 18 && +formData.age >= controls.age.validation.min) {
      this.props.history.push('/not-allowed')
    } else if (Object.keys(formData).length !== 0) {
      if (controls.age.valid) {
        const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDkOlROGpix-dQmSz8c386OlFqMPcitQ_Q'
        auth(url, formData)
          .then(response => response
            ? this.setState({isModalShow: true})
            : this.props.history.push('/congratulations'))
        for (let folder in controls) {
          controls[folder].value = ''
        }
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
        <h1>Create an account</h1>
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
            <Link to="/sign-in">Sign in</Link>
            <Button
              type="submit"
              action="Sign up"
              disabled={disableButton(form)}
              clicked={this.submitFormHandler}/>
          </div>
        </form>
        <Backdrop
          show={this.state.isModalShow}
          clicked={() => this.setState({isModalShow: false})}/>
        <Modal
          show={this.state.isModalShow}
          message="We have such user already. Please, try to enter another data"
          buttonClicked={() => this.setState({isModalShow: false})}
          isModalShow={this.state.isModalShow}/>
      </div>
    )
  }
}

export default SignUpForm
