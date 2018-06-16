import React from 'react'
import { connect } from 'react-redux'
import RulerDialogView from '../components/RulerDialogView'
import { RULER_DIALOG } from '../common/Constants'
import { pickRuler } from '../actions'

const stateToProps = state => ({
  isActive: state.dialogState[RULER_DIALOG]
})

const actToProps = dispatch => ({
  pickRulerName: rulerName => dispatch(pickRuler(rulerName))
})

export default connect(stateToProps, actToProps)(RulerDialogView)

