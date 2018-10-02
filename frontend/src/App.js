import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import NavBar from './navbar/NavBar'
import LandingPage from './landing_page/LandingPage'
import RegistrationPage from './registration_page/RegisterPage'
import client from './client'

class App extends Component {
  state = {
      user: null,
      clientError: null
   }
  register = async userCreds => {
    const response = await client.register(userCreds)
    if (response.status) {
      this.setState({ clientError: response })
    } else if (response.user && response.JWTToken) {
      this.setState({ user: response.user })
      //TODO save JWTToken to local storage
    } else {
      alert('Something went wrong ' + response)
    }
  }
  render() {
    return (
      <div className="App">
        <NavBar />
        <Router>
          <React.Fragment>
            <Route exact path='/' component={LandingPage} />
            <Route path='/registration' render={() => <RegistrationPage register={this.register}/>} />
          </React.Fragment>
        </Router>
      </div>
    );
  }
}

export default App;