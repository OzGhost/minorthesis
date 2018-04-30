import { connect } from 'react-redux'
import QueryDialogView from '../components/QueryDialogView'

const stateToProps = state => ({
  ...state.queryDialog,
  isActive: state.dialogState['query']
})

const actToProps = dispatch => ({
  layerChange: (layerName) => { console.log('layer change to: ' + layerName) },
  fieldChange: (fieldName) => { console.log('field change to: ' + fieldName) },
  valueChange: (value) => { console.log('value change to: ' + value) }
})

export default connect(stateToProps, actToProps)(QueryDialogView)

