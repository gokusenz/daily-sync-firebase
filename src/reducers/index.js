import { combineReducers } from 'redux'
import sampleReducer from './sampleReducer'

const rootReducer = combineReducers({
  todos: sampleReducer,
})

export default rootReducer
