import React from 'react'
import { connect } from 'react-redux'
import { closeDialog, toggleLayer } from '../actions'
import FilterDialogView from '../components/FilterDialogView'

const stateToProps = state => ({
  layers: state.filterDialog,
  isActive: state.dialogState['filter']
})
const actToProps = dispatch => ({
  onToggle: layer => dispatch(toggleLayer(layer)),
  onClose: () => dispatch(closeDialog('filter'))
})

export default connect(stateToProps, actToProps)(FilterDialogView)

