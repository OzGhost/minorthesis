import { combineReducers } from 'redux'
import Mapper from '../common/Mapper'
import {
  REQUEST_LAYERS, RECEIVE_LAYERS,
  REQUEST_FIELDS, RECEIVE_FIELDS,
  REQUEST_VALUES, RECEIVE_VALUES,
  STORE_LAYER, STORE_FIELD,
  OPEN_DIALOG, CLOSE_DIALOG, CLEAR_DIALOGS,
  QUERING, RECEIVE_QUERY_RESULT,
  OPEN_DETAIL,
  TOGGLE_LAYER,
  IN_USERNAME, IN_PASSWORD, IN_LOGIN, LOGIN_RESULT, ROLE_CHANGED
} from '../actions'

const defaultSelect = {
  value: '...',
  label: '...'
}
const emptyResult = {
  gid: -1,
  name: '...'
}

const queryDialog = (state = {
                                layers: [defaultSelect],
                                fields: [defaultSelect],
                                values: ['...'],
                                results: [emptyResult]
                    }, action) => {
  switch (action.type) {
    case REQUEST_LAYERS:
    case REQUEST_FIELDS:
    case REQUEST_VALUES:
    case QUERING:
      return {
        ...state,
        isLoading: true
      }

    case RECEIVE_LAYERS:
      return {
        ...state,
        layers: [
          defaultSelect,
          ...action.layers
        ],
        isLoading: false
      }

    case RECEIVE_FIELDS:
      return {
        ...state,
        fields: [
          defaultSelect,
          ...action.fields
        ],
        isLoading: false
      }

    case STORE_LAYER:
      return {
        ...state,
        layerName: action.layerName
      }

    case RECEIVE_VALUES:
      return {
        ...state,
        values: [
          '...',
          ...action.values
        ],
        isLoading: false
      }

    case STORE_FIELD:
      return {
        ...state,
        fieldName: action.fieldName
      }

    case RECEIVE_QUERY_RESULT:
      return {
        ...state,
        results: action.results,
        isLoading: false
      }

    default:
      return state
  }
}

const dialogState = (state = {}, action) => {
  switch (action.type) {

    case OPEN_DIALOG:
      return {
        ...state,
        [action.dialogName]: true
      }
    
    case CLOSE_DIALOG:
      return {
        ...state,
        [action.dialogName]: false
      }

    case CLEAR_DIALOGS:
      return {}

    default:
      return state
  }
}

const detailDialog = (state = { obj: {} }, action) => {
  switch (action.type) {

    case OPEN_DETAIL:
      return {
        ...state,
        obj: action.object
      }

    default:
      return state
  }
}

const filterDialog = (state = [], action) => {
  switch (action.type) {

    case RECEIVE_LAYERS:
      Mapper.init(action.layers.map(layer => layer.value))
      return action.layers.map(layer => ({...layer, isChecked: true}))

    case TOGGLE_LAYER:
      const newState = state.map( layer => 
        layer.value === action.layer
          ? { ...layer, isChecked: !layer.isChecked }
          : layer
      )
      Mapper.filterLayer(
        newState
          .filter(layer => layer.isChecked)
          .map(layer => layer.value)
      )
      return newState
  
    default:
      return state
  }
}

const userIdentify = (state = {username: '', password: ''}, action) => {
  switch(action.type) {
    
    case IN_USERNAME:
      return {
        ...state,
        username: action.username
      }

    case IN_PASSWORD:
      return {
        ...state,
        password: action.password
      }

    case IN_LOGIN:
      return {
        ...state,
        isLoading: true
      }

    case LOGIN_RESULT:
      if (action.authenResult.isPass) {
        return {
          ...state,
          username: '',
          password: '',
          isLoading: false,
          result: action.authenResult
        }
      } else {
        return {
          ...state,
          isLoading: false,
          result: action.authenResult
        }
      }

    default:
      return state
  }
}

const taskbar = (state = {role: 'guest'}, action) => {
  switch(action.type) {

    case ROLE_CHANGED:
      return {
        ...state,
        role: action.newRole
      }

    default:
      return state
  }
}

const rootReducer = combineReducers({
  dialogState,
  queryDialog,
  detailDialog,
  filterDialog,
  userIdentify,
  taskbar
})

export default rootReducer

