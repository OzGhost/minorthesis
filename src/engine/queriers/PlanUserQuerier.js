import React from 'react'
import Querier from './Querier'
import PlanUserQuerierView from '../components/PlanUserQuerierView'
import DataLoader from '../common/DataLoader'
import { queryFieldChange, showTargetDetail, openConfirmer,
          openModifier } from '../actions'
import Cacher from '../common/Cacher'
import { host, PLAN_USER_CODE } from '../common/Constants'
import RequestPacker from '../common/RequestPacker'

class PlanUserQuerier extends Querier {

  cache = undefined

  getView = (onChange, queryData) => {
    if (Cacher.getRole() !== 1)
      return ''
    const kind = DataLoader.retrieve(queryData, 'puser.kind') || 'id'
    const rs = DataLoader.retrieve(queryData, 'puser.rs') || []
    this.cache = rs
    return (
      <PlanUserQuerierView
        onChange={onChange}
        kind={kind}
        result={rs}
        buildDragStart={this.buildDragStart}
        buildOnClick={this.buildOnClick}
        buildOnRemove={this.buildOnRemove}
        buildOnModify={this.buildOnModify}
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

  buildDragStart = item => event => {
    event.dataTransfer.setData('code', 'puser')
    event.dataTransfer.setData('payload', JSON.stringify(item))
  }

  buildOnClick = item => event => {
    this.dispatch(showTargetDetail(event, item))
  }

  buildOnModify = item => event => {
    if (Cacher.getRole() !== 1)
      return undefined
    const dto = item
    this.dispatch(openModifier(
      event, PLAN_USER_CODE, dto, ()=>{} 
    ))
  }

  buildOnRemove = item => event => {
    if (Cacher.getRole() !== 1)
      return undefined
    this.dispatch(openConfirmer(
      'Xác nhận xóa chủ sử dụng `'+ item.puserId +'` khỏi hệ thống?',
      ()=>{
        fetch(
          host+'/plan-user/'+item.puserId,
          RequestPacker.packAsDelete()
        )
        this.dispatch(queryFieldChange(
          'puser.rs',
          this.cache.filter(e=>e.puserId!==item.puserId)
        ))
      },
      ()=>{}
    ))
  }
}

export default new PlanUserQuerier

