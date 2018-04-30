import React from 'react'
import PropTypes from 'prop-types'
import mouseStart from '../common/Dragger'

const QueryDialogView = ({
  layers, fields, values, results,
  layerChange, fieldChange, valueChange,
  isLoading, isActive
}) => {
  const block = { disabled: isLoading }
  return isActive ? (
    <div
        className="dialog query-dialog"
        style={{ top: '240px', left: '80px' }}
    >
      <div className="dragger" onMouseDown={mouseStart}></div>
      <img className="dialog-icon" src="../res/icon_query.png" />
      <p className="dialog-title">Property Query</p>
      <hr/>
      <div className="w3-row">
        <div className="w3-col s6">
          <label>Layer:</label>
          <select
              onChange={ (event) => layerChange(event.target.value) }
              className="w3-input w3-border"
              {...block}
          >
            { layers.map( layer => (
              <option key={layer.value} value={layer.value}>{layer.label}</option>
            ) ) }
          </select>
        </div>
        <div className="w3-col s6">
          <label>Field:</label>
          <select
              onChange={ (event) => fieldChange(event.target.value) }
              className="w3-input w3-border"
              {...block}
          >
            { fields.map( field => (
              <option key={field.value} value={field.value}>{field.label}</option>
            ) ) }
          </select>
        </div>
      </div>
      <div className="w3-row">
        <div className="w3-col s12">
          <label>Value:</label>
          <select
              onChange={ (event) => valueChange(event.target.value) }
              className="w3-input w3-border"
              {...block}
          >
            { values.map( val => (
              <option key={val}>{val}</option>
            ) ) }
          </select>
        </div>
      </div>
      <hr/>
      <div className="query-result">
        <label>Results:</label>
        <ul className="w3-ul">
          { results.map( result => (
            <li key={result.gid}>{result.name}</li>
          ) ) }
        </ul>
      </div>
    </div>
    ) : <div className="hidden"></div>
}
  
QueryDialogView.propTypes = {
layers: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })),
  fields: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })),
  values: PropTypes.arrayOf(PropTypes.any),
  results: PropTypes.arrayOf(PropTypes.any),

  layerChange: PropTypes.func.isRequired,
  fieldChange: PropTypes.func.isRequired,
  valueChange: PropTypes.func.isRequired,

  isLoading: PropTypes.bool,
  isActive: PropTypes.bool.isRequired
}

export default QueryDialogView


