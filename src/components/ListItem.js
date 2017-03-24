import React from 'react'

const ListItem = (props) => {
  const {
    item
  } = props
  return (
    <li className="list-group-item">{item.id}</li>
  )
}

export default ListItem
