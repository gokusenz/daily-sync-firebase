import React, { Component } from 'react';

import DailyFormComponent from '../components/DailyForm';

class DailyForm extends Component {
  static defaultProps = {
    title: 'Login Form',
  }

  handleSubmit = (values) => {
    this.validateForm(values);
    this.setState({ loading: true });
    this.login({
      username: values.username,
      password: values.password,
      userType: this.props.type,
    });
    this.props.reset();
  }

  render() {
    const { error, handleSubmit, title } = this.props;
    return (
      <DailyFormComponent />
    );
  }
}

export default DailyForm;
