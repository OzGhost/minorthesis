import React from 'react'
import ModifiableItem from './ModifiableItem'

const CertificateQuerierView = ({onChange, fieldName, queryResult, resultSelect, onModify, onRemove}) => (
  <div>
    <div>
      <label className="w3-text-blue">Thông tin dùng cho truy vấn:</label>
    </div>
    <div>
      <select
        className="w3-input w3-border"
        onChange={event => {
          onChange('certi.cache', undefined)
          onChange('certi.kind', event.target.value)
        }}
      >
        <option value="ownerId">CMND/Hộ chiếu của chủ sử dụng</option>
        <option value="certiNumber">Số hiệu giấy chứng nhận</option>
      </select>
    </div>
    <div className="w3-row">
      <label className="w3-text-blue">{fieldName}:</label>
    </div>
    <div className="w3-row">
      <input
        type="text"
        className="w3-input w3-border"
        onChange={event => {
          onChange('certi.cache', undefined)
          onChange('certi.value', event.target.value)
        }}
      />
    </div>
    {
      (queryResult && queryResult.certi && queryResult.certi.cache)
        ? (
          <div>
            <hr/>
            <small>Kết quả truy vấn:</small>
            <ul className="w3-ul w3-hoverable">
              {
                queryResult.certi.cache.map(i => {
                  if (onModify || onRemove)
                    return (
                      <ModifiableItem
                        key={i.machu}
                        label={'['+i.machu+'] '+i.ten}
                        onClick={event => resultSelect(event, i)}
                        onModify={event => onModify(event, i)}
                        onRemove={event => onRemove(event, i)}
                      />
                    )
                  return (
                    <li
                      key={i.machu}
                      onClick={event => resultSelect(event, i)}
                    >
                      {'['+i.machu+'] '+i.ten}
                    </li>
                  )
                })
              }
            </ul>
          </div>
        )
        : ''
    }
  </div>
)

export default CertificateQuerierView

