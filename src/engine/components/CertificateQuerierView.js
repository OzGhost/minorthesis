import React from 'react'

const CertificateQuerierView = ({onChange, fieldName, queryResult, resultSelect}) => (
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
        type="number"
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
              { queryResult.certi.cache.map(i =>
                <li key={i.machu} onClick={event => resultSelect(event, i)}>
                  {'['+i.machu+']'+' '+i.ten}
                </li>)
              }
            </ul>
          </div>
        )
        : ''
    }
  </div>
)

export default CertificateQuerierView

