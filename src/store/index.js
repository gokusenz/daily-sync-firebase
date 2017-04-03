import { createStore as createReduxStore } from 'redux'
import rootReducer from '../reducers'

const createStore = (initialState) => {
  const store = createReduxStore(
    rootReducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && 
      window.__REDUX_DEVTOOLS_EXTENSION__(),
  )

  if (module.hot) {
    System.import('../reducers').then(nextRootReducer =>
      store.replaceReducer(nextRootReducer.default)
    )
  }

  return store
}

export { createStore }
