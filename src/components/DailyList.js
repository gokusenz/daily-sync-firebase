import React from 'react'
import ListItem from './ListItem'
import './App.scss'
import logo from '../../public/images/logo.svg'

const DailyList = ({ team, dailyList }) => (
  <div className="App">
    <div className="App-header">
      <h2>Daily List of ({team})</h2>
      <img src={logo} className="App-logo" alt="logo" />
      {
        console.log('result', dailyList)
        // dailyList.map((list, index) => (
        //   <ListItem key={list.name} {...list} number={index + 1} />
        // ))
      }
    </div>
  </div>
)

export default DailyList
