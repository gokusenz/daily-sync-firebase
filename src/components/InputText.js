import React from 'react'

const InputText = ({ name, type, defaultValue }) => (
  <input type={type} className="form-control" name={name} id={name} defaultValue={defaultValue} onChange={() => {}} required />
)

export default InputText
