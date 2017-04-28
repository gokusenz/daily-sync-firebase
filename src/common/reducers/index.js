import { combineReducers } from 'redux'
import FieldReducer from './FieldReducer'

const rootReducer = combineReducers({
  field: FieldReducer,
})

export default rootReducer
