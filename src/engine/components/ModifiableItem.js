import React from 'react'
import PropTypes from 'prop-types'

const ModifiableItem = ({label, onClick, onRemove, onModify}) => {
  return (
    <li className="modifiable-item">
      <p onClick={onClick}>{label}</p>
      <span className="modifiable-item-tray">
        {
          onModify
            ?
              <span className="modifiable-item-icon edit-icon" onClick={onModify}>
                <img src="../res/icon_edit_item.png" />
              </span>
            : ''
        }
        {
          onRemove
            ?
              <span
                className="modifiable-item-icon remove-icon"
                onClick={onRemove}
              >
                <img src="../res/icon_remove_item.png" />
              </span>
            : ''
        }
      </span>
    </li>
  )
}

ModifiableItem.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  onRemove: PropTypes.func,
  onModify: PropTypes.func
}

export default ModifiableItem

