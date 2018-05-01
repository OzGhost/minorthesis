import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducer from './reducers'
import App from './containers/App'
import { fetchLayers, performQuery } from './actions'
import Mapper from './common/Mapper'

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

store.dispatch(fetchLayers())

Mapper.init()

