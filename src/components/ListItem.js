import React from 'react'

const ListItem = (props) => {
  const {
    item
  } = props
  return (
    <li className="list-group-item">
      <p>{item.name}</p>
      <br />
      <p>เมื่อวานทำอะไร</p>
      <p>{item.yesterday}</p>
      <br />
      <p>วันนี้ทำอะไร</p>
      <p>{item.today}</p>
    </li>
  )
}

export default ListItem
