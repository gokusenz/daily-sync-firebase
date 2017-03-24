import React from 'react'
import ListItem from './ListItem'
import './App.scss'
import logo from '../../public/images/logo.svg'

const DailyList = ({ team, dailyList }) => (
  <div className="App">
    <div className="App-header">
      <h2>Daily List of ({team})</h2>
      <img src={logo} className="App-logo" alt="logo" />
      <div className="App-List">
        <ul className="list-group col-md-offset-3 col-md-6 col-xs-12 ">
          {
            dailyList.map(doc => (
              <ListItem key={doc.id} item={doc} />
            ))
          }
        </ul>
      </div>
    </div>
  </div>
)

export default DailyList
