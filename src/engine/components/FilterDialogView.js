import React from 'react'
import PropTypes from 'prop-types'
import Dialog from './Dialog'

class FilterDialogView extends Dialog {
  static propTypes = {
    layers: PropTypes.array,
    onToggle: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    isActive: PropTypes.bool
  }

  getMetaData = () => ({
    styleClass: 'filter-dialog',
    title: 'Ẩn/hiện lớp dữ liệu',
    icon: '../res/icon_filter.png'
  })

  buildDialogContent = () => {
    const { onToggle } = this.props
    const layers = this.props.layers || []
    return (
      <div>
        <div className="w3-row w3-border-bottom">
          <div className="w3-col" style={{width: "26px"}}>
            <input className="hidden w3-input" type="checkbox"/>
          </div>
          <div className="w3-rest">Các lớp dữ liệu</div>
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
}

export default FilterDialogView
