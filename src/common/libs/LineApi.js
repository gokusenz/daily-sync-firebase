const axios = require('axios')
const qs = require('qs')

export default {
  lineNotify(message) {
    return axios.post(`${process.env.LINE_URL}`,
      qs.stringify(
        {
          msg: message,
          token: process.env.LINE_TOKEN,
        }
      ),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
  },
}
