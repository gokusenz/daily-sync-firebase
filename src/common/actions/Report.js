import { GET_REPORT } from './Types'
import Database from '../libs/Database'

const receiveReport = reportList => ({
  type: GET_REPORT,
  reportList,
})

const getReport = (team, date) => (
  new Database().getList(date, team)
  .then(result => receiveReport(result))
)

export { getReport }
