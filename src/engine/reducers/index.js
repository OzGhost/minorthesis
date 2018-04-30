
import { combineReducers } from 'redux'
import {
  REQUEST_LAYERS, RECEIVE_LAYERS
} from '../actions'

const queryDialog = (state = {
                                layers: [],
                                fields: [],
                                values: [],
                                results: []
                    }, action) => {
  switch (action.type) {
    case REQUEST_LAYERS:
      return {
        ...state,
        loading: true
      }
    case RECEIVE_LAYERS:
      return {
        ...state,
        layers: [
          { value: '...', label: '...' },
          ...action.layers
        ]
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
        ['query']: false
      }
  }
}

const rootReducer = combineReducers({
  queryDialog,
  dialogState
})

export default rootReducer

