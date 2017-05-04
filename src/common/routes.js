import React from 'react'
import { Router, Route, IndexRoute, IndexRedirect, Redirect } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import DailyApp from './components/DailyApp'
import DailyReportsContainer from './containers/DailyReport'

const routes = (store, history) => (
  <Router
    history={syncHistoryWithStore(history, store)}
    onUpdate={() => window.scrollTo(0, 0)}
  >
    <Route path="/">
      <IndexRedirect to="/coe" />
      <Route path="coe" component={() => <DailyApp team="COE" />} />
      <Route path="report/coe" component={() => <DailyReportsContainer team="COE" />} />
      <Redirect from="*" to="/coe" />
    </Route>
  </Router>
)

export default routes
