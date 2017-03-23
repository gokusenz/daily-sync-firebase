import React from 'react'
import './App.scss'
import logo from '../../public/images/logo.svg'

const DailyList = ({ team, list }) => (
  <div className="App">
    <div className="App-header">
      <h2>Daiy List of ({team})</h2>
      <img src={logo} className="App-logo" alt="logo" />
    </div>
  </div>
)

export default DailyList
