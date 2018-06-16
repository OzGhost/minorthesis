import React from 'react'
import { connect } from 'react-redux'
import { closeDialog, toggleLayer } from '../actions'
import { FILTER_DIALOG } from '../common/Constants'
import FilterDialogView from '../components/FilterDialogView'

const stateToProps = state => ({
  ...state.filterDialog,
  isActive: state.dialogState[FILTER_DIALOG]
})
const actToProps = dispatch => ({
  onToggle: layer => dispatch(toggleLayer(layer)),
  onClose: () => dispatch(closeDialog(FILTER_DIALOG))
})

export default connect(stateToProps, actToProps)(FilterDialogView)

