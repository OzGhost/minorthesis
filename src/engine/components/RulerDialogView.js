import React from 'react'
import PropTypes from 'prop-types'
import MouseTrapper from '../common/MouseTrapper'

const RulerDialogView = ({isActive, pickRulerName}) => {
  const styleClass = 'ruler-dialog' + (isActive ? '' : ' hidden')
  const mousePos = MouseTrapper.getTrappedPosition()
  const dialogPos = mousePos
      ? { top: mousePos.y +'px', left: mousePos.x + 'px' }
      : { top: '240px', left: '80px' }
  return (
    <div className={styleClass} style={dialogPos}>
      <div className="taskbar-icon">
        <label>Đo chiều dài</label>
        <img
          src="../res/icon_tap_ruler.png"
          onClick={()=>pickRulerName('length')}
        />
      </div>
      <div className="taskbar-icon">
        <label>Đo diện tích</label>
        <img
          src="../res/icon_area_ruler.png"
           onClick={()=>pickRulerName('area')}
        />
      </div>
    </div>
  ) 
}

RulerDialogView.propTypes = {
  isActive: PropTypes.bool,
  pickRulerName: PropTypes.func.isRequired
}

export default RulerDialogView

