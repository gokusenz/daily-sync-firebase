import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import FieldReducer from './FieldReducer'
import ReportReducer from './ReportReducer'

export default combineReducers({
  field: FieldReducer,
  report: ReportReducer,
  routing: routerReducer,
})
