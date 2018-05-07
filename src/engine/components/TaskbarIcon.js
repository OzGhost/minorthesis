import React from 'react'
import PropTypes from 'prop-types'

const TaskbarIcon = ({ icon, label, onClick }) => (
  <div className="taskbar-icon">
    <label>{label}</label>
    <img src={icon} onClick={onClick}/>
  </div>
)

TaskbarIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default TaskbarIcon
