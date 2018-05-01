import React from 'react'
import PropTypes from 'prop-types'
import TaskbarIcon from './TaskbarIcon'

const TaskbarView = ({ indicate }) => (
  <div className="taskbar">
    { indicate.map( (obj, i) =>
      <TaskbarIcon key={i} {...obj} />
    )}
  </div>
)

TaskbarView.propTypes = {
  indicate: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired
    }).isRequired
  ).isRequired
}

export default TaskbarView

