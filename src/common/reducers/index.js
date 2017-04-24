import { combineReducers } from 'redux'
import FirebaseReducer from './FirebaseReducer'
import FieldReducer from './FieldReducer'

const rootReducer = combineReducers({
  firebase: FirebaseReducer,
  field: FieldReducer,
})

export default rootReducer
