import React from 'react'
import { Link } from 'react-router-dom'
import InputText from './InputText'
import TextArea from './TextArea'

const DailyForm = ({ handleSubmit, handleLastDo, handleChange, yesterday, team, curDate }) => (
  <form className="form-horizontal col-md-9 col-md-offset-1 col-xs-12" onSubmit={handleSubmit}>
    <InputText name="team" type="hidden" defaultValue={team} />
    <div className="form-group">
      <label htmlFor="daily_date" className="col-md-3 col-sm-2 control-label">วันที่</label>
      <div className="col-md-8 col-sm-10" >
        <InputText name="daily_date" type="text" defaultValue={curDate} />
      </div>
    </div>
    <div className="form-group">
      <label htmlFor="name" className="col-md-3 col-sm-2 control-label">ชื่อ</label>
      <div className="col-md-8 col-sm-10" >
        <InputText name="name" type="text" handleChange={handleChange} />
      </div>
    </div>
    <div className="form-group">
      <label htmlFor="yesterday" className="col-md-3 col-sm-2 control-label">เมื่อวานทำอะไร</label>
      <div className="col-md-8 col-sm-10" >
        <TextArea name="yesterday" row="5" value={yesterday} handleChange={handleChange} />
      </div>
    </div>
    <div className="form-group">
      <label htmlFor="today" className="col-md-3 col-sm-2 control-label">วันนี้ทำอะไร</label>
      <div className="col-md-8 col-sm-10" >
        <TextArea name="today" row="5" />
      </div>
    </div>
    <div className="form-group">
      <div className="col-sm-offset-2 col-sm-10">
        <button type="submit" className="btn btn-success">Submit</button>
        <button className="btn btn-warning btn-list" onClick={() => handleLastDo('นิว')}>Get From Yesterday</button>
        <Link to={`/report/${team}`} className="btn btn-primary btn-list">Report</Link>
      </div>
    </div>
  </form>
)

export default DailyForm
