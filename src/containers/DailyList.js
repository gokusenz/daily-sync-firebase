import React, { Component } from 'react';
import DailyListComponent from '../components/DailyList';
import Database from '../libs/Database'


export class DailyForm extends Component {

  constructor() {
    super()
    this.database = new Database(process.env.DATABASE)
  }

  componentDidMount() {
    this.database.getList(this.props.team)
    .then((result) => {
      this.dailyList = result.val()
    })
  }

  render() {
    const { team } = this.props;
    return (
      <DailyListComponent team={team} list={this.dailyList} />
    );
  }
}

export default DailyForm;
