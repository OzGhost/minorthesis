import { connect } from 'react-redux'
import ModifierDialogView from '../components/ModifierDialogView'
import { valueChange, stateChange, closeDialog } from '../actions'
import { MODIFIER_DIALOG,
          ACCOUNT_CODE, CERTIFICATE_CODE } from '../common/Constants'

const targets = [
  {code: ACCOUNT_CODE, label: 'Tài khoản'},
  {code: CERTIFICATE_CODE, label: 'Giấy chứng nhận'}
]

const stateToProps = state => ({
  ...state.modifierDialog,
  isActive: state.dialogState[MODIFIER_DIALOG],
  //isActive: true,
  targets
})

const actToProps = dispatch => ({
  onClose: () => dispatch(closeDialog(MODIFIER_DIALOG)),
  onChange: (key, value) => dispatch(valueChange(MODIFIER_DIALOG, key, value)),
  dispatch
})

export default connect(stateToProps, actToProps)(ModifierDialogView)

