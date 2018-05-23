import React from 'react'
import { connect } from 'react-redux'
import RulerDialogView from '../components/RulerDialogView'
import { pickRuler } from '../actions'

const stateToProps = state => ({
  isActive: state.dialogState['ruler']
})

const actToProps = dispatch => ({
  pickRulerName: rulerName => dispatch(pickRuler(rulerName))
})

export default connect(stateToProps, actToProps)(RulerDialogView)

