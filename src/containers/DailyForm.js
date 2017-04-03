import React, { Component } from 'react';
import { connect } from 'react-redux'
import { loadPages } from '../actions/Todo'
import DailyFormComponent from '../components/DailyForm';
import Database from '../libs/Database'
import DateLib from '../libs/Date'

export class DailyForm extends Component {

  constructor(props) {
    super(props)
    this.database = new Database(process.env.DATABASE, 'DailyApp')
    this.state = {
      name: '',
      yesterday: '',
      handleLastDo: this.handleLastDo.bind(this),
      handleChange: this.handleChange.bind(this),
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const result = this.database.saveData(
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

  handleLastDo(name) {
    new Promise((resolve, reject) => {
      this.database.getLastDo(DateLib.getCurDate(), name, resolve)
    })
    .then((result) => {
      this.setState({
        yesterday: result
      })
    })
  }

  onReloadPages = () => {
    this.props.onLoadPages()
  }

  handleChange(event, fieldName) {
    let state = {}
    state[fieldName] = event.target.value
    this.setState(state)
  }

  shouldComponentUpdate(nextProps) {
    console.log('update ', this.props.pages)
    return this.props.pages !== nextProps.pages;
  }

  componentDidMount() {
    this.onReloadPages()
  }

  render() {
    const { team } = this.props;
    return (
      <DailyFormComponent name={this.state.name} handleSubmit={this.handleSubmit} handleLastDo={this.state.handleLastDo} handleChange={this.state.handleChange} yesterday={this.state.yesterday} team={team} curDate={DateLib.getCurDate()} />
    );
  }
}

const mapStateToProps = (state) => ({
  pages: state
})


// export default connect(null, { addTodo })(DailyForm)
export default connect(
  mapStateToProps,
  { onLoadPages: loadPages }
)(DailyForm)
