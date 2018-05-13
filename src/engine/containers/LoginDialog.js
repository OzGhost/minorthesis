import React from 'react'
import { connect } from 'react-redux'
import { closeDialog } from '../actions'
import LoginDialogView from '../components/LoginDialogView'

const stateToProps = state => ({
  isActive: true
})

const actToProps = dispatch => ({
  onClose: () => dispatch('dialog'),
  userNameChange: username => console.log('username: ' + username),
  passwordChange: password => console.log('password: ' + password),
  onSubmit: () => console.log('submit already')
})

export default connect(stateToProps, actToProps)(LoginDialogView)
