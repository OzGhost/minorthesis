import React from 'react'
import { noResultFound, showFeatureTarget, queryFieldChange } from '../actions'
import DataLoader from '../common/DataLoader'
import Querier from './Querier'
import PlanQuerierView from '../components/PlanQuerierView'
import { PLAN_DETAIL_LABELS } from '../common/Constants'

class PlanQuerier extends Querier {
  getView = (onChange, queryData) => {
    const data = DataLoader.retrieve(queryData, 'plan.cache')
    return (<PlanQuerierView
              onChange={onChange}
              data={data}
              onClick={this.onClick}
              dragStart={this.onDrag}
            />)
  }
  
  buildQuery = data => {
    const msto = DataLoader.retrieve(data, 'plan.msto') || 0
    const msthua = DataLoader.retrieve(data, 'plan.msthua') || 0
    return '/plan?msto='+msto+'&msthua='+msthua
  }

  receiveResult = (event, res) => {
    this.dispatch(queryFieldChange('plan.cache', res[0]))
  }

  onClick = (event, data) => {
    this.dispatch(showFeatureTarget(event, data))
  }

  onDrag = (event, data) => {
    event.dataTransfer.setData('code', 'plan')
    event.dataTransfer.setData('payload', JSON.stringify(data))
  }
}

export default new PlanQuerier

