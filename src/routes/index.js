import React from 'react'
import { Route } from 'react-router-dom'
import App from '../components/App'
import DailyApp from '../components/DailyApp'
import DailyListContainer from '../containers/DailyList'
import DailyReportsContainer from '../containers/DailyReport'

const Routes = () => (
  <div>
    <Route exact path="/" component={App} />
    <Route exact path="/coe" component={() => <DailyApp team="COE" />} />
    <Route exact path="/list/coe" component={() => <DailyListContainer team="COE" />} />
    <Route exact path="/report/coe" component={() => <DailyReportsContainer team="COE" />} />
  </div>
)

export default Routes
