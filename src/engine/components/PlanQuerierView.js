import React from 'react'

const PlanQuerierView = ({onChange}) => (
  <div>
    <div className="w3-row">
      <label className="w3-label w3-text-blue">Số tờ:</label>
    </div>
    <div className="w3-row">
      <input
        type="number"
        className="w3-input w3-border"
        onChange={event => onChange('plan.msto', Number(event.target.value))}
        required={true}
      />
    </div>
    <div className="w3-row">
      <label className="w3-text-blue w3-label">Số thửa:</label>
    </div>
    <div className="w3-row">
      <input
        type="number"
        className="w3-input w3-border"
        onChange={event => onChange('plan.msthua', Number(event.target.value))}
        required={true}
      />
    </div>
  </div>
)

export default PlanQuerierView

