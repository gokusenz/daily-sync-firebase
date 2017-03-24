import React, { Component } from 'react'
import DailyListComponent from '../components/DailyList'
import Database from '../libs/Database'
import DateLib from '../libs/Date'


export class DailyForm extends Component {
  constructor() {
    super()
    this.database = new Database(process.env.DATABASE)
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
      <DailyListComponent
        date={this.state.chooseDate}
        team={team}
        dailyList={this.state.dailyList}
      />
    )
  }
}

export default DailyForm
