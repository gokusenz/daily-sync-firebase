import React from 'react'

const TextArea = ({ name, row }) => (
  <textarea className="form-control" name={name} id={name} rows={row} required />
)

export default TextArea
