import React, { Component } from 'react'
import { connect } from 'react-redux'
import DailyReportComponent from '../components/DailyReport'
import { getReport } from '../actions/Report'
import Database from '../libs/Database'
import DateLib from '../libs/Date'
import LineApi from '../libs/LineApi'

export class DailyReport extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dailyList: [],
      chooseDate: DateLib.getCurDate(),
    }
    this.database = new Database()
  }

  componentDidMount() {
    this.props.onGetReport(this.props.params.team, this.state.chooseDate)
  }

  handleReport = (team) => {
    let reportList
    let reportCounter
    const chooseDate = DateLib.getCurDate()
    let msg = `\nReport : https://daily-sync-app.firebaseapp.com/report/${team}\n\n${chooseDate} #${team}\n\n`
    this.database.getList(chooseDate, this.props.params.team)
    .then((result) => {
      const arr = []
      const r = result.val()
      for (const i in r) {
        arr.push({ id: i, ...r[i] })
      }
      reportList = arr
      reportCounter = 0

      reportList.map(doc => {
        reportCounter = reportCounter + 1
        msg = msg.concat(doc.name)
              .concat('\nเมื่อวานทำอะไร\n')
              .concat(doc.yesterday)
              .concat('\n\nวันนี้ทำอะไร\n')
              .concat(doc.today)
              .concat('\n\n')

        if(reportCounter === 3) {
          LineApi.lineNotify(msg)
          .then((lineResult) => {
            console.log(lineResult)
          })
          reportCounter = 0
          msg = ''
        }
      })
      if (reportCounter !== 0) {
        LineApi.lineNotify(msg)
        .then((lineResult) => {
          console.log(lineResult)
        })
      }
      alert('ส่งข้อมูลเรียบร้อย')
    })
  }

  render() {
    return (
      <DailyReportComponent
        date={this.state.chooseDate}
        team={this.props.params.team}
        dailyList={this.props.report}
        handleReport={this.handleReport}
      />
    )
  }
}

DailyReport.need = [
  (params) => (getReport(params.team, DateLib.getCurDate())),
]

const mapStateToProps = state => ({
  report: state.report,
})

export default connect(
  mapStateToProps,
  {
    onGetReport : getReport,
  }
)(DailyReport)
