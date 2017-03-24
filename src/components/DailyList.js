import React from 'react'
import ListItem from './ListItem'
import './App.scss'
import logo from '../../public/images/logo.svg'

const DailyList = ({ team, dailyList }) => (
  <div className="App">
    <div className="App-header">
      <h2>Daily List of ({team})</h2>
      <img src={logo} className="App-logo" alt="logo" />
      <ul className="list-group">
        {
          dailyList.map(doc => (
            <ListItem key={doc.id} item={doc} />
          ))
        }
      </ul>
    </div>
  </div>
)

export default DailyList
