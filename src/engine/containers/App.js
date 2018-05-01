import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Taskbar from '../containers/Taskbar'
import QueryDialog from '../containers/QueryDialog'

const App = () => (
  <div>
    <div id="map"></div>
    <Taskbar />
    <QueryDialog />
  </div>
)

export default App

