import React from 'react'
import { connect } from 'react-redux'
import TaskbarView from '../components/TaskbarView'
import { openDialog } from '../actions'
import MouseTrapper from '../common/MouseTrapper'

const stateToProps = state => ({

})

const actToProps = dispatch => {
  const indicate = [
    {
      icon: '../res/icon_query.png',
      label: 'Query Plan',
      onClick: event => dispatch(openDialog(event, 'query'))
    },
    {
      icon: '../res/icon_filter.png',
      label: 'Filter Layer',
      onClick: event => dispatch(openDialog(event, 'filter'))
    },
    {
      icon: '../res/icon_authen.png',
      label: 'Login',
      onClick: event => dispatch(openDialog(event, 'login'))
    }
  ]
  return { indicate }
}

export default connect(stateToProps, actToProps)(TaskbarView)

