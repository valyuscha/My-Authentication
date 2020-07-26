import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import Congratulations from './components/Congratulations'
import MainPage from './components/MainPage'
import SignInForm from './components/SignInForm'
import SignUpForm from './components/SignUpForm'
import StopAuth from './components/StopAuth'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/sign-up" component={SignUpForm}/>
        <Route path="/not-allowed" component={StopAuth}/>
        <Route path="/congratulations" component={Congratulations}/>
        <Route path="/sign-in" component={SignInForm}/>
        <Route path="/" component={MainPage}/>
        <Redirect to="/"/>
      </Switch>
    </div>
  )
}

export default App