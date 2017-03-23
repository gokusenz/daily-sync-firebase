import React from 'react'

const InputText = ({ name, type }) => (
  <input type={type} className="form-control" name={name} id={name} />
)

export default InputText
