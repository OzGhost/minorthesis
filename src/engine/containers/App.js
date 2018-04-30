import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Taskbar from '../components/Taskbar'
import QueryDialog from '../containers/QueryDialog'

const indi = [
  {
    icon: '../res/icon_query.png',
    onClick: () => console.log('plan query clicked')
  },
  {
    icon: '../res/icon_filter.png',
    onClick: () => console.log('layer query clicked')
  }
]

const App = () => (
  <div>
    <div id="map"></div>
    <Taskbar indicate={indi}/>
    <QueryDialog />
  </div>
)

export default App

