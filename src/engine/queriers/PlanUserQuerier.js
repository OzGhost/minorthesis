import React from 'react'
import Querier from './Querier'
import PlanUserQuerierView from '../components/PlanUserQuerierView'
import DataLoader from '../common/DataLoader'
import { queryFieldChange, showTargetDetail } from '../actions'

class PlanUserQuerier extends Querier {
  getView = (onChange, queryData) => {
    const kind = DataLoader.retrieve(queryData, 'puser.kind') || 'id'
    const rs = DataLoader.retrieve(queryData, 'puser.rs') || []
    return (
      <PlanUserQuerierView
        onChange={onChange}
        kind={kind}
        result={rs}
        itemSelecting={this.itemSelecting}
      />
    )
  }
  
  buildQuery = data => {
    const kind = DataLoader.retrieve(data, 'puser.kind')
    const value = DataLoader.retrieve(data, 'puser.value')
    return '/plan-user?kind='+kind+'&value='+value
  }

  receiveResult = (event, res) => {
    this.dispatch(queryFieldChange('puser.rs', res))
  }

  itemSelecting = (event, item) => {
    this.dispatch(showTargetDetail(event, item))
  }
}

export default new PlanUserQuerier

