import MouseTrapper from '../common/MouseTrapper'
import Mapper from '../common/Mapper'
import Ruler from '../common/Ruler'

export const host = 'http://localhost:3000'

export const OPEN_DIALOG = 'OPEN DIALGO'
export const CLOSE_DIALOG = 'CLOSE DIALGO'
export const CLEAR_DIALOGS = 'CLEAR DIALOGS'

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

export const OPEN_DETAIL = 'OPEN DETAIL DIALOG'

export const TOGGLE_LAYER = 'TOGGLE LAYER'

export const IN_USERNAME = 'USER INPUT USERNAME'
export const IN_PASSWORD = 'USER INPUT PASSWORD'
export const IN_LOGIN = 'USER TRY TO LOGIN'
export const LOGIN_RESULT = 'LOGIN RESULT'
export const IDENTIFY_CLEAN = 'IDENTIFY CLEAN'
export const ROLE_CHANGED = 'ROLE CHANGE'

export const QUERY_TARGET_CHANGE = 'Query Target Change'
export const QUERY_FIELD_CHANGE = 'Query Field Change'

export const NO_RESULT_FOUND = 'No Result Found'

export const openDialog = (event, dialogName) => {
  MouseTrapper.trap(event)
  return {
    type: OPEN_DIALOG,
    dialogName
  }
}
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

export const receiveTargetId = (event, targetId) => dispatch => {
  fetch(
    host + '/thuadat/features/'+targetId
  )
    .then(res => res.json())
    .then(json => dispatch(showFeatureTarget(event, json)))
}
export const showFeatureTarget = (event, target) => dispatch => {
  Mapper.viewTarget(target)
  dispatch(openDialog(event, 'detail'))
  dispatch(openDetail(target))
}

export const openDetail = object => ({
  type: OPEN_DETAIL,
  object
})

export const toggleLayer = layer => ({
  type: TOGGLE_LAYER,
  layer
})

export const inUsername = username => ({
  type: IN_USERNAME,
  username
})
export const inPassword = password => ({
  type: IN_PASSWORD,
  password
})
export const inLogin = () => (dispatch, getState) => {
  dispatch(requestAuthen())
  console.log(getState().userIdentify)
  fetch(host + '/login', {
    method: 'POST',
    body: JSON.stringify( getState().userIdentify ),
    headers: new Headers({'Content-Type': 'application/json'})
  }).then(res => res.json())
    .then(json => dispatch(receiveAuthenResult(json)))
}
export const requestAuthen = () => ({
  type: IN_LOGIN
})
export const receiveAuthenResult = authenResult => dispatch => {
  dispatch(authenDone(authenResult))
  if (authenResult.isPass) {
    dispatch(closeDialog('login'))
    dispatch(roleChanged(authenResult.role))
  }
}
export const authenDone = authenResult => ({
  type: LOGIN_RESULT,
  authenResult
})
export const roleChanged = newRole => ({
  type: ROLE_CHANGED,
  newRole
})

export const pickRuler = rulerName => dispatch => {
  dispatch(closeDialog('ruler'))
  Ruler.addInteraction(rulerName, Mapper.getMap(), Mapper.getSource())
}

export const logout = () => dispatch => {
  dispatch(roleChanged('guest'))
  dispatch(clearDialogs())
}

const clearDialogs = () => ({
  type: CLEAR_DIALOGS
})

export const queryTargetChangeTo = target => ({
  type: QUERY_TARGET_CHANGE,
  target
})

export const queryFieldChange = (locate, value) => ({
  type: QUERY_FIELD_CHANGE,
  locate,
  value
})

export const noResultFound = dialogName => ({
  type: NO_RESULT_FOUND,
  target: dialogName
})

export const loadDocs = () => dispatch => {
  fetch(host + '/vanbannhanuoc')
    .then(res => res.json())
    .then(json => dispatch(queryFieldChange('doc.docs', json)))
}

