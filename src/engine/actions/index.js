const host = 'http://localhost:3000'

export const REQUEST_LAYERS = 'REQUEST LAYERS'
export const RECEIVE_LAYERS = 'RECEIVE LAYERS'

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

