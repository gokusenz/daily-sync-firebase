import React from 'react'
import DailyForm from '../containers/DailyForm'
import './App.scss'

const DailyApp = ({ team }) => (
  <div className="App">
    <div className="App-header">
      <h2>Daily Sync v1.3.0 ({team})</h2>
      <img src="/public/images/logo.png" className="App-logo" alt="logo" />
    </div>
    <DailyForm team={team} />
  </div>
)

export default DailyApp
