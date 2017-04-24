import React from 'react'
import nl2br from 'react-nl2br'

const ReportItem = (props) => {
  const {
    item,
  } = props
  return (
    <div className="text-left">
      <h3>{item.name}</h3>
      <p>เมื่อวานทำอะไร <br />{nl2br(item.yesterday)}</p>
      <br />
      <p>วันนี้ทำอะไร<br />{nl2br(item.today)}</p>
      <br />
    </div>
  )
}

export default ReportItem
