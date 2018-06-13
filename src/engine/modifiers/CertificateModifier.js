import React from 'react'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import Modifier from './Modifier'
import { host, MODIFIER_DIALOG, CERTIFICATE_CODE } from '../common/Constants'
import { valueChange } from '../actions'
import RequestPacker from '../common/RequestPacker'
import DataLoader from '../common/DataLoader'

const targetOfUse = [
  {value: 'CAN', label: 'Đất an ninh'},
  {value: 'CQP', label: 'Đất quốc phòng'},
  {value: 'DGD', label: 'Đất giáo dục'},
  {value: 'DGT', label: 'Đất giao thông'},
  {value: 'DVH', label: 'Đất văn hóa'},
  {value: 'DYT', label: 'Đất y tế'},
  {value: 'ODT', label: 'Đất ở đô thị'},
  {value: 'SKC', label: 'Đất cơ sở sản xuất kinh doanh'},
  {value: 'TSC', label: 'Đất trụ sở cơ quan, công trình sự nghiệp nhà nước'},
  {value: 'TIN', label: 'Đất tín ngưỡng'},
  {value: 'TON', label: 'Đất tôn giáo'},
  {value: 'DRA', label: 'Đất bãi thải, xử lý chất thải'},
  {value: 'MNC', label: 'Đất có mặt nước chuyên dùng'},
  {value: 'RPT', label: 'Đất có rùng trồng phòng hộ'},
  {value: 'DKV', label: 'Đất khu vui chơi, giải trí công cộng'},
  {value: 'DCH', label: 'Đất chợ'},
  {value: 'DNL', label: 'Đất công trình năng lượng'},
]

class CertificateModifier extends Modifier {

  getFields = data => [
    {name: 'id', label: 'Số hiệu GCN', type: 'text', value: data.id, listener: this.makeListenerFor('id')},
    {name: 'signDate', label: 'Ngày ký', type: 'date', value: data.signDate || moment().valueOf(), listener: this.makeListenerFor('signDate')},
    {name: 'provider', label: 'Cơ quan cấp', type: 'text', value: data.provider, listener: this.makeListenerFor('provider')},
    {name: 'privateArea', label: 'Diện tích riêng', type: 'number', value: data.privateArea, listener: this.makeListenerFor('privateArea')},
    {name: 'publicArea', label: 'Diện tích chung', type: 'number', value: data.publicArea, listener: this.makeListenerFor('publicArea')},
    {name: 'targetOfUse', label: 'Mục đích sử dụng', type: 'picker', value: data.targetOfUse, options: targetOfUse, listener: this.makeListenerFor('targetOfUse')},
    {name: 'goodUntil', label: 'Thời hạn sử dụng', type: 'date', value: data.goodUntil || moment().valueOf(), listener: this.makeListenerFor('goodUntil')},
    {name: 'sourceOfUse', label: 'Nguồn gốc sử dụng', type: 'text', value: data.sourceOfUse, listener: this.makeListenerFor('sourceOfUse')}
  ]

  getTitle = () => (
    this.editMode
      ? 'Cập nhật thông tin giấy chứng nhận'
      : 'Thêm mới giấy chứng nhận'
  )

  getNamespace = () => (CERTIFICATE_CODE)

  buildView = props => {
    const data = DataLoader.retrieve(props, this.getNamespace()) || {}
    return (
      <div className="modifier" onDragOver={e=>e.preventDefault()} onDrop={this.onDrop}>
        {
          this.getFields(data).map(this.buildField)
        }
        <div className="w3-row" key={'plan'}>
          <div className="w3-col s5">
            <label className="w3-text-blue">Thửa đất:</label>
          </div>
          <div className="w3-col s7">
            {
              data.plan
                ? this.buildRemovableItem(
                  'Tờ: '+data.plan.shbando+' | Thửa: '+data.plan.shthua,
                  () => this.reactor(valueChange(MODIFIER_DIALOG, this.getNamespace()+'.plan', undefined))
                )
                : <small>Kéo thả thửa đất vào cửa sổ để thêm</small>
            }
          </div>
        </div>
        <div className="w3-row" key={'puser'}>
          <div className="w3-col s5">
            <label className="w3-text-blue">Chủ sử dụng:</label>
          </div>
          <div className="w3-col s7">
            <small><i>Drag & drop plan inside this dialog</i></small>
          </div>
        </div>
      </div>
    )
  }

  buildField = fieldInfo => {
    return (
      <div className="w3-row" key={fieldInfo.name}>
        <div className="w3-col s5">
          <label className="w3-text-blue">{fieldInfo.label}:</label>
        </div>
        <div className="w3-col s7">
          {
            this.buildInput(fieldInfo)
          }
        </div>
      </div>
    )
  }

  buildInput = fieldInfo => {
    let tag
    switch(fieldInfo.type) {
      case 'picker':
        tag = 
          <select
              className="w3-input w3-border"
              value={fieldInfo.value || '_'}
              onChange={e=>fieldInfo.listener(e.target.value)}
          >
            {
              [
                {value:'_', label:'...'},
                ...fieldInfo.options
              ].map(o =>
                <option key={o.value} value={o.value}>{o.label}</option>
              )
            }
          </select>
        break
      case 'date':
        tag = 
          <DatePicker
            className="w3-input w3-border"
            dateFormat="DD/MM/YYYY"
            selected={moment(fieldInfo.value)}
            onChange={e=>fieldInfo.listener(e.valueOf())}
          />
        break
      case 'number':
        tag =
          <input
            type="number"
            className="w3-input w3-border"
            value={fieldInfo.value}
            onChange={e=>fieldInfo.listener(e.target.value)}
          />
        break
      default:
        tag =
          <input
            type="text"
            className="w3-input w3-border"
            value={fieldInfo.value}
            onChange={e=>fieldInfo.listener(e.target.value)}
          />
        break
    }
    return tag
  }

  onDrop = event => {
    event.preventDefault();
    var code = event.dataTransfer.getData('code')
    var payload = event.dataTransfer.getData('payload')
    this.reactor(valueChange(MODIFIER_DIALOG, this.getNamespace()+'.'+code, JSON.parse(payload)))
  }

  buildRemovableItem = (text, onRemove) => (
    <div className="w3-card w3-hover-blue w3-padding removable-item">
      {text}
      <span className="remove-btn" onClick={onRemove}>x</span>
    </div>
  )

  onSubmit = store => {
    if (!this.qualify(store))
      return
    let data = Object.assign({}, store)
    delete data.repasswd
    this.pendingUI()
    const payload = this.editMode
      ? RequestPacker.packAsPut(data)
      : RequestPacker.packAsPost(data)
    fetch(host + '/account', payload)
      .then(res => res.json())
      .then(resJson => {
        this.resumeUI()
        this.handleResult(resJson, store)
      })
  }

  qualify = store => {
    return true
  }

}

export default new CertificateModifier

