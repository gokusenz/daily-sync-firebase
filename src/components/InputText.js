import React from 'react'

const InputText = ({ name, type, value }) => (
  <input type={type} className="form-control" name={name} id={name} value={value} onChange={() => {}} required />
)

export default InputText
