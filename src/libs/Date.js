export default {
  getDate() {
    const today = new Date()
    let dd = today.getDate()
    let mm = today.getMonth() + 1 // January is 0!
    const yyyy = today.getFullYear()

    if (dd < 10) {
      dd = `0${dd}`
    }

    if (mm < 10) {
      mm = `0${mm}`
    }

    return [
      mm,
      dd,
      yyyy,
    ]
  },
  getCurDate() {
    const date = this.getDate()
    const today = `${date.mm}${date.dd}${date.yyyy}`
    return today
  },
  getFullCurDate() {
    const date = this.getDate()
    const today = `${date.mm}/${date.dd}/${date.yyyy}`
    return today
  },
}
