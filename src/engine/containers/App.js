import React from 'react'
import Taskbar from '../containers/Taskbar'
import QueryDialog from '../containers/QueryDialog'
import DetailDialog from '../containers/DetailDialog'
import FilterDialog from '../containers/FilterDialog'
import LoginDialog from '../containers/LoginDialog'
import RulerDialog from '../containers/RulerDialog'
import ChangePasswordDialog from '../containers/ChangePasswordDialog'
import ModifierDialog from '../containers/ModifierDialog'

const App = () => (
  <div>
    <div id="map"></div>
    <DetailDialog />
    <Taskbar />
    <QueryDialog />
    <FilterDialog />
    <LoginDialog />
    <RulerDialog />
    <ChangePasswordDialog />
    <ModifierDialog />
  </div>
)

export default App

