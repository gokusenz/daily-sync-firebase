import React, { Component } from 'react';
import { connect } from 'react-redux'
import { connectFirebase } from '../actions/Firebase'
import { onChange } from '../actions/Field'
import DailyFormComponent from '../components/DailyForm';
import Database from '../libs/Database'
import DateLib from '../libs/Date'

export class DailyForm extends Component {

  constructor(props) {
    super(props)
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
    console.log(name)
    new Promise((resolve, reject) => {
      this.props.database.getLastDo(DateLib.getCurDate(), name, resolve)
    })
    .then((result) => {
      console.log(result)
      this.props.onChangeField('yesterday', result)
    })
    e.preventDefault()
  }

  handleChange = (event, fieldName) => {
    // let state = {}
    // state[fieldName] = event.target.value
    // this.setState(state)
    this.props.onChangeField(fieldName, event.target.value)
  }

  connectDatabase = () => {
    this.props.onConnectFirebase()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.name !== this.props.name | nextProps.today !== this.props.today | nextProps.yesterday !== this.props.yesterday) {
      console.log('nextProps', nextProps)
    }
  }

  componentDidMount() {
    this.connectDatabase()
  }

  render() {
    const { team } = this.props;
    return (
      <DailyFormComponent name={this.props.name} handleSubmit={this.handleSubmit} handleLastDo={this.handleLastDo} handleChange={this.handleChange} yesterday={this.props.yesterday} team={team} curDate={DateLib.getCurDate()} />
    );
  }
}

const mapStateToProps = (state, ownProps) => {

  const { firebase, field } = state
  let returnState = {}
  returnState['database'] = firebase
  returnState[field[0]] = field[1]
  return returnState
}


// export default connect(null, { addTodo })(DailyForm)
export default connect(
  mapStateToProps,
  { 
    onConnectFirebase: connectFirebase,
    onChangeField: onChange,
  }
)(DailyForm)
