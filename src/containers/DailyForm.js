import React, { Component } from 'react';
import DailyFormComponent from '../components/DailyForm';
import Database from '../libs/Database'
import DateLib from '../libs/Date'

export class DailyForm extends Component {

  constructor() {
    super()
    this.database = new Database(process.env.DATABASE)
  }

  static defaultProps = {
    title: 'Login Form',
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const result = this.database.saveData(e.target.name.value, e.target.yesterday.value, e.target.today.value, DateLib.getCurDate(), e.target.team.value)
    if (result) {
      alert('บันทึกข้อมูลเรียบร้อย')
      e.target.name.value = ''
      e.target.yesterday.value = ''
      e.target.today.value = ''
    } else {
      alert('บันทึกข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง')
    }
  }

  render() {
    const { team } = this.props;
    return (
      <DailyFormComponent handleSubmit={this.handleSubmit} team={team} />
    );
  }
}

export default DailyForm;
