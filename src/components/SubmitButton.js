import React from 'react'

const SubmitButton = ({ name, handleClick }) => (
  <button type="submit" className="btn btn-default" onClick={handleClick}>{name}</button>
)

export default SubmitButton
