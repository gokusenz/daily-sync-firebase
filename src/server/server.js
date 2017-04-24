import express from 'express'

const PORT = 8080
const app = express()

app.use((req, res) => {
  const HTML = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset='utf-8'>
      <title>Daily Sync App!</title>
    </head>
    <body>
      <div id='app'></div>
      <script src='http://127.0.0.1:3000/public/dist/bundle.js'></script>
    </body>
  </html>
  `

  res.end(HTML)
})

app.listen(PORT, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info(`==> Listening on port ${PORT}.`)
  }
})
