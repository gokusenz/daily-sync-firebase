import React from 'react'

const TextArea = ({ name, row, value, handleChange }) => (
  <textarea className="form-control" name={name} id={name} rows={row} value={value} onChange={e => handleChange(e.target.value)} required />
)

export default TextArea
