import React from 'react'
import { MemoryRouter as Router } from 'react-router-dom'
import { mount } from 'enzyme'
import Routes from '../../routes'

jest.mock('../../components/DailyApp')

describe('Routes', () => {
  it('should render DailyApp if path is /coe', () => {
    const component = mount(
      <Router initialEntries={['/coe']}>
        <Routes />
      </Router>
    )
    expect(component.text()).toEqual('DailyApp')
  })

})
