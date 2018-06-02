import React from 'react'
import PropTypes from 'prop-types'
import mouseStart from '../common/Dragger'
import MouseTrapper from '../common/MouseTrapper'

const DetailDialogView = ({ obj, onClose, isActive }) => {
  const styleClass = 'dialog detail-dialog' + (isActive ? '' : ' hidden')
  const mousePos = MouseTrapper.getTrappedPosition()
  const dialogPos = mousePos
      ? { top: mousePos.y +'px', left: mousePos.x + 'px' }
      : { top: '240px', left: '80px' }
  return (
    <div
      className={styleClass}
      style={dialogPos}
    >
      <span className="close-btn" onClick={onClose}></span>
      <div className="dragger" onMouseDown={mouseStart}></div>
      <img className="dialog-icon" src="../res/icon_detail.png" />
      <p className="dialog-title">Details</p>
      <hr/>

      <div className="w3-row w3-border-bottom">
        <div className="w3-col s3 w3-right-align w3-padding-small">
          <b>Field</b>
        </div>
        <div className="w3-col s9 w3-padding-small"><b>Value</b></div>
      </div>
      <div className="detail-content">
        { objectDump(obj).map( row => (
          <div key={row.key} className="w3-row w3-border-bottom">
            <div className="w3-col s3 w3-right-align w3-padding-small">
              {row.key}
            </div>
            <div className="w3-col s9 w3-padding-small">{row.value}</div>
          </div>
        ) ) }
      </div>
      
    </div>
  )
}

const objectDump = obj => (
  Object.keys(obj)
    .filter( key => !isSkipField(key) )
    .map(key => ({ key, value: obj[key] }))
)

const isSkipField = fieldName => {
  if (fieldName == 'geo')
    return true
  return false
}

DetailDialogView.propTypes = {
  obj: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  isActive: PropTypes.bool
}

export default DetailDialogView

