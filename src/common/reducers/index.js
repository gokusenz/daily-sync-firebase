import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import FieldReducer from './FieldReducer'

export default combineReducers({
  field: FieldReducer,
  routing: routerReducer,
})
