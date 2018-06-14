import React from 'react'
import Modifier from './Modifier' 
import { PLAN_USER_CODE, NATIONALITIES } from '../common/Constants'
import DatePicker from 'react-datepicker'
import moment from 'moment'

class PlanUserModifier extends Modifier {

  buildViewUpperPart = store => {
    const listener = this.makeListenerFor('kind')
    return (
      <div className="w3-row">
        <div className="w3-col s5">
          <label className="w3-text-blue">Loại chủ:</label>
        </div>
        <div className="w3-col s7">
          <select
            className="w3-input w3-border"
            onChange={e => listener(Number(e.target.value))}
            value={store.kind || 1}
          >
            <option value="1">Cá nhân</option>
            <option value="2">Tôn giáo/Cộng đồng/Ngoại giao</option>
            <option value="3">Tổ chức kinh doanh</option>
          </select>
        </div>
      </div>
    )
  }

  getEditableFields = store => {
    const baseFields = ['address']
    let needFields = []
    switch(store.kind) {
      case 2:
        needFields = ['groupName', ...baseFields]
        break
      case 3:
        needFields = ['groupName', ...baseFields, 'commerceId']
        break
      default:
        needFields = ['personalName', 'birthYear', 'idNumber', ...baseFields]
        break
    }
    return needFields.map(f => this.getFieldByFieldName(store, f))
  }

  buildViewLowerPart = store => {
    const nationalitySelector = this.buildNationalitisSelector(store)
    if (store.kind !== 3)
      return nationalitySelector
    let listener = this.makeListenerFor('provideDate')
    return (
      <div>
        <div className="w3-row">
          <div className="w3-col s5">
            <label className="w3-text-blue">Ngày cấp:</label>
          </div>
          <div className="w3-col s7">
            <DatePicker
              className="w3-input w3-border"
              dateFormat="DD/MM/YYYY"
              selected={moment(store.provideDate || (new Date()).getTime())}
              onChange={e=>listener(e.valueOf())}
            />
          </div>
        </div>
        {nationalitySelector}
      </div>
    )
  }

  buildNationalitisSelector = (store) => {
    const listener = this.makeListenerFor('nationality')
    return (
      <div className="w3-row">
        <div className="w3-col s5">
          <label className="w3-text-blue">Quốc tịch:</label>
        </div>
        <div className="w3-col s7">
          <select
            className="w3-input w3-border"
            value={store.nationality || 'Việt Nam'}
            onChange={e => listener(e.target.value)}
          >
            {
              NATIONALITIES.map((e, i)=><option key={i}>{e}</option>)
            }
          </select>
        </div>
      </div>
    )
  }

  getTitle = () => this.editMode
    ? 'Cập nhật chủ sử dụng đất'
    : 'Thêm mới chủ sử dụng đất'

  getNamespace = () => PLAN_USER_CODE
}

export default new PlanUserModifier

