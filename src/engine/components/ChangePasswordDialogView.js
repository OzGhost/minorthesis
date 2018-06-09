import React from 'react'
import Dialog from './Dialog'
import PropTypes from 'prop-types'

class ChangePasswordDialogView extends Dialog {
  static propTypes = {
    oldPasswd: PropTypes.string.isRequired,
    newPasswd: PropTypes.string.isRequired,
    renewPasswd: PropTypes.string.isRequired,
    isGood: PropTypes.bool,
    msg: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onClose: PropTypes.func,
    isActive: PropTypes.bool
  }

  getMetaData = () => ({
    title: 'Thay đổi mật khẩu',
    icon: '../res/icon_change_passwd.png',
    styleClass: 'chpasswd-dialog'
  })

  buildDialogContent = () => {
    const { oldPasswd, newPasswd, renewPasswd,
            isGood, msg, onChange, onSubmit, isActive } = this.props
    return (
      <form onSubmit={e => {
        e.preventDefault()
        onSubmit(oldPasswd, newPasswd, renewPasswd)
      }}>
        <div className="w3-row">
          <label className="w3-text-blue">Mật khẩu cũ:</label>
        </div>
        <div className="w3-row">
          <input
            type="password"
            className="w3-input w3-border"
            value={oldPasswd}
            onChange={e => onChange('oldPasswd', e.target.value)}
          />
        </div>
        <div className="w3-row">
          <label className="w3-text-blue">Mật khẩu mới:</label>
        </div>
        <div className="w3-row">
          <input
            type="password"
            className="w3-input w3-border"
            value={newPasswd}
            onChange={e => onChange('newPasswd', e.target.value)}
          />
        </div>
        <div className="w3-row">
          <label className="w3-text-blue">Gõ lại mật khẩu mới:</label>
        </div>
        <div className="w3-row">
          <input
            type="password"
            className="w3-input w3-border"
            value={renewPasswd}
            onChange={e => onChange('renewPasswd', e.target.value)}
          />
        </div>
        <hr/>
        {
          msg
            ? (
              <div className="w3-center">
                <span className={'w3-text-'+(isGood ? 'green' : 'red')}>
                  {msg}
                </span>
                <hr/>
              </div>
            )
            : ''
        }
        <div className="w3-row">
          <button
            className="w3-btn w3-block w3-blue"
            type="submit"
          >Thay đổi</button>
        </div>
      </form>
    )
  }
}

export default ChangePasswordDialogView

