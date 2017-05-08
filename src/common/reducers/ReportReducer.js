import { GET_REPORT } from '../actions/Types'

const initialState = []

const ReportReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REPORT:
      return action.payloads.reportList
    default:
      return state
  }
}

export default ReportReducer
