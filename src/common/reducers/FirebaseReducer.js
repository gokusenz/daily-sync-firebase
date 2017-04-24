import { CONNECT_FIREBASE } from '../actions/Types'

const initialState = {
  firebase: '',
}

const FirebaseReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONNECT_FIREBASE:
      return action.payload
    default:
      return state
  }
}

export default FirebaseReducer
