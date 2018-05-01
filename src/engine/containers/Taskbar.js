import React from 'react'
import { connect } from 'react-redux'
import TaskbarView from '../components/TaskbarView'
import { openDialog } from '../actions'

const stateToProps = state => ({

})

const actToProps = dispatch => {
  const indicate = [
    {
      icon: '../res/icon_query.png',
      onClick: () => dispatch(openDialog('query'))
    },
    {
      icon: '../res/icon_filter.png',
      onClick: () => console.log('Filter icon clicked')
    }
  ]
  return { indicate }
}

export default connect(stateToProps, actToProps)(TaskbarView)

