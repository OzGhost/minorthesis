import React from 'react'
import Querier from './Querier'
import PlanUserQuerierView from '../components/PlanUserQuerierView'
import DataLoader from '../common/DataLoader'
import { queryFieldChange, showTargetDetail } from '../actions'
import Cacher from '../common/Cacher'

class PlanUserQuerier extends Querier {
  getView = (onChange, queryData) => {
    if (Cacher.getRole() !== 1)
      return ''
    const kind = DataLoader.retrieve(queryData, 'puser.kind') || 'id'
    const rs = DataLoader.retrieve(queryData, 'puser.rs') || []
    return (
      <PlanUserQuerierView
        onChange={onChange}
        kind={kind}
        result={rs}
        dragStart={this.onDrag}
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

  onDrag = (event, data) => {
    event.dataTransfer.setData('code', 'puser')
    event.dataTransfer.setData('payload', JSON.stringify(data))
  }
}

export default new PlanUserQuerier

