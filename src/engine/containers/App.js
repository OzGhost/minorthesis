import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Taskbar from '../containers/Taskbar'
import QueryDialog from '../containers/QueryDialog'
import DetailDialog from '../containers/DetailDialog'
import FilterDialog from '../containers/FilterDialog'
import LoginDialog from '../containers/LoginDialog'
import RulerDialog from '../containers/RulerDialog'

const App = () => (
  <div>
    <div id="map"></div>
    <Taskbar />
    <QueryDialog />
    <DetailDialog />
    <FilterDialog />
    <LoginDialog />
    <RulerDialog />
  </div>
)

export default App

