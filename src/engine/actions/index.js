const host = 'http://localhost:3000'

export const OPEN_DIALOG = 'OPEN DIALGO'
export const CLOSE_DIALOG = 'CLOSE DIALGO'

export const REQUEST_LAYERS = 'REQUEST LAYERS'
export const RECEIVE_LAYERS = 'RECEIVE LAYERS'

export const REQUEST_FIELDS = 'REQUEST FIELDS'
export const RECEIVE_FIELDS = 'RECEIVE FIELDS'

export const REQUEST_VALUES = 'REQUEST VALUES'
export const RECEIVE_VALUES = 'RECEIVE VALUES'

export const STORE_LAYER = 'STORE LAYER NAME'
export const STORE_FIELD = 'STORE FIELD NAME'

export const QUERING = 'QUERY-ING'
export const RECEIVE_QUERY_RESULT = 'RECEIVE QUERY RESULT'

export const openDialog = dialogName => ({
  type: OPEN_DIALOG,
  dialogName
})

export const closeDialog = dialogName => ({
  type: CLOSE_DIALOG,
  dialogName
})

export const fetchLayers = () => dispatch => {
  dispatch(requestLayers())
  return fetch(host + '/map/layers')
      .then(res => res.json())
      .then(json => dispatch(receiveLayers(json)))
}

const requestLayers = () => ({
  type: REQUEST_LAYERS
})

const receiveLayers = layers => ({
  type: RECEIVE_LAYERS,
  layers
})

export const storeLayerName = layerName => ({
  type: STORE_LAYER,
  layerName
})

export const fetchFields = layerName => dispatch => {
  dispatch(requestFields())
  return fetch(host + '/map/layers/'+layerName+'/fields')
      .then(res => res.json())
      .then(json => dispatch(receiveFields(json)))
}

const requestFields = () => ({
  type: REQUEST_FIELDS
})

const receiveFields = fields => ({
  type: RECEIVE_FIELDS,
  fields
})

export const storeFieldName = fieldName => ({
  type: STORE_FIELD,
  fieldName
})

export const fetchValues = (fieldName) => (dispatch, getState) => {
  dispatch(requestValues())
  return fetch(
      host
      +'/map/layers/'+getState().queryDialog.layerName
      +'/fields/'+fieldName+'/values'
    )
      .then(res => res.json())
      .then(json => dispatch(receiveValues(json)))
}

const requestValues = () => ({
  type: REQUEST_VALUES
})

const receiveValues = values => ({
  type: RECEIVE_VALUES,
  values
})

export const performQuery = value => (dispatch, getState) => {
  dispatch(queryPerforming())
  const localState = getState().queryDialog
  return fetch(
        host
        + '/map/layers/'+localState.layerName
        + '/fields/'+localState.fieldName
        + '/values/'+value
    )
    .then(res => res.json())
    .then(json => dispatch(receiveQueryResult(json)))
}

const queryPerforming = () => ({
  type: QUERING
})

const receiveQueryResult = results => ({
  type: RECEIVE_QUERY_RESULT,
  results
})

