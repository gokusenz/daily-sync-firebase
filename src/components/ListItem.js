import React from 'react'

const ListItem = (props) => {
  const {
    item
  } = props
  return (
    <li className="list-group-item">
      <p>{item.name}</p>
      <p>เมื่อวานทำอะไร</p>
      <p>{item.yesterday.replace(/\r?\n/g, ' | ')}</p>
      <br />
      <p>วันนี้ทำอะไร</p>
      <p>{item.today.replace(/\r?\n/g, ' | ')}</p>
    </li>
  )
}

export default ListItem
