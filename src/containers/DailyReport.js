import React, { Component } from 'react'
import DailyReportComponent from '../components/DailyReport'
import Database from '../libs/Database'
import DateLib from '../libs/Date'

export class DailyReport extends Component {
  constructor() {
    super()
    this.database = new Database(process.env.DATABASE, 'DailyList')
    this.state = {
      dailyList: [],
      chooseDate: '',
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

  render() {
    const { team } = this.props
    return (
      <DailyReportComponent
        date={this.state.chooseDate}
        team={team}
        dailyList={this.state.dailyList}
      />
    )
  }
}

export default DailyReport
