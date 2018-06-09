import React from 'react'
import PropTypes from 'prop-types'
import mouseStart from '../common/Dragger'
import MouseTrapper from '../common/MouseTrapper'
import DeepController from '../common/DeepController'
import { FIELD_LABELS } from '../common/Constants'

const DetailDialogView = ({ obj, labels, onClose, isActive }) => {
  const styleClass = 'dialog detail-dialog' + (isActive ? '' : ' hidden')
  const mousePos = MouseTrapper.getTrappedPosition()
  const depth = DeepController.getNextDeepLevel()
  const dialogStyle = mousePos
      ? { top: mousePos.y +'px', left: mousePos.x + 'px', zIndex: depth }
      : { top: '240px', left: '80px', zIndex: depth }
  return (
    <div
      className={styleClass}
      style={dialogStyle}
      onMouseDown={e => DeepController.pushElement(e.target)}
    >
      <span className="close-btn" onClick={onClose}></span>
      <div className="dragger" onMouseDown={mouseStart}></div>
      <img className="dialog-icon" src="../res/icon_detail.png" />
      <p className="dialog-title">Thông tin chi tiết</p>
      <hr/>

      <div className="detail-content">
        { objectDump(obj, labels).map( row => (
          <div key={row.key} className="w3-row w3-border-bottom">
            <div className="w3-col w3-right-align w3-padding-small" >
              {row.key + ':'}
            </div>
            <div className="w3-col w3-padding-small">{row.value}</div>
          </div>
        ) ) }
      </div>
      
    </div>
  )
}

const objectDump = obj => {
  return Object.keys(obj)
    .filter( key => !isSkipField(key) )
    .map(key => ({key: FIELD_LABELS[key] || key, value: obj[key]}))
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

DetailDialogView.propTypes = {
  obj: PropTypes.object.isRequired,
  lables: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  isActive: PropTypes.bool
}

export default DetailDialogView

