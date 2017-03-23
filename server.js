const path = require('path')
require('dotenv').config()
const express = require('express')
const firebase = require('firebase')

const port = process.env.PRODUCTION_PORT || 3000

const app = express()

// Initialize Firebase
// TODO: Replace with your project's customized code snippet
const config = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
}
firebase.initializeApp(config)

app.use('/public', express.static(path.join(__dirname, 'public')))
app.use('/dist', express.static(path.join(__dirname, 'dist')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(port, (err) => {
  if (err) {
    return console.error(err)
  }
  console.log(`Listening at http://localhost:${port}`)
})
