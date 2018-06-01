import React from 'react'
import PropTypes from 'prop-types'
import Dialog from './Dialog'

class ModifierDialogView extends Dialog {
  static propTypes = {
  }

  getMetaData = () => ({
    styleClass: 'modifier-dialog',
    title: 'Modifier',
    icon: '../res/icon_modifier.png'
  })

  buildDialogContent = () => {
    const { layers, onToggle } = this.props
    return (
      <div>
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
}

export default ModifierDialogView
