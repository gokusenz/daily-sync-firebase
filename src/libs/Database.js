import * as firebase from 'firebase'

class Database {
  constructor(database) {
    // Set the configuration for your app
    // TODO: Replace with your project's config object
    const config = {
      apiKey: database.apiKey,
      authDomain: database.authDomain,
      databaseURL: database.databaseURL,
      storageBucket: database.storageBucket,
      messagingSenderId: database.messagingSenderId,
    }
    firebase.initializeApp(config)

    // Get a reference to the database service
    this.db = firebase.database()
  }

  saveData(name, yesterday, today, date, team) {
    try {
      this.db.ref(`${team}/${date}_${name}`).set({
        name,
        yesterday,
        today,
        date,
      })
      return true
    } catch (error) {
      return false
    }
  }
}

export default Database
