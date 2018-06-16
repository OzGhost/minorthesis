import { connect } from 'react-redux'
import {
  queryTargetChangeTo,
  closeDialog, openDialog,
  openDetail,
  showFeatureTarget,
  queryFieldChange,
  noResultFound
} from '../actions'
import { QUERY_DIALOG } from '../common/Constants'
import QueryDialogView from '../components/QueryDialogView'
import Cacher from '../common/Cacher'

const basicTargets = [
  {value: 'plan', label: 'Thửa đất'},
  {value: 'certi', label: 'Giấy chứng nhận'},
  {value: 'govdoc', label: 'Văn bản nhà nước'}
]

const adminTargets = [
  {value: 'puser', label: 'Chủ sử dụng đất'},
  {value: 'user', label: 'Tài khoản truy cập'}
]

const getTargets = () => {
  const additionalTargets = Cacher.getRole() === 1
    ? additionalTargets
    : []
  return [
    ...basicTargets,
    ...additionalTargets
  ]
}

const stateToProps = state => ({
  ...state.queryDialog,
  isActive: state.dialogState[QUERY_DIALOG],
  targets: Cacher.getRole() === 1
    ? [
      ...basicTargets,
      ...adminTargets
    ]
    : basicTargets,
  userRole: 'guest'
})

const actToProps = dispatch => ({
  queryFieldChange: (locate, val) => dispatch(queryFieldChange(locate, val)),
  targetChangeListener: val => dispatch(queryTargetChangeTo(val)),
  valueChange: value => dispatch(performQuery(value)),
  viewDetail: (event, result) => dispatch(showFeatureTarget(event, result)),
  onClose: () => dispatch(closeDialog(QUERY_DIALOG)),
  dispatch: dispatch
})

export default connect(stateToProps, actToProps)(QueryDialogView)

