import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import store from './store'
import { fetchLayers, loadSession } from './actions'

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('frame')
)

store.dispatch(loadSession())
store.dispatch(fetchLayers())

