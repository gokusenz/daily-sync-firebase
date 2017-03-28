import React from 'react'
import { Link } from 'react-router-dom'
import './App.scss'
import ReportItem from './Reporttem'

const DailyReport = ({ date, team, dailyList, handleReport }) => (
  <div className="App">
    <div className="App-List col-xs-12">
      <h3>{date} #{team}</h3>
      <br />
      <div className="col-md-offset-3 col-md-6 col-xs-12 ">
        {
          dailyList.map(doc => (
            <ReportItem key={doc.id} item={doc} />
          ))
        }
      </div>
    </div>
    <Link to={`/list/${team}`} className="btn btn-default btn-list">Back</Link>
  </div>
)

export default DailyReport
