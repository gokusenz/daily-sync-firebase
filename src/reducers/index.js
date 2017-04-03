import { combineReducers } from 'redux'
import FirebaseReducer from './FirebaseReducer'

const rootReducer = combineReducers({
  firebase: FirebaseReducer,
})

export default rootReducer
