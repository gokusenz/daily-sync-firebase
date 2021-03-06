import React from 'react'
import { Router, Route, IndexRedirect, Redirect } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import PageNotFound from './components/PageNotFound'
import DailyApp from './components/DailyApp'
import DailyReportsContainer from './containers/DailyReport'

const routes = (store, history) => (
  <Router
    history={syncHistoryWithStore(history, store)}
    onUpdate={() => window.scrollTo(0, 0)}
  >
    <Route path="/">
      <IndexRedirect to="/404" />
      <Route path="coe" component={() => <DailyApp team="COE" />} />
      <Route path="report/:team" component={DailyReportsContainer} />
      <Route path="404" component={PageNotFound} />
      <Redirect from="*" to="/404" />
    </Route>
  </Router>
)

export default routes
