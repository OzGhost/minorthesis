import React from 'react'
import { connect } from 'react-redux'
import { closeDialog, inUsername, inPassword, inLogin } from '../actions'
import { LOGIN_DIALOG } from '../common/Constants'
import LoginDialogView from '../components/LoginDialogView'

const stateToProps = state => ({
  ...state.userIdentify,
  isActive: !!state.dialogState[LOGIN_DIALOG],
})

const actToProps = dispatch => ({
  onClose: () => dispatch(closeDialog(LOGIN_DIALOG)),
  userNameChange: username => dispatch(inUsername(username)),
  passwordChange: password => dispatch(inPassword(password)),
  onSubmit: (event) => {
    event.preventDefault()
    dispatch(inLogin())
  }
})

export default connect(stateToProps, actToProps)(LoginDialogView)
