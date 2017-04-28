import firebase from 'firebase'

const database = process.env.DATABASE

const config = {
  apiKey: database.apiKey,
  authDomain: database.authDomain,
  databaseURL: database.databaseURL,
  storageBucket: database.storageBucket,
  messagingSenderId: database.messagingSenderId,
}
const randomString = new Date().getTime()
const otherApp = firebase.initializeApp(config, `DailyApp${randomString}`)

// Get a reference to the database service
const Database = otherApp.database()

export default Database
