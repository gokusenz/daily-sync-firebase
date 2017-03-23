import React, { Component } from 'react';
import DailyFormComponent from '../components/DailyForm';
import Database from '../libs/Database'

export class DailyForm extends Component {
  static defaultProps = {
    title: 'Login Form',
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // this.setState({ loading: true });
    this.database = new Database(process.env.DATABASE);
    this.database.saveData(e.target.name.value, e.target.yesterday.value, e.target.today.value, "2016")
    // this.submit({});
    // this.props.reset();
  }

  render() {
    const { error, handleSubmit, title } = this.props;
    return (
      <DailyFormComponent handleSubmit={this.handleSubmit} />
    );
  }
}

export default DailyForm;
