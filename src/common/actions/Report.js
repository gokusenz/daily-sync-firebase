import { GET_REPORT } from './Types'
import Database from '../libs/Database'

const getReport = (team, date) => (
  (dispatch) => {
    const database = new Database()
    database.getList(date, team)
    .then((result) => {
      const arr = []
      const r = result.val()
      for (const i in r) {
        arr.push({ id: i, ...r[i] })
      }
      dispatch({
        type: GET_REPORT,
        payloads: {
          reportList: arr,
        },
      })
    })
  }
)

export { getReport }
