import axios from 'axios'

const checkValidity = (value, rules) => {
  let isValid = true

  if (rules.required) {
    isValid = value.trim() !== '' && isValid
  }

  if (rules.minLength) {
    isValid = value.trim().length >= rules.minLength && isValid
  }

  if (rules.isEmail) {
    const pattern = /^.+@.+\..+$/
    isValid = pattern.test(value) && isValid
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/
    isValid = pattern.test(value) && isValid
  }

  if (rules.min) {
    isValid = +value.trim() >= rules.min && isValid
  }

  if (rules.max) {
    isValid = +value.trim() <= rules.max && isValid
  }

  return isValid
}

export const inputChangeHandler = (event, stateControls) => {
  const controls = {...stateControls}
  const {name} = event.target
  controls[name].value = event.target.value
  controls[name].touched = false
  controls[name].valid = checkValidity(event.target.value, controls[name].validation)

  return controls
}

export const disableButton = form => {
  let disabled = false

  form.forEach((folder, index) => {
    if (index !== 0) {
      if (folder.value.trim() === '' || form[index - 1].value.trim() === '') {
        disabled = true
      }
    } else {
      if (folder.value.trim() === '') {
        disabled = true
      }
    }
  })

  return disabled
}

export const submitForm = (event, controls, email, password) => {
  event.preventDefault()
  const formData = {}
  for (let folder in controls) {
    controls[folder].showError = !controls[folder].valid

    if (email.valid && password.valid) {
      formData[folder] = controls[folder].value
    }
  }

  return formData
}

export const auth = async (url, authData) => {
  try {
    const response = await axios.post(url, authData)
    if (response.data.idToken) {
      localStorage.setItem('token', response.data.idToken)
    }
  } catch (e) {
    return e
  }
}