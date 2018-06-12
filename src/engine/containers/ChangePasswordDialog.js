import ChangePasswordDialogView from '../components/ChangePasswordDialogView'
import { connect } from 'react-redux'
import { closeDialog, valueChange, stateChange } from '../actions'
import RequestPacker from '../common/RequestPacker'
import { host, CHPASSWD_DIALOG } from '../common/Constants'

const stateToProps = state => ({
  ...state.chpasswdDialog,
  isActive: state.dialogState[CHPASSWD_DIALOG],
})

const actToProps = dispatch => ({
  onClose: () => dispatch(closeDialog(CHPASSWD_DIALOG)),
  onChange: (key, value) => dispatch(valueChange(CHPASSWD_DIALOG, key, value)),
  onSubmit: handleSubmit(dispatch)
})

const handleSubmit = dispatch => (oldPass, newPass, renewPass) => {
  let msg = ''
  if (!oldPass || !newPass || !renewPass) {
    msg = 'Vui lòng điền đầy đủ thông tin phía trên để tiếp tục!'
  } else if (newPass !== renewPass) {
    msg = 'Mật khẩu xác nhận không trùng khớp với mật khẩu mới!'
  } else {
    fetch(
      host + '/account/reset-passwd',
      RequestPacker.packAsPost({oldPass, newPass})
    )
      .then(res => res.json())
      .then(res => handleResult(dispatch, res), () => handleReject(dispatch))
  }
  
  if (msg)
    dispatch(stateChange(CHPASSWD_DIALOG, {isGood: false, msg}))
}

const handleResult = (dispatch, res) => {
  let stateFragment = {}
  if (res.done) {
    stateFragment.isGood = true
    stateFragment.msg = 'Mật khẩu đã được cập nhật!'
  } else {
    stateFragment.isGood = false
    if (res.code === 401)
      stateFragment.msg = 'Mật khẩu cũ không chính xác!'
    else
      stateFragment.msg = 'Xảy ra lỗi trong quá trình xử lý! Vui lòng thử lại sau'
  }
  dispatch(stateChange(CHPASSWD_DIALOG, stateFragment))
}

const handleReject = dispatch => {
  const stateFragment = {
    isGood: false,
    msg: 'Xảy ra lỗi trong quá trình xử lý! Vui lòng thử lại sau'
  }
  dispatch(stateChange(CHPASSWD_DIALOG, stateFragment))
}


export default connect(stateToProps, actToProps)(ChangePasswordDialogView)

