import { GET_REPORT } from '../actions/Types'

const initialState = []

const ReportReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REPORT:
      const arr = []
      const r = action.reportList.val()
      for (const i in r) {
        arr.push({ id: i, ...r[i] })
      }
      return arr
    default:
      return state
  }
}

export default ReportReducer
