import React from 'react'
import Querier from './Querier'
import PlanUserQuerierView from '../components/PlanUserQuerierView'
import DataLoader from '../common/DataLoader'
import { queryFieldChange, showTargetDetail, openConfirmer,
          openModifier } from '../actions'
import Cacher from '../common/Cacher'
import { PLAN_USER_CODE } from '../common/Constants'

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
    const dto = this.convertToDto(item)
    this.dispatch(openModifier(
      event, PLAN_USER_CODE, dto, ()=>{} 
    ))
  }

  convertToDto = item => {
    return {
      puid: item.machu,
      kind: item.loaichu,
      personalName: item.ten,
      groupName: item.ten,
      birthYear: item.nam,
      commerceId: item.sogiayto,
      providDate: item.ngaycap,
      address: item.diachi,
      nationality: item.quoctich
    }
  }

  buildOnRemove = item => event => {
    if (Cacher.getRole() !== 1)
      return undefined
    this.dispatch(openConfirmer(
      'Xác nhận xóa chủ sử dụng `'+item.ten+'` khỏi hệ thống?',
      ()=>alert('Accepted!'),
      ()=>alert('Denied!')
    ))
  }
}

export default new PlanUserQuerier

