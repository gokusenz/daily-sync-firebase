import React, { PropTypes } from 'react'
import './App.scss'
import logo from '../../public/images/logo.svg'

const App = ({ children }) => (
  <div className="App">
    <div className="App-header">
      <h2>Welcome to ReactJS</h2>
      <img src={logo} className="App-logo" alt="logo" />
    </div>
    <p>{ children }</p>
  </div>
)

App.propTypes = {
  children: PropTypes.string.isRequired,
}

export default App
