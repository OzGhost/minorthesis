import { RECEIVE_LAYERS, TOGGLE_LAYER, OPEN_DIALOG } from '../actions'
import { FILTER_DIALOG } from '../common/Constants'
import Mapper from '../common/Mapper'

const filterDialog = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_LAYERS:
      Mapper.init(action.layers.map(layer => layer.value))
      return {
        layers: [
          ...(action.layers.map(layer => ({...layer, isChecked: true}))),
          {value: 'osm', label: 'Open Street Map', isChecked: true}
        ]
      }

    case TOGGLE_LAYER:
      const newState = state.layers.map( layer => 
        layer.value === action.layer
          ? { ...layer, isChecked: !layer.isChecked }
          : layer
      )
      Mapper.filterLayer(
        newState
          .filter(layer => layer.isChecked)
          .map(layer => layer.value)
      )
      return {
        ...state,
        layers: newState
      }
  
    case OPEN_DIALOG:
      if (action.dialogName === FILTER_DIALOG)
        return {
          ...state,
          offset: action.offset
        }

    default:
      return state
  }
}

export default filterDialog

