import React from 'react'
import { noResultFound, showFeatureTarget,
        queryFieldChange, openModifier, openConfirmer } from '../actions'
import DataLoader from '../common/DataLoader'
import Querier from './Querier'
import CertificateQuerierView from '../components/CertificateQuerierView'
import { host, CERTIFICATE_DETAIL_LABELS,
          CERTIFICATE_CODE, QUERY_DIALOG } from '../common/Constants'
import Cacher from '../common/Cacher'
import RequestPacker from '../common/RequestPacker'

class CertificateQuerier extends Querier {
  getView = (onChange, data) => (
    <CertificateQuerierView
      queryResult={data}
      onChange={onChange}
      fieldName={this.getKind(data) === 'ownerId'
                  ? 'CMND/Hộ chiếu'
                  : 'Số hiệu giấy'}
      buildOnClick={this.buildOnClick}
      buildOnModify={this.buildOnModify}
      buildOnRemove={this.buildOnRemove}
    />
  )

  getKind = data => {
    const field = DataLoader.retrieve(data, 'certi.kind') || ''
    return field === 'certiNumber' ? field : 'ownerId'
  }

  buildOnModify = certi => {
    if (Cacher.getRole() !== 1)
      return undefined
    return (event) => {
      const cachedEvent = {pageX: event.pageX, pageY: event.pageY}
      fetch(
        host + '/certificate/'+certi.id,
        {headers: RequestPacker.buildHeader()}
      ).then(e=>e.json())
      .then(e => {
        this.dispatch(
          openModifier(
            cachedEvent,
            CERTIFICATE_CODE,
            e.payload,
            () => { /* do nothing */ }
          )
        )
      })
    }
  }

  buildOnRemove = certi => {
    if (Cacher.getRole() !== 1)
      return undefined
    return (e) => {
      this.dispatch(
        openConfirmer(
          'Xác nhận xóa giấy chứng nhận ['+certi.id+'] khỏi hệ thống?',
          () => {
            fetch(
              host + '/certificate/' + certi.id,
              RequestPacker.packAsDelete()
            ).then(res=>res.json())
            .then(()=>{
              this.dispatch(
                queryFieldChange('certi.cache', [])
              )
            })
          }
        )
      )
    }
  }
  
  buildQuery = data => {
    const field = this.getKind(data)
    const value = DataLoader.retrieve(data, 'certi.value') || 0
    return '/certificate?kind='+field+'&value='+value
  }

  receiveResult = (event, res) => {
    this.dispatch(queryFieldChange('certi.cache', res))
  }

  buildOnClick = item => event => {
    let theItem = item
    if (Cacher.getRole() !== 1 && Cacher.getRole() !== 2)
      theItem = this.reduceCertificate(item)
    this.dispatch(showFeatureTarget(event, theItem, CERTIFICATE_DETAIL_LABELS))
  }

  reduceCertificate = item => {
    let rs = {}
    rs.id = item.id
    rs.pusers = item.pusers.map(e=>({name: e.name}))
    rs.plans = item.plans.map(e=>({
      mid: e.mid,
      pid: e.pid,
      targetOfUse: e.targetOfUse
    }))
    return rs
  }
}

export default new CertificateQuerier

