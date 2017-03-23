import React from 'react'
import DailyForm from '../containers/DailyForm'
import './App.scss'
import logo from '../../public/images/logo.svg'

const DailyApp = ({ team }) => (
  <div className="App">
    <div className="App-header">
      <h2>Welcome to Daily Sync (COE)</h2>
      <img src={logo} className="App-logo" alt="logo" />
    </div>
    <DailyForm team={team} />
  </div>
)

export default DailyApp
