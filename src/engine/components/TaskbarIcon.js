import React from 'react'
import PropTypes from 'prop-types'

const TaskbarIcon = ({ icon, onClick }) => (
  <img src={icon} onClick={onClick}/>
)

TaskbarIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default TaskbarIcon
