import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import { createStore } from '../common/store'
import AppRoot from '../common/components/AppRoot'

const store = createStore()
const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('react-root')
  )
}

render(AppRoot)

if (module.hot) {
  module.hot.accept('../common/components/App', () => {
    render(AppRoot)
  })
}
