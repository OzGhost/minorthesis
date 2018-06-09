import { connect } from 'react-redux'
import ModifierDialogView from '../components/ModifierDialogView'
import { valueChange, stateChange, closeDialog } from '../actions'
import { MODIFIER_DIALOG } from '../common/Constants'

const targets = [
  {code: 'account', label: 'Tài khoản'},
  {code: 'certificate', label: 'Giấy chứng nhận'}
]

const stateToProps = state => ({
  ...state.modifierDialog,
  isActive: state.dialogState[MODIFIER_DIALOG],
  targets
})

const actToProps = dispatch => ({
  onClose: () => dispatch(closeDialog(MODIFIER_DIALOG)),
  onChange: (key, value) => dispatch(MODIFIER_DIALOG, key, value)
})

export default connect(stateToProps, actToProps)(ModifierDialogView)

