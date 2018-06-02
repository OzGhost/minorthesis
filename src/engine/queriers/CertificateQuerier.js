import React from 'react'
import { noResultFound, showFeatureTarget,
        queryFieldChange } from '../actions'
import DataLoader from '../common/DataLoader'
import Querier from './Querier'
import CertificateQuerierView from '../components/CertificateQuerierView'

class CertificateQuerier extends Querier {
  getView = (onChange, data) => (
    <CertificateQuerierView
      queryResult={data}
      onChange={onChange}
      resultSelect={this.itemSelect}
    />
  )
  
  buildQuery = data => {
    const id = DataLoader.retrieve(data, 'certi.id') || 0
    return '/giaychungnhan?id='+id
  }

  getTargetDialogName = () => ('query')

  receiveResult = (event, res) => {
    this.dispatch(queryFieldChange('certi.cache', res))
  }

  itemSelect = (event, item) => {
    this.dispatch(showFeatureTarget(event, item))
  }
}

export default new CertificateQuerier

