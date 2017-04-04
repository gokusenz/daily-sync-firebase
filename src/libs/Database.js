import * as firebase from 'firebase'

class Database {
  constructor(database, instancesName) {
    // Set the configuration for your app
    // TODO: Replace with your project's config object
    const config = {
      apiKey: database.apiKey,
      authDomain: database.authDomain,
      databaseURL: database.databaseURL,
      storageBucket: database.storageBucket,
      messagingSenderId: database.messagingSenderId,
    }
    const randomString = new Date().getTime()
    const otherApp = firebase.initializeApp(config, instancesName + randomString)

    // Get a reference to the database service
    this.db = otherApp.database()
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
      this.db.ref(`YESTERDAY/${team}/${name}`).set({
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

  getYesterday(team, name) {
    return this.db.ref(`YESTERDAY/${team}/${name}`).once('value')
  }
}

export default Database
