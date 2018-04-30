
import { combineReducers } from 'redux'
import {
  REQUEST_LAYERS, RECEIVE_LAYERS,
  REQUEST_FIELDS, RECEIVE_FIELDS,
  REQUEST_VALUES, RECEIVE_VALUES,
  STORE_LAYER
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

    default:
      return state
  }
}

const dialogState = (state = {}, action) => {
  switch (action.type) {
    default:
      return {
        ...state,
        ['query']: true
      }
  }
}

const rootReducer = combineReducers({
  queryDialog,
  dialogState
})

export default rootReducer

