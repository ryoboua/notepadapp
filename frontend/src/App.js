import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { AppProvider } from './AppContext'

import NavBar from './navbar/NavBar'
import LandingPage from './landing_page/LandingPage'
import RegistrationPage from './registration_page/RegisterPage'
import LoginPage from './login_page/LoginPage'
import AccUpdatePage from './account_update_page/AccUpdatePage' 
import NotePad from './note_app/NotePad'
import client from './client'

class App extends Component {

  state = {
    user: null,
    clientError: null,
  }

  componentDidMount(){
    //if there is a JWT under npaJWT in localStorage
    //that means the user has already logged in
    //fetch user
    if (localStorage.npaJWT) client.getUser().then(this.handleAPIResponse.forUserData)
  }

  register = userCreds => client.register(userCreds).then(this.handleAPIResponse.forUserData)
  
  login = userCreds => client.login(userCreds).then(this.handleAPIResponse.forUserData)

  updateAcc = userCreds => client.updateAcc(userCreds).then(this.handleAPIResponse.forUserData)

  logout = () => {
    localStorage.clear()
    this.setState({ user: null, clientError: null })
  }

  createNote = note => {
    const { _id } = this.state.user
    client.createNote(_id, note).then(this.handleAPIResponse.forNotes)
  }

  updateNote = note => {
    const { _id } = this.state.user
    client.updateNote(_id, note).then(this.handleAPIResponse.forNotes)
  }

  deleteNote = note => {
    const { _id } = this.state.user
    client.deleteNote(_id, note).then(this.handleAPIResponse.forNotes)
  }
  
  handleAPIResponse = {
    forUserData: response => {
      if (response.status) { 
        this.setState({ clientError: response })
      } 
      else if (response.user && response.JWT) {
        localStorage.npaJWT = response.JWT
        this.setState({ user: response.user, clientError: null })
      } 
      else {
        alert('Something went wrong ' + response)
      }
    },
    forNotes: response => {
      if (response.status) { 
        this.setState({ clientError: response })
      } 
      else if (response.notes) {
        this.setState({ user: {...this.state.user, notes: response.notes }, clientError: null })
      } 
      else {
        alert('Something went wrong ' + response)
        console.log(response)
      }
    },
  }

  clearClientError = () => this.setState({ clientError: null })

  render() {
    const { user, clientError } = this.state
    return (
      <AppProvider clientError={ clientError } clearClientError={this.clearClientError} >
        <div className="text-center">
          <Router>
            <React.Fragment>
              <NavBar 
              showLogOut={this.state.user ? true : false} 
              name={user && user.name}
              logout={this.logout}
              />
              <Route exact path='/' render={() => !user ? <LandingPage /> : <Redirect to='/notes'/>} />
              <Route path='/registration' 
                render={() => !user ? <RegistrationPage register={this.register}/> : <Redirect to='/notes'/>} />
              <Route path='/auth/login' 
                render={() => !user ? <LoginPage login={this.login} /> : <Redirect to='/notes'/>} />
              <Route 
                path='/notes' 
                render={() => user ? 
                                <NotePad 
                                  notes={user.notes} 
                                  createNote={this.createNote} 
                                  updateNote={this.updateNote} 
                                  deleteNote={this.deleteNote} 
                                /> 
                                : 
                                <Redirect to='/'/>} 
              />

              <Route 
                path='/users/edit'
                render={() => user ? 
                  <AccUpdatePage 
                    updateAcc={this.updateAcc} 
                    id={user._id} 
                    name={user.name} 
                    email={user.email} 
                  /> 
                  : 
                  <Redirect to='/'/>}
              />
            </React.Fragment>
          </Router>
        </div>
      </AppProvider>

    )
  }
}

export default App