import React from 'react'

const ListItem = (props) => {
  const {
    key,
    number,
  } = props
  return (
    <div>
      {key}
    </div>
  )
}

export default ListItem
