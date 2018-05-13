import React from 'react'
import PropTypes from 'prop-types'
import Dialog from './Dialog'

class LoginDialogView extends Dialog {

  static propTypes = {
    userNameChange: PropTypes.func.isRequired,
    passwordChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    isActive: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
  }

  getMetaData = () => ({
    title: 'Login',
    icon: '../res/icon_authen.png',
    styleClass: 'login-dialog'
  })

  buildDialogContent = () => (
    <div>
      <div className="w3-row w3-padding-small">
        <label className="w3-col s4">Username: </label>
        <input
          type="text"
          className="w3-input w3-col s8 w3-white"
          onChange={ event => this.props.userNameChange(event.target.value) } />
      </div>
      <div className="w3-row w3-padding-small">
        <label className="w3-col s4">Password: </label>
        <input
          type="password"
          className="w3-input w3-col s8 w3-white"
          onChange={ event => this.props.passwordChange(event.target.value) } />
      </div>
      <hr/>
      <div className="w3-row w3-padding-small">
        <button
            className="w3-btn w3-block w3-teal"
            onClick={this.onSubmit}
        >
          Login
        </button>
      </div>
    </div>
  )

}

export default LoginDialogView

