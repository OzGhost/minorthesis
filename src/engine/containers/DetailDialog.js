import React from 'react'
import { connect } from 'react-redux'
import { closeDialog } from '../actions'
import DetailDialogView from '../components/DetailDialogView'

const stateToProps = state => ({
  ...state.detailDialog,
  isActive: state.dialogState['detail']
})

const actToProps = dispatch => ({
  onClose: () => dispatch(closeDialog('detail'))
})

export default connect(stateToProps, actToProps)(DetailDialogView)
