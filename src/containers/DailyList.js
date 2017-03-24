import React, { Component } from 'react';
import DailyListComponent from '../components/DailyList';
import Database from '../libs/Database'


export class DailyForm extends Component {
  state = {
    dailyList: [],
  }

  constructor() {
    super()
    this.database = new Database(process.env.DATABASE)
  }

  componentWillMount() {
    this.database.getList(this.props.team)
    .then((result) => {
      const arr = []
      const r = result.val();
      for (var i in r) {
        arr.push({id:i, ...r[i]})
      }
      console.log(arr)
      this.setState({
        dailyList: arr,
      })
    })
  }

  render() {
    const { team } = this.props;
    return (
        <DailyListComponent team={team} dailyList={this.state.dailyList} />
    );
  }
}

export default DailyForm;
