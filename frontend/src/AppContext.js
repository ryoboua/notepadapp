import React, { Component } from 'react'

export const AppContext = React.createContext()

export class AppProvider extends Component {
  render() {
    return (
      <AppContext.Provider value={this.props.clientError} >
        {this.props.children}
      </AppContext.Provider>
    )
  }
}