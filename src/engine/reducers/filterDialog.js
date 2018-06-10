import { RECEIVE_LAYERS, TOGGLE_LAYER } from '../actions'
import Mapper from '../common/Mapper'

const filterDialog = (state = [], action) => {
  switch (action.type) {

    case RECEIVE_LAYERS:
      
      Mapper.init(action.layers.map(layer => layer.value))
      return [...(action.layers.map(layer => ({...layer, isChecked: true}))),
                {value: 'osm', label: 'Open Street Map', isChecked: true}
              ]

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

export default filterDialog

