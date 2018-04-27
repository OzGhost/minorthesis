import React from 'react'
import PropTypes from 'prop-types'
import TaskbarIcon from './TaskbarIcon'

const Taskbar = ({ indicate }) => (
  <div className="taskbar">
    { indicate.map( (obj, i) =>
      <TaskbarIcon key={i} {...obj} />
    )}
  </div>
)

Taskbar.propTypes = {
  indicate: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired
    }).isRequired
  ).isRequired
}

export default Taskbar

