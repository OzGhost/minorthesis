import React from 'react'
import PropTypes from 'prop-types'
import Dialog from './Dialog'

class LoginDialogView extends Dialog {

  static propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    userNameChange: PropTypes.func.isRequired,
    passwordChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    isActive: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    result: PropTypes.object
  }

  getMetaData = () => ({
    title: 'Đăng nhập',
    icon: '../res/icon_authen.png',
    styleClass: 'login-dialog'
  })

  buildDialogContent = () => {
    const btnStyle = 'w3-btn w3-block w3-blue'
      + (this.props.isLoading ? ' w3-disabled' : '')
    return (
      <form onSubmit={this.props.onSubmit}>
        <div className="w3-row w3-padding-small">
          <label className="w3-col s5 w3-text-blue">Tên tài khoản: </label>
          <input
            type="text"
            value={this.props.username}
            className="w3-input w3-col s7 w3-white w3-border"
            onChange={ event => this.props.userNameChange(event.target.value) } />
        </div>
        <div className="w3-row w3-padding-small">
          <label className="w3-col s5 w3-text-blue">Mật khẩu: </label>
          <input
            type="password"
            value={this.props.password}
            className="w3-input w3-col s7 w3-white w3-border"
            onChange={ event => this.props.passwordChange(event.target.value) } />
        </div>
        <div className="w3-row w3-center">
          { (typeof this.props.result === 'undefined')
              ? ''
              : this.props.result.isPass
                ? ''
                : <label className="w3-padding-small w3-text-red">
                    Either username or password is incorrect!
                  </label>
          }
        </div>
        <hr/>
        <div className="w3-row w3-padding-small">
          <button className={btnStyle} type="submit"> Đăng nhập </button>
        </div>
      </form>
    )
  }

}

export default LoginDialogView

