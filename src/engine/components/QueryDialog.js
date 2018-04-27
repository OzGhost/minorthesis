import React from 'react'
import PropTypes from 'prop-types'

const drag = (env) => {
  console.log('drag start')
  var element = env.target
  var style = window.getComputedStyle(element)
  
  env.dataTransfer.setData('noop', 'another')

  window.dragging = true
  window.theTag = element
  window.tagPosition = {
    top: style.getPropertyValue('top'),
    left: style.getPropertyValue('left')
  }
  window.curPosition = {
    top: env.pageX,
    left: env.pageY
  }

  console.log(window)
}

const dragend = (env) => {
  console.log('drag end')
  window.dragging = false

  document.onmousemove = undefined
}

const QueryDialog = ({
  layerChange, layers,
  fieldChange, fields,
  valueChange, results,
  isActive
}) => isActive ? (
  <div
      className="dialog query-dialog"
      draggable={true}
      onDragStart={drag}
      onDragEnd={dragend}
  >
    <img className="dialog-icon" src="../res/icon_query.png" />
    <p className="dialog-title">Property Query</p>
    <hr/>
    <div className="w3-row">
      <div className="w3-col s6">
        <label>Layer:</label>
        <select className="w3-input w3-border">
          <option>...</option>
        </select>
      </div>
      <div className="w3-col s6">
        <label>Field:</label>
        <select className="w3-input w3-border">
          <option>...</option>
        </select>
      </div>
    </div>
    <div className="w3-row">
      <div className="w3-col s12">
        <label>Value:</label>
        <select className="w3-input w3-border">
          <option>...</option>
        </select>
      </div>
    </div>
    <hr/>
    <div className="query-result">
      <label>Results:</label>
      <ul className="w3-ul">
        <li>first</li>
        <li>second</li>
        <li>third</li>
        <li>last</li>
        <li>last</li>
        <li>last</li>
        <li>last</li>
        <li>last</li>
        <li>last</li>
        <li>last</li>
        <li>last</li>
        <li>last</li>
      </ul>
    </div>
  </div>
) : <div className="hidden"></div>

QueryDialog.propTypes = {
  onSearch: PropTypes.func.required,
  result: PropTypes.arrayOf(PropTypes.any).isRequired,
  isActive: PropTypes.bool
}

export default QueryDialog


