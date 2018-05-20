import React from 'react'
import { connect } from 'react-redux'
import { closeDialog, inUsername, inPassword, inLogin } from '../actions'
import LoginDialogView from '../components/LoginDialogView'

const stateToProps = state => ({
  ...state.userIdentify,
  isActive: !!state.dialogState['login'],
})

const actToProps = dispatch => ({
  onClose: () => dispatch(closeDialog('login')),
  userNameChange: username => dispatch(inUsername(username)),
  passwordChange: password => dispatch(inPassword(password)),
  onSubmit: (event) => {
    event.preventDefault()
    dispatch(inLogin())
  }
})

export default connect(stateToProps, actToProps)(LoginDialogView)
