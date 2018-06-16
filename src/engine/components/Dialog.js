import React from 'react'
import PropTypes from 'prop-types'
import mouseStart from '../common/Dragger'
import DeepController from '../common/DeepController'

class Dialog extends React.Component {
  static propTypes = {
    offset: PropTypes.object,
    onClose: PropTypes.func.isRequired,
    isActive: PropTypes.bool
  }

  constructor(props) {
    super(props)
    this.frame = React.createRef()
  }

  getMetaData = () => ({})

  buildDialogContent = () => (<div></div>)

  render = () => {
    const offset = this.props.offset || {x: 240, y: 80}
    const depth = DeepController.getNextDeepLevel()
    const dialogStyle = { top: offset.y+'px', left: offset.x+'px', zIndex: depth }
    const { isActive, onClose } = this.props
    const meta = this.getMetaData(this.props)
    const styleClass = meta.styleClass + ' dialog ' + (isActive ? '' : ' hidden')

    return (
      <div
          ref={this.frame}
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

  componentDidUpdate = () => {
    console.log('cout << Dialog height: ',
      window.getComputedStyle(this.frame.current).height
    )
  }
}

export default Dialog
