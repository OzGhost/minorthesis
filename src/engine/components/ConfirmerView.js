import React from 'react'
import PropTypes from 'prop-types'

const ConfirmerView = ({inUse, message, onDeny, onAccept}) => {
  if (!inUse)
    return ''
  return (
    <div className="confirmer">
      <div className="msg">
        <span className="close-btn" onClick={onDeny}></span>
        <p></p>
        <hr/>
        <p></p>
        <p className="w3-center">{message}</p>
        <p></p>
        <hr/>
        <p></p>
        <div className="w3-row">
          <div className="w3-rest"></div>
          <div className="w3-col s4 w3-right">
            <button
              onClick={onAccept}
              className="w3-btn w3-block w3-green"
            >
              Xác nhận
            </button>
          </div>
          <div className="w3-col s4 w3-red w3-right">
            <button
              onClick={onDeny}
              className="w3-btn w3-block w3-red"
            >
              Hủy bỏ
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

ConfirmerView.propTypes = {
  inUse: PropTypes.bool,
  message: PropTypes.string,
  onDeny: PropTypes.func,
  onAccept: PropTypes.func
}

export default ConfirmerView

