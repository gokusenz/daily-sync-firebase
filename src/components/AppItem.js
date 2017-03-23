import React, { PropTypes } from 'react'
import style from './AppItem.css'

const AppItem = ({ text, complete }) => (
  <p className={complete ? style.complete : ''}>{text} :D</p>
)

AppItem.propTypes = {
  text: PropTypes.string.isRequired,
  complete: PropTypes.bool,
}
AppItem.defaultProps = {
  complete: false,
}

export default AppItem
