import { CONNECT_FIREBASE } from '../actions/Types'
import Database from '../libs/Database'

const connectFirebase = () => ({
  type: CONNECT_FIREBASE,
  payload: new Database(process.env.DATABASE, 'DailyApp'),
})

export { connectFirebase }
