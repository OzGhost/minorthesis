import React from 'react'

const PlanQuerierView = ({onChange, data, dragStart, onClick}) => (
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
    {
      data
        ?
          <div>
            <div className="w3-row">
              <small>Kết quả truy vấn:</small>
            </div>
            <div className="w3-row">
              <ul className="w3-ul w3-hoverable">
                <li
                  draggable="true"
                  onDragStart={e=>dragStart(e, data)}
                  onClick={e=>onClick(e, data)}
                >
                  {'Số tờ: '+data.shbando+' | Số thửa: '+data.shthua}
                </li>
              </ul>
            </div>
          </div>
        : ''
    }
  </div>
)

export default PlanQuerierView

