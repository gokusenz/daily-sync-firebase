import React, { Component } from 'react'
import DailyListComponent from '../components/DailyList'
import Database from '../libs/Database'
import DateLib from '../libs/Date'
import LineApi from '../libs/LineApi'

export class DailyList extends Component {
  constructor() {
    super()
    this.database = new Database(process.env.DATABASE, 'DailyList')
    this.state = {
      dailyList: [],
      chooseDate: '',
      handleReport: this.handleReport.bind(this),
    }
  }

  componentWillMount() {
    const chooseDate = DateLib.getCurDate()
    this.database.getList(chooseDate, this.props.team)
    .then((result) => {
      const arr = []
      const r = result.val()
      for (const i in r) {
        arr.push({ id: i, ...r[i] })
      }
      this.setState({
        dailyList: arr,
        chooseDate,
      })
    })
  }

  handleReport(team) {
    let reportList
    const chooseDate = DateLib.getCurDate()
    let msg = `\n${chooseDate} #${team}\n\n`
    this.database.getList(chooseDate, this.props.team)
    .then((result) => {
      const arr = []
      const r = result.val()
      for (const i in r) {
        arr.push({ id: i, ...r[i] })
      }
      reportList = arr

      reportList.map(doc => (
        msg = msg.concat(doc.name)
              .concat('\nวันนี้ทำอะไร\n')
              .concat(doc.yesterday)
              .concat('\nเมื่อวานทำอะไร\n\n')
              .concat(doc.today)
              .concat('\n\n')
      ))
      console.log(msg)
      LineApi.lineNotify(msg)
      .then((lineResult) => {
        console.log(lineResult)
      })
    })
  }

  render() {
    const { team } = this.props
    return (
      <DailyListComponent
        date={this.state.chooseDate}
        team={team}
        dailyList={this.state.dailyList}
        handleReport={this.state.handleReport}
      />
    )
  }
}

export default DailyList
