import React from 'react'
import { Link } from 'react-router-dom'
import InputText from './InputText'
import TextArea from './TextArea'

const DailyForm = ({ handleSubmit, team }) => (
  <form className="form-horizontal col-md-9 col-md-offset-1 col-xs-12" onSubmit={handleSubmit}>
    <InputText name="team" type="hidden" value={team} />
    <div className="form-group">
      <label htmlFor="name" className="col-sm-3 control-label">ชื่อ</label>
      <div className="col-sm-8" >
        <InputText name="name" type="text" />
      </div>
    </div>
    <div className="form-group">
      <label htmlFor="yesterday" className="col-sm-3 control-label">เมื่อวานทำอะไร</label>
      <div className="col-sm-8" >
        <TextArea name="yesterday" row="5" />
      </div>
    </div>
    <div className="form-group">
      <label htmlFor="today" className="col-sm-3 control-label">วันนี้ทำอะไร</label>
      <div className="col-sm-8" >
        <TextArea name="today" row="5" />
      </div>
    </div>
    <div className="form-group">
      <div className="col-sm-offset-2 col-sm-10">
        <button type="submit" className="btn btn-default">บันทึก</button>
        <Link to={`list/${team}`} className="btn btn-default">List</Link>
      </div>
    </div>
  </form>
)

export default DailyForm
