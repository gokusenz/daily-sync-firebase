import { createStore as createReduxStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

const promise = (store) => {
  const next = store.dispatch

  return (action) => {
    if (typeof action.then === 'function') {
      return action.then(next)
    }
    return next(action)
  }
}

const createStore = (initialState) => {
  const middlewares = [thunk]
  const store = createReduxStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares),
    window.__REDUX_DEVTOOLS_EXTENSION__ && 
      window.__REDUX_DEVTOOLS_EXTENSION__(),
  )

  store.dispatch = promise(store)

  if (module.hot) {
    System.import('../reducers').then(nextRootReducer =>
      store.replaceReducer(nextRootReducer.default)
    )
  }

  return store
}

export { createStore }
