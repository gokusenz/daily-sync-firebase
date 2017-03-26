const axios = require('axios')

export default {
  lineNotify(msg) {
    return axios.get(`${process.env.LINE_URL}?msg=${msg}&token=${process.env.LINE_TOKEN}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
  },
}
