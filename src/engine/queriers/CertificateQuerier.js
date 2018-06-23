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
        host + '/certificate/'+certi.shgiaycn,
        {headers: RequestPacker.buildHeader()}
      ).then(e=>e.json())
      .then(e => {
        this.dispatch(
          openModifier(
            cachedEvent,
            CERTIFICATE_CODE,
            this.preprocessPayload(e.payload),
            () => { /* do nothing */ }
          )
        )
      })
    }
  }

  preprocessPayload = payload => {
    if (typeof(payload) === 'undefined')
      return {}
    let rs = JSON.stringify(payload).replace(/null/g, '""')
    let ors = JSON.parse(rs)
    delete ors.chinhly
    ors.privateArea = Number(ors.privateArea) || 0
    ors.publicArea = Number(ors.publicArea) || 0
    return ors
  }

  buildOnRemove = certi => {
    if (Cacher.getRole() !== 1)
      return undefined
    return (e) => {
      this.dispatch(
        openConfirmer(
          'Xác nhận xóa giấy chứng nhận ['+certi.shgiaycn+'] khỏi hệ thống?',
          () => {
            fetch(
              host + '/certificate/' + certi.shgiaycn,
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
    this.dispatch(showFeatureTarget(event, item, CERTIFICATE_DETAIL_LABELS))
  }
}

export default new CertificateQuerier

