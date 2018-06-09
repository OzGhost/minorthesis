import ChangePasswordDialogView from '../components/ChangePasswordDialogView'
import { connect } from 'react-redux'
import { host, closeDialog, valueChange, stateChange } from '../actions'
import RequestPacker from '../common/RequestPacker'

const stateToProps = state => ({
  ...state.chpasswdDialog,
  isActive: state.dialogState['chpasswd'],
})

const actToProps = dispatch => ({
  onClose: () => dispatch(closeDialog('chpasswd')),
  onChange: (key, value) => dispatch(valueChange('chpasswd', key, value)),
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
    dispatch(stateChange('chpasswd', {isGood: false, msg}))
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
  dispatch(stateChange('chpasswd', stateFragment))
}

const handleReject = dispatch => {
  const stateFragment = {
    isGood: false,
    msg: 'Xảy ra lỗi trong quá trình xử lý! Vui lòng thử lại sau'
  }
  dispatch(stateChange('chpasswd', stateFragment))
}


export default connect(stateToProps, actToProps)(ChangePasswordDialogView)

