import React, { PropTypes } from 'react'
import AppItem from './AppItem'
import './App.scss'
import logo from '../../public/images/logo.svg'

const App = ({ children }) => (
  <div className="App">
    <div className="App-header">
      <h2>Welcome to ReactJSs</h2>
      <img src={logo} className="App-logo" alt="logo" />
    </div>
    <p className="App-intro">
      To get started, edit <code>src/App.js</code> and save to reload.
    </p>
    <AppItem text="App Text" />
    <p>{ children }</p>
  </div>
)

App.propTypes = {
  children: PropTypes.string.isRequired,
}

export default App
