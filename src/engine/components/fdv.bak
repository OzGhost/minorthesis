import React from 'react'
import PropTypes from 'prop-types'
import mouseStart from '../common/Dragger'

const FilterDialogView = ({ layers, onToggle, onClose, isActive }) => {
  const styleClass = 'dialog filter-dialog' + (isActive ? '' : ' hidden')
  return (
    <div
        className={styleClass}
        style={{ top: '240px', left: '80px' }}
    >
      <span className="close-btn" onClick={onClose}></span>
      <div className="dragger" onMouseDown={mouseStart}></div>
      <img className="dialog-icon" src="../res/icon_filter.png" />
      <p className="dialog-title">Layer Filter</p>
      <hr/>

      <div className="w3-row w3-border-bottom">
        <div className="w3-col" style={{width: "26px"}}>
          <input className="hidden w3-input" type="checkbox"/>
        </div>
        <div className="w3-rest">Layers</div>
      </div>

      { layers.map( layer => (

      <div className="w3-row" key={layer.value}>
        <div className="w3-col" style={{width: "26px"}}>
          <input
            onChange={ () => onToggle(layer.value) }
            className="w3-input"
            type="checkbox"
            checked={layer.isChecked}
          />
        </div>
        <div className="w3-rest">{layer.label}</div>
      </div>

      )) }

    </div>
  )
}

FilterDialogView.propTypes = {
  layers: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    isChecked: PropTypes.bool
  })).isRequired,
  onToggle: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  isActive: PropTypes.bool
}

export default FilterDialogView
