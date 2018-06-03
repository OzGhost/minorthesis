import React from 'react'
import { noResultFound, showFeatureTarget } from '../actions'
import DataLoader from '../common/DataLoader'
import Querier from './Querier'
import PlanQuerierView from '../components/PlanQuerierView'
import { PLAN_DETAIL_LABELS } from '../common/Constants'

class PlanQuerier extends Querier {
  getView = onChange => (<PlanQuerierView onChange={onChange}/>)
  
  buildQuery = data => {
    const msto = DataLoader.retrieve(data, 'plan.msto') || 0
    const msthua = DataLoader.retrieve(data, 'plan.msthua') || 0
    return '/thuadat?msto='+msto+'&msthua='+msthua
  }

  getTargetDialogName = () => ('query')

  receiveResult = (event, res) => {
    this.dispatch(showFeatureTarget(event, res, PLAN_DETAIL_LABELS))
  }
}

export default new PlanQuerier
