import React, { PropTypes } from 'react'
import DailyForm from './DaiyForm'
import './App.scss'
import logo from '../../public/images/logo.svg'

const App = ({ children }) => (
  <div className="App">
    <div className="App-header">
      <h2>Welcome to Daily Sync (COE)</h2>
      <img src={logo} className="App-logo" alt="logo" />
    </div>
    <p>{ children }</p>
    <DailyForm />
  </div>
)

App.propTypes = {
  children: PropTypes.string.isRequired,
}

export default App
