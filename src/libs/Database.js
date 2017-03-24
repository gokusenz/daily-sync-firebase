import * as firebase from 'firebase'

class Database {
  constructor(database) {
    console.log('connnect db')
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
      this.db.ref(`${date}/${team}/${name}`).set({
        name,
        team,
        yesterday,
        today,
        date,
      })
      return true
    } catch (error) {
      return false
    }
  }

  getList(date, team) {
    return this.db.ref(`/${date}/${team}`).once('value')
  }
}

export default Database
