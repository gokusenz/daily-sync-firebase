import { ON_CHANGE } from '../actions/Types'

const initialState = []

const FieldReducer = (state = initialState, action) => {
  switch (action.type) {
    case ON_CHANGE:
      return action.payload
    default:
      return state
  }
}

export default FieldReducer
