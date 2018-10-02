import React, { Component } from 'react';
import './App.css';
import NavBar from './navbar/NavBar'
import LandingPage from './landing_page/LandingPage'

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <LandingPage />
      </div>
    );
  }
}

export default App;
