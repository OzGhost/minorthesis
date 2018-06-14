import React from 'react'
import { noResultFound, showFeatureTarget,
        queryFieldChange, openModifier } from '../actions'
import DataLoader from '../common/DataLoader'
import Querier from './Querier'
import CertificateQuerierView from '../components/CertificateQuerierView'
import { host, CERTIFICATE_DETAIL_LABELS,
          CERTIFICATE_CODE } from '../common/Constants'
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
      resultSelect={this.itemSelect}
      onModify={this.getModifyFunction()}
      onRemove={this.getRemoveFunction()}
    />
  )

  getKind = data => {
    const field = DataLoader.retrieve(data, 'certi.kind') || ''
    return field === 'certiNumber' ? field : 'ownerId'
  }

  getModifyFunction = () => {
    if (Cacher.getRole() !== 1)
      return undefined
    return (event, certi) => {
      fetch(
        host + '/certificate/'+certi.shgiaycn,
        {headers: RequestPacker.buildHeader()}
      ).then(e=>e.json())
      .then(e => {
        this.dispatch(
          openModifier(
            event,
            CERTIFICATE_CODE,
            this.preprocessPayload(e.payload),
            () => { /* do nothing */ }
          ))
      })
    }
  }

  preprocessPayload = payload => {
    console.log(payload)
    if (typeof(payload) === 'undefined')
      return {}
    let rs = JSON.stringify(payload).replace(/null/g, '""')
    console.log(rs)
    let ors = JSON.parse(rs)
    delete ors.chinhly
    ors.privateArea = Number(ors.privateArea) || 0
    ors.publicArea = Number(ors.publicArea) || 0
    console.log(ors)
    return ors
  }

  getRemoveFunction = () => {
    if (Cacher.getRole() !== 1)
      return undefined
    return (_, certi) => {
      console.log('cout << remove certificate: ', certi)
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

  itemSelect = (event, item) => {
    this.dispatch(showFeatureTarget(event, item, CERTIFICATE_DETAIL_LABELS))
  }
}

export default new CertificateQuerier

