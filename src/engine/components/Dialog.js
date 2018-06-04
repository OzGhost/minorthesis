import React from 'react'
import PropTypes from 'prop-types'
import mouseStart from '../common/Dragger'
import MouseTrapper from '../common/MouseTrapper'
import DeepController from '../common/DeepController'

class Dialog extends React.Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    isActive: PropTypes.bool
  }

  getMetaData = () => ({})

  buildDialogContent = () => (<div></div>)

  render = () => {
    const mousePos = MouseTrapper.getTrappedPosition()
    const depth = DeepController.getNextDeepLevel()
    const dialogStyle = mousePos
        ? { top: mousePos.y +'px', left: mousePos.x + 'px', zIndex: depth }
        : { top: '240px', left: '80px', zIndex: depth }
    const { isActive, onClose } = this.props
    const meta = this.getMetaData()
    const styleClass = meta.styleClass + ' dialog ' + (isActive ? '' : ' hidden')

    return (
      <div
          className={styleClass}
          style={dialogStyle}
          onMouseDown={e => DeepController.pushElement(e.target)}
      >
        <span className="close-btn" onClick={onClose}></span>
        <div className="dragger" onMouseDown={mouseStart}></div>
        <img className="dialog-icon" src={meta.icon} />
        <p className="dialog-title">{meta.title}</p>
        <hr/>

        {this.buildDialogContent()}

      </div>
    )
  }
}

export default Dialog
