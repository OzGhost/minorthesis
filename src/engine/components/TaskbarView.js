import React from 'react'
import PropTypes from 'prop-types'
import TaskbarIcon from './TaskbarIcon'
import { openDialog } from '../actions'

const TaskbarView = ({ items, dispatch }) => (
  <div className="taskbar">
    { items.map( (item, i) =>
      <TaskbarIcon key={i}
        icon={'../res/' + item.icon}
        label={item.label}
        onClick={event => { dispatch(openDialog(event, item.name)) }}
      />
    )}
  </div>
)

TaskbarView.propTypes = {
  items: PropTypes.array.isRequired
}

export default TaskbarView

