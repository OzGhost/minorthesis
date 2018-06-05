import React from 'react'
import { noResultFound, showFeatureTarget,
        queryFieldChange } from '../actions'
import DataLoader from '../common/DataLoader'
import Querier from './Querier'
import CertificateQuerierView from '../components/CertificateQuerierView'
import { CERTIFICATE_DETAIL_LABELS } from '../common/Constants'

class CertificateQuerier extends Querier {
  getView = (onChange, data) => (
    <CertificateQuerierView
      queryResult={data}
      onChange={onChange}
      fieldName={this.getKind(data) === 'ownerId'
                  ? 'CMND/Hộ chiếu'
                  : 'Số hiệu giấy'}
      resultSelect={this.itemSelect}
    />
  )
  
  buildQuery = data => {
    const field = this.getKind(data)
    const value = DataLoader.retrieve(data, 'certi.value') || 0
    return '/giaychungnhan?kind='+field+'&value='+value
  }

  getKind = data => {
    const field = DataLoader.retrieve(data, 'certi.kind') || ''
    return field === 'certiNumber' ? field : 'ownerId'
  }

  getTargetDialogName = () => ('query')

  receiveResult = (event, res) => {
    this.dispatch(queryFieldChange('certi.cache', res))
  }

  itemSelect = (event, item) => {
    this.dispatch(showFeatureTarget(event, item, CERTIFICATE_DETAIL_LABELS))
  }
}

export default new CertificateQuerier

