import React from 'react'
import { connect } from 'react-redux'
import ConfirmerView from '../components/ConfirmerView'

const stateToProps = state => ({
  ...state.confirmer
})

export default connect(stateToProps)(ConfirmerView)

