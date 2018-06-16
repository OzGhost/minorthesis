import MouseTrapper from '../common/MouseTrapper'
import Mapper from '../common/Mapper'
import Ruler from '../common/Ruler'
import RequestPacker from '../common/RequestPacker'
import Cacher from '../common/Cacher'
import { host, MODIFIER_DIALOG, BASE_HASH,
          DETAIL_DIALOG, LOGIN_DIALOG, RULER_DIALOG } from '../common/Constants'

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
export const LOGIN_MSG = 'MESSaGE from login'
export const QUERY_TARGET_CHANGE = 'Query Target Change'
export const QUERY_FIELD_CHANGE = 'Query Field Change'
export const NO_RESULT_FOUND = 'No Result Found'
export const VALUE_CHANGE = 'Some value change'
export const STATE_CHANGE = 'Some state change'
export const OPEN_MODIFIER = 'Open Modifier'
export const UPDATE_ACCOUNT = 'Update Account'
export const OPEN_CONFIRMER = 'Open Confirm Popup'
export const CLOSE_CONFIRMER = 'Close Confirm Popup'

export const openDialog = (event, dialogName) => {
  MouseTrapper.trap(event)
  return {
    type: OPEN_DIALOG,
    offset: MouseTrapper.getTrappedPosition(),
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

const queryPerforming = () => ({
  type: QUERING
})
const receiveQueryResult = results => ({
  type: RECEIVE_QUERY_RESULT,
  results
})

export const receiveTargetId = (event, targetId) => dispatch => {
  fetch(
    host + '/plan/features/'+targetId,
    { headers: RequestPacker.buildHeader() }
  )
    .then(res => res.json())
    .then(json => dispatch(showFeatureTarget(event, json[0])))
}
export const showFeatureTarget = (event, target) => dispatch => {
  Mapper.viewTarget(target)
  dispatch(openDialog(event, DETAIL_DIALOG))
  dispatch(openDetail(target))
}

export const showTargetDetail = (event, target) => dispatch => {
  dispatch(openDialog(event, DETAIL_DIALOG))
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
  fetch(
    host + '/account/login',
    RequestPacker.packAsPost(getState().userIdentify)
  ).then(res => res.json())
    .then(json => dispatch(receiveAuthenResult(json)))
}
export const requestAuthen = () => ({
  type: IN_LOGIN
})
export const receiveAuthenResult = authenResult => dispatch => {
  dispatch(authenDone(authenResult))
  if (authenResult.code === 200) {
    dispatch(closeDialog(LOGIN_DIALOG))
    dispatch(roleChanged(authenResult.role))
  } else if (authenResult.code === 403) {
    dispatch(loginMessage('Tên tài khoản hoặc mật khẩu không đúng!'))
  } else if (authenResult.code === 500) {
    dispatch(loginMessage('Hệ thống gặp lỗi, vui lòng thử lại sau!'))
  }
}
export const authenDone = authenResult => ({
  type: LOGIN_RESULT,
  authenResult
})
export const roleChanged = newRole => {
  Cacher.setRole(newRole)
  return {
    type: ROLE_CHANGED,
    newRole
  }
}
export const loginMessage = msg => ({
  type: LOGIN_MSG,
  msg
})

export const pickRuler = rulerName => dispatch => {
  dispatch(closeDialog(RULER_DIALOG))
  Ruler.addInteraction(rulerName, Mapper.getMap(), Mapper.getSource())
}

export const logout = () => dispatch => {
  dispatch(roleChanged(0))
  dispatch(clearDialogs())
  localStorage
    && localStorage.removeItem('token')
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
  fetch(host + '/government-doc')
    .then(res => res.json())
    .then(json => dispatch(queryFieldChange('doc.docs', json)))
}

export const valueChange = (target, locate, value) => ({
  type: VALUE_CHANGE,
  target,
  locate,
  value
})

export const stateChange = (target, stateFragment) => ({
  type: STATE_CHANGE,
  target,
  stateFragment
})

export const openModifier = (event, code, payload, callback) => dispatch => {
  dispatch(openDialog(event, MODIFIER_DIALOG))
  dispatch({
    type: OPEN_MODIFIER,
    code,
    payload,
    callback
  })
}

export const updateAccount = account => ({
  type: UPDATE_ACCOUNT,
  account
})

export const loadSession = () => dispatch => {
  fetch(host + '/account/' + BASE_HASH, { headers: RequestPacker.buildHeader() })
    .then(e => e.json())
    .then(e => {
      e.role === 0
        && localStorage.removeItem('token')
      dispatch(roleChanged(e.role))
    })
}

export const openConfirmer = (msg, onAccept, onDeny) => dispatch => {
  console.log('cout << Action Fired!')
  dispatch(
    {
      type: OPEN_CONFIRMER,
      msg,
      onAccept: () => {
        dispatch(closeConfirmer())
        onAccept()
      },
      onDeny: () => {
      dispatch(closeConfirmer())
        onDeny()
      }
    }
  )
}

export const closeConfirmer = () => ({
  type: CLOSE_CONFIRMER
})
