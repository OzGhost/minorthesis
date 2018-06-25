import React from 'react'
import PropTypes from 'prop-types'
import mouseStart from '../common/Dragger'
import MouseTrapper from '../common/MouseTrapper'
import DeepController from '../common/DeepController'
import { FIELD_LABELS, FIELD_MASK } from '../common/Constants'
import Dialog from './Dialog'

class DetailDialogView extends Dialog {
  getMetaData = () => ({
    styleClass: 'detail-dialog',
    icon: '../res/icon_detail.png',
    title: 'Thông tin chi tiết'
  })

  buildDialogContent = () => {
    const {obj, labels} = this.props
    if (typeof(obj) === 'undefined')
      return ''
    return (
      <div className="detail-content">
        { objectDump(obj, labels).map( row => (
          <div key={row.key} className="w3-row">
            <div className="w3-col w3-right-align w3-padding-small" >
              {row.key + ':'}
            </div>
            <div className="w3-col w3-padding-small">{row.value}</div>
          </div>
        ) ) }
      </div>
    )
  }
}

const objectDump = obj => {
  return Object.keys(obj)
    .filter( key => !isSkipField(key) )
    .map(key => ({
      key: FIELD_LABELS[key] || key,
      value: FIELD_MASK[key] ? FIELD_MASK[key](obj[key]) : obj[key]
    }))
}

const isSkipField = fieldName => {
  switch(fieldName) {
    case 'geo':
    case 'id':
    case 'gid':
      return true
    default:
      return false
  }
}

export default DetailDialogView

