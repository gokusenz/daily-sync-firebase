import React, { Component } from 'react';
import { connect } from 'react-redux'
import { connectFirebase } from '../actions/Firebase'
import DailyFormComponent from '../components/DailyForm';
import Database from '../libs/Database'
import DateLib from '../libs/Date'

export class DailyForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      yesterday: '',
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const result = this.props.database.saveData(
      e.target.name.value,
      e.target.yesterday.value,
      e.target.today.value,
      e.target.daily_date.value,
      e.target.team.value
    )
    if (result) {
      alert('บันทึกข้อมูลเรียบร้อย')
      e.target.name.value = ''
      e.target.yesterday.value = ''
      e.target.today.value = ''
    } else {
      alert('บันทึกข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง')
    }
  }

  handleLastDo = (e, name) => {
    new Promise((resolve, reject) => {
      this.props.database.getLastDo(DateLib.getCurDate(), name, resolve)
    })
    .then((result) => {
      console.log(result)
      this.setState({
        yesterday: result
      })
      console.log('state ', this.state.yesterday)
    })
    e.preventDefault()
  }

  handleChange = (event, fieldName) => {
    let state = {}
    state[fieldName] = event.target.value
    console.log(event.target.value)
    this.setState(state)
  }

  connectDatabase = () => {
    this.props.onConnectFirebase()
  }

  // shouldComponentUpdate(nextProps) {
  //   console.log('update ', this.props.database)
  //   return this.props.database !== nextProps.database;
  // }

  componentDidMount() {
    this.connectDatabase()
  }

  render() {
    const { team } = this.props;
    return (
      <DailyFormComponent name={this.state.name} handleSubmit={this.handleSubmit} handleLastDo={this.handleLastDo} handleChange={this.handleChange} yesterday={this.state.yesterday} team={team} curDate={DateLib.getCurDate()} />
    );
  }
}

const mapStateToProps = (state) => ({
  database: state.firebase
})


// export default connect(null, { addTodo })(DailyForm)
export default connect(
  mapStateToProps,
  { onConnectFirebase: connectFirebase }
)(DailyForm)
