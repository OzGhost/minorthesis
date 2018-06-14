import React from 'react'
import PropTypes from 'prop-types'

const ModifiableItem = ({label, onClick, onRemove, onModify, onDragStart}) => {
  return (
    <li
      draggable={!!onDragStart}
      onDragStart={ e=>onDragStart(e) }
      className="modifiable-item"
    >
      <p onClick={e=>onClick(e)}>{label}</p>
      <span className="modifiable-item-tray">
        {
          onModify
            ?
              <span
                className="modifiable-item-icon edit-icon"
                onClick={e=>onModify(e)}
              >
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
  onModify: PropTypes.func,
  onDragStart: PropTypes.func
}

export default ModifiableItem

