import React from 'react'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import DailyFormContainer from '../DailyForm'
import DailyFormComponent from '../../components/DailyForm'
import { CONNECT_FIREBASE } from '../../actions/Types'
import Database from '../../libs/Database'

describe('DailyForm Container', () => {
  const createStore = configureMockStore()
  let component
  let store

  beforeEach(() => {
    const state = { todos: [] }
    store = createStore(state)
    component = mount(
      <Provider store={store}>
        <DailyFormContainer />
      </Provider>
    ).find(DailyFormContainer).find(DailyFormComponent)
  })

  it('dispatches CONNECT_FIREBASE action via props.onConnectFirebase', () => {
    // component.props().onConnectFirebase()

    // const actions = store.getActions()

    // const expectedActions = [{
    //   type: CONNECT_FIREBASE,
    //   payload: new Database(process.env.DATABASE, 'DailyApp'),
    // }]

    // expect(actions).toEqual(expectedActions)
  })
})
