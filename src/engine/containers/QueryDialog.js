import { connect } from 'react-redux'
import {
  queryTargetChangeTo,
  closeDialog, openDialog,
  openDetail,
  showFeatureTarget,
  queryFieldChange,
  noResultFound
} from '../actions'
import QueryDialogView from '../components/QueryDialogView'

const basicTargets = [
  {value: 'plan', label: 'Plan'},
  {value: 'certi', label: 'Certificate'},
  {value: 'govdoc', label: 'Government Document'}
]

const stateToProps = state => ({
  ...state.queryDialog,
  isActive: state.dialogState['query'],
  targets: basicTargets,
  userRole: 'guest'
})

const actToProps = dispatch => ({
  queryFieldChange: (locate, val) => dispatch(queryFieldChange(locate, val)),
  targetChangeListener: val => dispatch(queryTargetChangeTo(val)),
  valueChange: value => dispatch(performQuery(value)),
  viewDetail: (event, result) => dispatch(showFeatureTarget(event, result)),
  onClose: () => dispatch(closeDialog('query')),
  dispatch: dispatch
})

export default connect(stateToProps, actToProps)(QueryDialogView)

