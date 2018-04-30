import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducer from './reducers'
import ol from 'openlayers'
import App from './containers/App'
import { fetchLayers } from './actions'

const middleware = [ thunk ]
//if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
//}

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('frame')
)

const wmsLayer = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: 'http://localhost/cgi-bin/mapserv',
    params: {
      'map': '/zk/t/tmp/full/dbms.map',
      'SERVICE': 'WMS',
      'VERSION': '1.1.1',
      'REQUEST': 'GetMap',
      'LAYERS': 'thuadat',
      'FORMAT': 'image/png'
    }
  })
})

const map = new ol.Map({
  layers: [wmsLayer],
  target: 'map',
  view: new ol.View({
    center: [574500.4, 1320837.6],
    zoom: 17
  })
})

store.dispatch(fetchLayers())

