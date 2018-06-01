import { connect } from 'react-redux'
import {
  queryTargetChangeTo,
  closeDialog, openDialog,
  openDetail,
  showFeatureTarget
} from '../actions'
import QueryDialogView from '../components/QueryDialogView'

const basicTargets = [
  {value: 'plan', label: 'plan'},
  {value: 'certificate', label: 'certificate'}
]

const stateToProps = state => ({
  ...state.queryDialog,
  isActive: state.dialogState['query'],
  targets: basicTargets,
  userRole: 'guest'
})

const actToProps = dispatch => ({
  targetChangeListener: val => dispatch(queryTargetChangeTo(val)),
  valueChange: value => dispatch(performQuery(value)),
  viewDetail: (event, result) => dispatch(showFeatureTarget(event, result)),
  onClose: () => dispatch(closeDialog('query'))
})

export default connect(stateToProps, actToProps)(QueryDialogView)

