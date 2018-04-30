import { connect } from 'react-redux'
import { fetchFields, storeLayerName, fetchValues } from '../actions'
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
  fieldChange: (fieldName) => { dispatch(fetchValues(fieldName)) },
  valueChange: (value) => { console.log('value change to: ' + value) }
})

export default connect(stateToProps, actToProps)(QueryDialogView)

