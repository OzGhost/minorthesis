import React from 'react'
import PropTypes from 'prop-types'
import { FIELD_LABELS } from '../common/Constants'

const ModifierSimpleRowView = ({onChange, field}) => (
  <div className="w3-row">
    <div className="w3-col s5 w3-right-align">
      <label className="w3-text-blue">
        {(FIELD_LABELS[field.name] ? FIELD_LABELS[field.name] : field.name)+':'}
      </label>
    </div>
    <div className="w3-col s7">
      <input
        className="w3-input w3-border"
        type={field.hide ? 'password' : 'text'}
        value={field.value}
        onChange={field.readOnly ? ()=>{} : e => onChange(e.target.value)}
        disabled={!!field.readOnly}
      />
    </div>
  </div>
)

ModifierSimpleRowView.propTypes = {
  onChange: PropTypes.func.isRequired,
  field: PropTypes.object.isRequired
}

export default ModifierSimpleRowView

