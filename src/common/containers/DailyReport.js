import React, { Component } from 'react'
import { connect } from 'react-redux'
import { connectFirebase } from '../actions/Firebase'
import DailyReportComponent from '../components/DailyReport'
import Database from '../libs/Database'
import DateLib from '../libs/Date'
import LineApi from '../libs/LineApi'

export class DailyReport extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dailyList: [],
      chooseDate: '',
    }
  }

  componentDidMount() {
    this.connectDatabase()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.database !== this.props.database) {
      // console.log('ReRender', this.props)
      this.getList(nextProps.database)
    }
  }

  connectDatabase = () => {
    this.props.onConnectFirebase()
  }

  handleReport = (team) => {
    let reportList
    let reportCounter
    const chooseDate = DateLib.getCurDate()
    let msg = `\nReport : https://daily-sync-app.firebaseapp.com/report/${team}\n\n${chooseDate} #${team}\n\n`
    this.props.database.getList(chooseDate, this.props.team)
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

  getList = (database) => {
    const chooseDate = DateLib.getCurDate()
    database.getList(chooseDate, this.props.team)
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
        handleReport={this.handleReport}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { firebase } = state
  const returnState = {}
  returnState.database = firebase
  return returnState
}

export default connect(
  mapStateToProps,
  {
    onConnectFirebase: connectFirebase,
  }
)(DailyReport)
