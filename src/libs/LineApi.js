const axios = require('axios')

export default {
  lineNotify(msg) {
    console.log('msg ', msg)
    const AuthStr = 'Bearer '.concat('')
    console.log('token ', AuthStr)
    axios.post('https://notify-api.line.me/api/notify', {
      message: msg,
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
        Authorization: AuthStr,
      },
    })
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
    // request({
    //   method: 'POST',
    //   uri: 'https://notify-api.line.me/api/notify',
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //   },
    //   auth: {
    //     bearer: process.env.LINE_TOKEN,
    //   },
    //   form: {
    //     message: msg,
    //   },
    // }, (err, httpResponse, body) => {
    //   console.log(JSON.stringify(err))
    //   console.log(JSON.stringify(httpResponse))
    //   console.log(JSON.stringify(body))
    // })
  },
}
