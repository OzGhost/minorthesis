import { connect } from 'react-redux'
import {
  fetchFields, storeLayerName, fetchValues, storeFieldName,
  performQuery,
  closeDialog, openDialog,
  openDetail,
  showFeatureTarget
} from '../actions'
import QueryDialogView from '../components/QueryDialogView'

const stateToProps = state => ({
  ...state.queryDialog,
  isActive: state.dialogState['query']
})

const actToProps = dispatch => ({
  layerChange: (layerName) => {
    dispatch(storeLayerName(layerName))
    dispatch(fetchFields(layerName))
  },
  fieldChange: (fieldName) => {
    dispatch(storeFieldName(fieldName))
    dispatch(fetchValues(fieldName))
  },
  valueChange: value => dispatch(performQuery(value)),
  viewDetail: (event, result) => dispatch(showFeatureTarget(event, result)),
  onClose: () => dispatch(closeDialog('query'))
})

export default connect(stateToProps, actToProps)(QueryDialogView)

