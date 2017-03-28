import React from 'react'
import { Link } from 'react-router-dom'
import ListItem from './ListItem'
import './App.scss'
import logo from '../../public/images/logo.svg'

const DailyList = ({ date, team, dailyList, handleReport }) => (
  <div className="App">
    <div className="App-header">
      <h2>Daily List of ({team})</h2>
      <img src={logo} className="App-logo" alt="logo" />
    </div>
    <div className="App-List col-xs-12">
      <h3>{date}</h3>
      <ul className="list-group col-md-offset-3 col-md-6 col-xs-12 ">
        {
          dailyList.map(doc => (
            <ListItem key={doc.id} item={doc} />
          ))
        }
      </ul>
    </div>
    <button className="btn btn-primary" onClick={() => handleReport(team)}>Send Report</button>
    <Link to={`/${team}`} className="btn btn-default btn-list">Back</Link>
  </div>
)

export default DailyList
