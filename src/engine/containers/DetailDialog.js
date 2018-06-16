import React from 'react'
import { connect } from 'react-redux'
import { closeDialog } from '../actions'
import { DETAIL_DIALOG } from '../common/Constants'
import DetailDialogView from '../components/DetailDialogView'

const stateToProps = state => ({
  ...state.detailDialog,
  isActive: state.dialogState[DETAIL_DIALOG]
})

const actToProps = dispatch => ({
  onClose: () => dispatch(closeDialog(DETAIL_DIALOG))
})

export default connect(stateToProps, actToProps)(DetailDialogView)
