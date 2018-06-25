import React from 'react'
import ModifiableItem from './ModifiableItem'

const PlanUserQuerierView = ({onChange, kind, result, 
                                  buildDragStart, buildOnClick, buildOnRemove,
                                  buildOnModify}) => {
  return (
    <div>
      <div className="w3-row">
        <label className="w3-text-blue">Thông tin dùng cho truy vấn:</label>
      </div>
      <div className="w3-row">
        <select className="w3-input w3-border"
          onChange={e => onChange('puser.kind', e.target.value)}
        >
          <option value="id">Số CMND/Hộ chiếu</option>
          <option value="name">Tên</option>
        </select>
      </div>
      <div className="w3-row">
        <label className="w3-text-blue">
          {(kind === 'id' ? 'Số CMND/Hộ chiếu' : 'Tên') + ':'}
        </label>
      </div>
      <div className="w3-row">
        <input
          className="w3-input w3-border"
          type="text"
          required={true}
          onChange={e => {
            onChange('puser.value', e.target.value)
            onChange('puser.rs', '')
          }}
        />
      </div>
      {
        result.length < 1
          ? ''
          : (
            <div>
              <hr/>
              <small>Kết quả tìm kiếm:</small>
              <ul className="w3-ul w3-hoverable">
                {
                  result.map(item =>
                    <ModifiableItem
                      key={item.puserId}
                      label={
                        '['+item.puserId+'] '+(item.personalName || item.groupName)
                      }
                      onDragStart={buildDragStart(item)}
                      onClick={buildOnClick(item)}
                      onRemove={buildOnRemove(item)}
                      onModify={buildOnModify(item)}
                    />
                  )
                }
              </ul>
            </div>
          )
      }
    </div>
  )
}

export default PlanUserQuerierView

