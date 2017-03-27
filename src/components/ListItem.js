import React from 'react'
import nl2br from 'react-nl2br'

const ListItem = (props) => {
  const {
    item
  } = props
  return (
    <li className="list-group-item">
      <p>{item.name}</p>
      <p>เมื่อวานทำอะไร</p>
      <p>{nl2br(item.yesterday)}</p>
      <br />
      <p>วันนี้ทำอะไร</p>
      <p>{nl2br(item.today)}</p>
    </li>
  )
}

export default ListItem
