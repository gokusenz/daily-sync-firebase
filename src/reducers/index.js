import { combineReducers } from 'redux'
import todoReducer from './TodoReducer'

const rootReducer = combineReducers({
  todos: todoReducer,
})

export default rootReducer
